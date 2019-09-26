import React from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { Table, Button, Modal } from 'antd';
import { actions } from './action';
import ServerDescription from './ServerDescription/index';
import './index.less';

class ReturnApplyDetail extends React.PureComponent {
  constructor() {
    super();
    this.columns = [
      {
        title: '商品图片',
        dataIndex: 'productPic',
        key: 'productPic',
        width: 100,
        render: (text) => {
          return (
            <img src={text} alt="" />
          )
        }
      },
      {
        title: '商品名称',
        dataIndex: 'productName',
        key: 'productName',
        render: (text, record) => {
          return (
            <div>
              <div>{text}</div>
              <div>品牌：{record.productBrand}</div>
            </div>
          );
        }
      },
      {
        title: '价格/货号',
        dataIndex: 'productId',
        key: 'productId',
        render: (text, record) => {
          return (
            <div>
              <div>价格：￥{record.productRealPrice}</div>
              <div>货号：NO.{text}</div>
            </div>
          );
        }
      },
      {
        title: '属性',
        dataIndex: 'productAttr',
        key: 'productAttr'
      },
      {
        title: '数量',
        dataIndex: 'productCount',
        key: 'productCount',
      },
      {
        title: '小计',
        dataIndex: 'productRealPrice',
        key: 'productRealPrice',
        render: (text) => {
          return (
            <div>￥{text}</div>
          );
        }
      }
    ];
    this.id = 0;
    this.state = {
      returnAmount: 0,
      handleNote: '',
      receiveNote: '',
      choosedAddressIndex: 1
    }
    this.changeReturnAmount = this.changeReturnAmount.bind(this);
    this.changeHandleNote = this.changeHandleNote.bind(this);
    this.changeReceiveNote = this.changeReceiveNote.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  /**
   * 获取退货原因详情
   */
  fetchReturnApplyDetail() {
    const { fetchReturnApplyDetailById, location } = this.props;
    const { search } = location;
    const params = QueryString.parse(search);
    const { id } = params;
    this.id = id;
    fetchReturnApplyDetailById(id);
  }

  fetchReturnCompanyAddressList() {
    const { fetchReturnCompanyAddressList } = this.props;
    fetchReturnCompanyAddressList();
  }

  componentDidMount() {
    this.fetchReturnApplyDetail();
    this.fetchReturnCompanyAddressList();
  }

  /**
   * 更改退款金额
   * @param {*} value 金额
   */
  changeReturnAmount(value) {
    this.setState({
      returnAmount: value
    });
  }

  /**
   * 操作备注
   * @param {String} value 留言信息
   */
  changeHandleNote(value) {
    this.setState({
      handleNote: value
    });
  }

  /**
   * 收货备注
   * @param {String} value 留言信息
   */
  changeReceiveNote(value) {
    this.setState({
      receiveNote: value
    });
  }

  /**
   * 切换地址
   * @param {Integer} value 地址Index
   */
  changeAddress(value) {
    this.setState({
      choosedAddressIndex: value
    });
  }

  /**
   * 确认退货、确认收货、拒绝退货
   */
  updateStatus(status) {
    const { choosedAddressIndex, returnAmount, handleNote, receiveNote } = this.state;
    const { updateReturnStatus, returnApplyDetail } = this.props;
    const { handleMan = '', receiveMan = '' } = returnApplyDetail;
    const params = {
      companyAddressId: choosedAddressIndex,
      handleMan,
      handleNote: handleNote,
      receiveMan,
      receiveNote,
      returnAmount,
      status,
      id: this.id
    }
    const _this = this;
    Modal.confirm({
      title: '是否要进行此操作',
      onOk() {
        updateReturnStatus(params);
        _this.reLoadPage();

      },
      onCancel() {
        console.log('cancel');
      }
    });
  }

  reLoadPage() {
    const { history, location } = this.props;
    history.push({
      path: location.pathname,
      search: location.search
    });
  }
  render() {
    const { returnApplyDetail = {}, returnAdderssList = [] } = this.props;
    const { choosedAddressIndex } = this.state;
    const { productRealPrice, status } = returnApplyDetail;
    let btnElem = null;
    if (status === 0) {
      btnElem = (
        <div className="btn-wrap">
          <Button type="primary" onClick={() => this.updateStatus(1)}>确认退货</Button>
          <Button type="danger" onClick={() => this.updateStatus(3)}>拒绝退货</Button>
        </div>
      );
    } else if (status === 1) {
      btnElem = (
        <div className="btn-wrap">
          <Button type="primary" onClick={() => this.updateStatus(2)}>确认收货</Button>
        </div>
      );
    }
    return (
      <div className="return-detail-wrap">
        <div className="return-goods-wrap">
          <div className="return-content-title">退货商品</div>
          <Table
            columns={this.columns}
            dataSource={[returnApplyDetail]}
            pagination={false}
            bordered
          />
          <div className='price-wrap'>合计：￥{productRealPrice}</div>
        </div>
        <ServerDescription
          returnApplyDetail={returnApplyDetail}
          returnAdderssList={returnAdderssList}
          choosedAddressIndex={choosedAddressIndex}
          changeReturnAmount={this.changeReturnAmount}
          changeHandleNote={this.changeHandleNote}
          changeReceiveNote={this.changeReceiveNote}
          changeAddress={this.changeAddress}
        />
        {btnElem}
      </div>
    )
  }
}

const store = (state) => {
  const { oms = {} } = state;
  const { returnApplyDetail = {}, loading, returnAdderssList = [] } = oms;
  return { returnApplyDetail, loading, returnAdderssList };
}

export default connect(store, actions)(ReturnApplyDetail);
