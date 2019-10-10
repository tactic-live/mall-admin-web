import React from 'react';

// 收货人信息
export default function ReceiveInfo({ info = {} }) {
  const {
    receiverName,
    receiverPhone,
    receiverPostCode,
    receiverProvince,
    receiverCity,
    receiverRegion,
    receiverDetailAddress,
  } = info;
  const address = `${receiverProvince}${receiverCity}${receiverRegion}${receiverDetailAddress}`;
  return (
    <div>
      <div className="od-block-title">收货人信息</div>
      <div className="od-block-info">
        <div className="odinfo-row">收货人：{receiverName}</div>
        <div className="odinfo-row">手机号码：{receiverPhone}</div>
        <div className="odinfo-row">邮政编码：{receiverPostCode}</div>
        <div className="odinfo-row">收货地址：{address}</div>
      </div>
    </div>
  );
}
