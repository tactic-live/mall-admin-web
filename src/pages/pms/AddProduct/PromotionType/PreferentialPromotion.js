import React, { useEffect } from 'react';
import { InputNumber, Form, DatePicker } from "antd";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

/**
 * 特惠促销
 */
function PreferentialPromotion({ form, data = {} }) {
  const { getFieldDecorator } = form;
  return (
    <div>
      <Form.Item {...formItemLayout} label="开始时间">
        {getFieldDecorator('promotionStartTime', {
          initialValue: data.promotionStartTime
        })(
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="结束时间">
        {getFieldDecorator('promotionEndTime', {
          initialValue: data.promotionEndTime
        })(
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="促销价格">
        {getFieldDecorator('promotionPrice', {
          initialValue: data.promotionPrice
        })(
          <InputNumber precision={2} min={0} max={999} />
        )}
      </Form.Item>
    </div>
  )
}

export default PreferentialPromotion;
