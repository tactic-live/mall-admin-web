import React, { Component } from 'react';
import CommonConsts from '../../../../consts/CommonConsts';

// 基础信息
export default class BasicInfo extends Component {
  render() {
    const { info = {} } = this.props;
    const {
      orderSn,
      memberUsername,
      payType,
      sourceType,
      orderType,
      deliveryCompany,
      deliverySn,
      autoConfirmDay,
      integration,
      growth,
      promotionInfo,
    } = info;
    const payTypeText = CommonConsts.payType[payType] || '暂无';
    const sourceTypeText = CommonConsts.sourceType[sourceType] || '暂无';
    const orderTypeText = CommonConsts.orderType[orderType] || '暂无';
    return (
      <div>
        <div className="od-block-title">基础信息</div>
        <div className="od-block-info">
          <div className="odinfo-row">订单编号：{orderSn}</div>
          <div className="odinfo-row">发货单流水号：暂无</div>
          <div className="odinfo-row">用户账号：{memberUsername}</div>
          <div className="odinfo-row">支付方式：{payTypeText}</div>
          <div className="odinfo-row">订单来源：{sourceTypeText}</div>
          <div className="odinfo-row">订单类型：{orderTypeText}</div>
          <div className="odinfo-row">配送方式：{deliveryCompany || '暂无'}</div>
          <div className="odinfo-row">物流单号：{deliverySn || '暂无'}</div>
          <div className="odinfo-row">自动确认收货时间：{autoConfirmDay}</div>
          <div className="odinfo-row">订单可得优币：{integration}</div>
          <div className="odinfo-row">订单可得成长值：{growth}</div>
          <div className="odinfo-row">活动信息：{promotionInfo}</div>
        </div>
      </div>
    );
  }
}
