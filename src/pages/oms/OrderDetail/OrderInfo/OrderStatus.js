import React from 'react';
import { Steps } from 'antd';
import moment from 'moment';

const { Step } = Steps;

export default function OrderStatus({ current, createTime }) {
  // 提交订单、支付订单、平台发货、确认收货、完成评价
  const time = moment(createTime).format('YYYY-MM-DD HH:mm');
  return (
    <Steps className="od-step" current={current}>
      <Step title="提交订单" description={Number(current) === 1 ? time : ''} />
      <Step title="支付订单" description={Number(current) === 2 ? time : ''} />
      <Step title="平台发货" description={Number(current) === 3 ? time : ''} />
      <Step title="确认收货" description={Number(current) === 4 ? time : ''} />
      <Step title="完成评价" description={Number(current) === 5 ? time : ''} />
    </Steps>
  );
}
