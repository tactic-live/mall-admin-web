import React, { Fragment } from 'react';
import { Input, Form } from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

function FormItemLayout(props) {
  const { form, fields = [] } = props;
  const { getFieldDecorator } = form;
  return (
    <div>
      {
        fields.map(field => {
          // const {} = productInfo;
          const { label,
            placeholder: fieldPlaceholder, initialValue, name, render, component, span, ...rest
          } = field;
          const placeholder = fieldPlaceholder || label;
          const rules = field.rules || [];
          let itemComp = null;
          if (render) {
            itemComp = render(initialValue, field);
          } else if (component) {
            itemComp = React.createElement(component, {
              placeholder: placeholder,
              id: name
            });
          } else {
            itemComp = <Input placeholder={placeholder} />;
          }
          const labelCol = {
            ...formItemLayout.labelCol,
          }
          const wrapperCol = {
            ...formItemLayout.wrapperCol,
          }
          if (span !== undefined && span !== null) {
            wrapperCol.span = span
          }

          return (
            <Form.Item labelCol={labelCol} wrapperCol={wrapperCol} label={label} key={name}>
              {getFieldDecorator(name, {
                rules: rules.concat([]),
                initialValue,
                ...rest
              })(itemComp)}
            </Form.Item>
          );
        })
      }
    </div>
  )
}

export default FormItemLayout;
