import React from 'react';

// 费用信息
export default function FeeInfo({ info = {} }) {
  const { 
    totalAmount, 
    freightAmount, 
    promotionAmount, 
    integrationAmount, 
    couponAmount, 
    discountAmount, 
    payAmount
  } = info;
  return (
    <div>
      <div className="od-block-title">费用信息</div>
      <div className="od-block-info">
        <div className="odinfo-row">商品合计：{totalAmount}</div>
        <div className="odinfo-row">运费：{freightAmount}</div>
        <div className="odinfo-row">优惠券：{promotionAmount}</div>
        <div className="odinfo-row">积分抵扣：{integrationAmount}</div>
        <div className="odinfo-row">活动优惠：{couponAmount}</div>
        <div className="odinfo-row">折扣金额：{discountAmount}</div>
        <div className="odinfo-row">订单总金额：{totalAmount}</div>
        <div className="odinfo-row">应付款金额：{payAmount}</div>
      </div>
    </div>
  );
}
