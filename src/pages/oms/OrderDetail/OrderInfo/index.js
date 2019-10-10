import React, { Component } from 'react';
import { Card, Button, Icon, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { actions } from '../action';
import OrderStatus from './OrderStatus';
import BasicInfo from './BasicInfo';
import ReceiveInfo from './ReceiveInfo';
import GoodsInfo from './GoodsInfo';
import FeeInfo from './FeeInfo';
import OperateInfo from './OperateInfo';
import CommonConsts from '../../../../consts/CommonConsts';
import './style.less';

const { confirm } = Modal;

function ExtraButton({ status, deleteOrder, descOrder, changeOrderInfo }) {
  // 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单
  // 修改发票信息、修改收货人信息、修改商品信息、修改费用信息、发送站内信、关闭订单、备注订单、取消订单、订单跟踪、删除订单
  let buttons = [];
  switch (status) {
    case 0:
      buttons = [
        (<Button className="card-button" type="default" onClick={changeOrderInfo}>修改发票信息</Button>),
        (<Button className="card-button" type="default" onClick={changeOrderInfo}>修改收货人信息</Button>),
        (<Button className="card-button" type="default" onClick={changeOrderInfo}>取消订单</Button>)
      ];
      break;
    case 1:
      buttons = [
        (<Button className="card-button" type="default" onClick={changeOrderInfo}>修改收货人信息</Button>),
        (<Button className="card-button" type="default" onClick={changeOrderInfo}>取消订单</Button>)
      ];
      break;
    case 2:
      buttons = [
        (<Button className="card-button" type="primary" onClick={changeOrderInfo}>发送站内信</Button>),
        (<Button className="card-button" type="default" onClick={changeOrderInfo}>订单跟踪</Button>)
      ];
      break;
    case 3:
      buttons = [
        (<Button className="card-button" type="primary" onClick={changeOrderInfo}>关闭订单</Button>),
        (<Button className="card-button" type="danger" onClick={deleteOrder}>删除订单</Button>)
      ];
      break;
    case 4:
      buttons = [
        (<Button className="card-button" type="danger" onClick={deleteOrder}>删除订单</Button>)
      ];
      break;
    default:
      break;
  }
  buttons.push(<Button className="card-button" type="default" onClick={descOrder}>备注订单</Button>);
  return buttons;
}

class OrderInfo extends Component {

  // 删除订单
  deleteOrder = () => {
    const that = this;
    confirm({
      title: '确认',
      content: '确认删除订单吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const { _result, deleteOrders } = that.props;
        const { id } = _result;
        const ids = [id];
        const count = await deleteOrders(ids);
        if (!count) {
          message.error('删除失败');
        } else {
          message.success('删除成功');
          //
        }
      }
    });
  }

  // 备注订单
  descOrder = () => {
    //
  }

  // 各种按钮点击事件
  changeOrderInfo = (msg) => {
    message.info(msg || '订单详情操作事件');
  }

  render() {
    const { _result } = this.props;
    // 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单
    const {
      status, createTime
    } = _result;
    const orderStatusText = CommonConsts.orderStatus[status]
    return (
      <React.Fragment>
        <OrderStatus current={status + 1} createTime={createTime} />
        <Card
          className="order-detail-card"
          title={
            <div style={{ color: 'red' }} >
              <Icon type="exclamation-circle" theme="filled" style={{ color: 'red' }} />
              &nbsp;&nbsp;当前订单状态：{orderStatusText}
            </div>
          }
          extra={<ExtraButton status={status} deleteOrder={this.deleteOrder} descOrder={this.descOrder} changeOrderInfo={this.changeOrderInfo} />}
        >
          <BasicInfo info={_result} />
          <ReceiveInfo info={_result} />
          <GoodsInfo info={_result} />
          <FeeInfo info={_result} />
          <OperateInfo info={_result} />
        </Card>
      </React.Fragment>
    );
  }
}

const store = (state) => {
  const { orderDetail, loading } = state.oms;
  return { _result: orderDetail, loading };
}

export default connect(store, actions)(OrderInfo);
