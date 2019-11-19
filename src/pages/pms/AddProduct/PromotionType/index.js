import React from 'react';
import { Tabs } from 'antd';
import MemberPrice from './MemberPrice';
import PreferentialPromotion from './PreferentialPromotion';
import DifferentialPrice from './ProductLadder';
import ProductFullReductionList from './ProductFullReductionList';

const { TabPane } = Tabs;

const PromotionType = React.forwardRef((props, ref) => {
  console.log('promotion type, props', props);
  const { form, data } = props;
  const { getFieldDecorator } = form;
  return (
    <Tabs type="card" {...props} ref={ref}>
      <TabPane tab="无优惠" key="0">
      </TabPane>
      <TabPane tab="特惠促销" key="1">
        <PreferentialPromotion {...props} />
      </TabPane>
      <TabPane tab="会员价格" key="2">
        <MemberPrice {...props} />
      </TabPane>
      <TabPane tab="阶梯价格" key="3">
        {getFieldDecorator('productLadderList', {
          initialValue: data.productLadderList,
          valuePropName: 'productLadderList'
        })(
          <DifferentialPrice />
        )}
      </TabPane>
      <TabPane tab="满减价格" key="4">
        {getFieldDecorator('productFullReductionList', {
          initialValue: data.productFullReductionList,
          valuePropName: 'productFullReductionList'
        })(
          <ProductFullReductionList />
        )}
      </TabPane>
    </Tabs>
  )
});

export default PromotionType;
