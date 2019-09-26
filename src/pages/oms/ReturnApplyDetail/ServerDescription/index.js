import React from 'react';
import { Link } from 'react-router-dom';
import { Descriptions, Input, Select } from 'antd';
import moment from 'moment';
import './index.less';

const { Option } = Select;

function ServerDescription(props) {
  const { returnApplyDetail, returnAdderssList, choosedAddressIndex } = props;
  const descriptionsColumn = 1;
  if (!returnApplyDetail.id) {
    return null;
  }
  const {
    id,
    orderSn,
    memberUsername,
    createTime,
    returnName,
    returnPhone,
    reason,
    description,
    productRealPrice,
    status,
    orderId,
    proofPics,
    handleMan,
    handleNote,
    handleTime,
    returnAmount,
    companyAddressId
  } = returnApplyDetail;
  let choosedAddressIndexTemp = choosedAddressIndex;
  if (companyAddressId) {
    choosedAddressIndexTemp = companyAddressId;
  }
  const choosedAddress = returnAdderssList[choosedAddressIndexTemp - 1] || [];
  let defaultMoneyValue = 0;
  if (returnAmount) {
    defaultMoneyValue = returnAmount;
  }
  let statusText = '';
  let inputDisabled = false;
  if (status === 0) {
    statusText = '待处理';
  } else if (status === 1) {
    statusText = '退货中';
    inputDisabled = true;
  } else if (status === 2) {
    statusText = '已完成';
    inputDisabled = true;
  } else if (status === 3) {
    statusText = '已拒绝';
    inputDisabled = true;
  }
  let proofPicsElem = null;
  if (proofPics) {
    const proofPicsArr = proofPics.split(',');
    proofPicsElem = proofPicsArr.map((item) => {
      return <img src={item} alt="" />;
    });
  }
  let selectChildren = [];
  if (returnAdderssList.length > 0) {
    returnAdderssList.map(item => selectChildren.push(<Option key={item.id}>{item.addressName}</Option>));
  }
  let reviceOrderElem = null; //收货地址
  let handleOrderElem = null; //订单处理信息
  let receiveElem = null; //收货信息
  let orderRemarkElem = null; //订单备注
  let receiveRemarkElem = null; //收货备注
  if (status !== 3) {
    reviceOrderElem = (
      <div className="description-table">
        <Descriptions bordered column={descriptionsColumn} size='small'>
          <Descriptions.Item label="选择收货点">
            <Select defaultValue={`${choosedAddressIndexTemp}`} disabled={inputDisabled} style={{ width: 300 }} onChange={(value) => {
              props.changeAddress(value);
            }}>{selectChildren}</Select>
          </Descriptions.Item>
          <Descriptions.Item label="收货人姓名">{choosedAddress.name}</Descriptions.Item>
          <Descriptions.Item label="所在区域">{choosedAddress.province} {choosedAddress.region}</Descriptions.Item>
          <Descriptions.Item label="详细地址">{choosedAddress.detailAddress}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{choosedAddress.phone}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
  if (status !== 0) {
    handleOrderElem = (
      <div className="description-table">
        <Descriptions bordered column={descriptionsColumn} size='small'>
          <Descriptions.Item label="处理人员">{handleMan}</Descriptions.Item>
          <Descriptions.Item label="处理时间">{moment(handleTime).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
          <Descriptions.Item label="处理备注">{handleNote}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
  if (status === 2) {
    receiveElem = (
      <div className="description-table">
        <Descriptions bordered column={descriptionsColumn} size='small'>
          <Descriptions.Item label="收货人员">{returnApplyDetail.receiveMan}</Descriptions.Item>
          <Descriptions.Item label="收货时间">{moment(returnApplyDetail.receiveTime).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
          <Descriptions.Item label="收货备注">{returnApplyDetail.receiveNote}</Descriptions.Item>
        </Descriptions>
      </div>
    )
  }
  if (status === 0) {
    orderRemarkElem = (
      <div className="description-table">
        <Descriptions bordered column={descriptionsColumn} size='small'>
          <Descriptions.Item label="订单备注"><Input onChange={(e) => {
            const { value } = e.target;
            props.changeHandleNote(value);
          }} /></Descriptions.Item>
        </Descriptions>
      </div>
    )
  }
  if (status === 1) {
    receiveRemarkElem = (
      <div className="description-table">
        <Descriptions bordered column={descriptionsColumn} size='small'>
          <Descriptions.Item label="收货备注"><Input onChange={(e) => {
            const { value } = e.target;
            props.changeReceiveNote(value);
          }} /></Descriptions.Item>
        </Descriptions>
      </div>
    )
  }

  return (
    <div className="server-description-wrap">
      <Descriptions title="服务单信息" bordered column={descriptionsColumn} size='small'>
        <Descriptions.Item label="服务单号">{id}</Descriptions.Item>
        <Descriptions.Item label="申请状态">{statusText}</Descriptions.Item>
        <Descriptions.Item label="订单编号">{orderSn}
          <Link to={{ pathname: `/oms/orderDetail/${orderId}` }}> 查看</Link>
        </Descriptions.Item>
        <Descriptions.Item label="申请时间">{moment(createTime).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
        <Descriptions.Item label="用户账号">{memberUsername}</Descriptions.Item>
        <Descriptions.Item label="联系人">{returnName}</Descriptions.Item>
        <Descriptions.Item label="联系电话">{returnPhone}</Descriptions.Item>
        <Descriptions.Item label="退货原因">{reason}</Descriptions.Item>
        <Descriptions.Item label="问题描述">{description}</Descriptions.Item>
        <Descriptions.Item label="凭证图片">{proofPicsElem}</Descriptions.Item>
      </Descriptions>
      <div className="description-table">
        <Descriptions bordered column={descriptionsColumn} size='small'>
          <Descriptions.Item label="订单金额">￥{productRealPrice}</Descriptions.Item>
          <Descriptions.Item label="确认退款金额">
            <Input disabled={inputDisabled} defaultValue={defaultMoneyValue} onChange={(e) => {
              const { value } = e.target;
              props.changeReturnAmount(value);
            }} />
          </Descriptions.Item>
        </Descriptions>
      </div>
      {reviceOrderElem}
      {orderRemarkElem}
      {handleOrderElem}
      {receiveElem}
      {receiveRemarkElem}
    </div>
  );
}
export default ServerDescription;
