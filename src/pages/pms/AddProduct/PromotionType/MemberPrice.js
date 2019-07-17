import React, { Fragment } from 'react';
import { Form, InputNumber } from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

/**
 * 会员价格
 */
const MemberPrice = (props) => {
  const { form, data = {} } = props;
  const { getFieldDecorator } = form;
  const { memberPriceList = [] } = data;
  const defaultValues = {};
  memberPriceList.forEach(memberPriceInfo => {
    defaultValues[memberPriceInfo.memberLevelId] = memberPriceInfo.memberPrice;
  })
  return (
    <Fragment>
      <Form.Item {...formItemLayout} label="黄金会员">
        {getFieldDecorator('memberPrice_1', {
          initialValue: defaultValues['1']
        })(
          <InputNumber precision={2} min={0} max={999} />
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="白金会员">
        {getFieldDecorator('memberPrice_2', {
          initialValue: defaultValues['2']
        })(
          <InputNumber precision={2} min={0} max={999} />
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="钻石会员">
        {getFieldDecorator('memberPrice_3', {
          initialValue: defaultValues['3']
        })(
          <InputNumber precision={2} min={0} max={999} />
        )}
      </Form.Item>
    </Fragment>
  )
};

export default (MemberPrice);
