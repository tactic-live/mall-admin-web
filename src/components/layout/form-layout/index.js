import React from 'react';
import { Form } from 'antd';
import InputItemLayout from '../input-item-layout';

function FormLayout({ onSubmit, fields, formTailLayout, actions, labelCol, wrapperCol, ...rest }) {
  return (
    <Form onSubmit={onSubmit}>
      <InputItemLayout fields={fields} {...rest}/>
      <Form.Item labelCol={labelCol} wrapperCol={wrapperCol}>
        <div className="actions">
          {actions}
        </div>
      </Form.Item>
    </Form>
  );
}

export default FormLayout;
