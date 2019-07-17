import React from 'react';
import FormLayout from '@/components/layout/form-layout';
import { Form } from 'antd';

function ProductAttr({ actions, ...rest }) {
  return (
    <FormLayout actions={actions} {...rest}/>
  )
}


const WrappedProductAttr = Form.create({ name: 'add.product.productAttr' })(ProductAttr)
export default WrappedProductAttr;
