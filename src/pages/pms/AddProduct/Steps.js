import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

function StepsComp({ current }) {
  return (
    <Steps current={current} className="add-product-steps">
      <Step title="填写商品信息" description="" />
      <Step title="填写商品促销" description="" />
      <Step title="填写商品属性" description="" />
      <Step title="选择商品关联" description="" />
    </Steps>
  )
}

export default StepsComp;
