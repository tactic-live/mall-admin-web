import React from 'react';
import { Tabs } from 'antd';
import MemberPrice from './MemberPrice';
import PreferentialPromotion from './PreferentialPromotion';
import DifferentialPrice from './ProductLadder';
import PriceReduction from './PriceReduction';

const { TabPane } = Tabs;

const PromotionType = React.forwardRef((props, ref) => {
  const { form, data } = props;
  const { getFieldDecorator } = form;
  // function productLadderListNormalize(value) {
  //   console.log('productLadderListNormalize value', value)
  //   return value;
  // }
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
        <PriceReduction {...props} />
      </TabPane>
    </Tabs>
  )
});

export default PromotionType;
