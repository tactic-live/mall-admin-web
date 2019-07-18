import React from 'react';
import { InputNumber } from 'antd';

const InputNumberPlus = React.forwardRef((props, ref) => {
  const { addonAfter } = props;
  return (
    <div>
      <InputNumber {...props} ref={ref} />
      <span className="ant-form-text"> {addonAfter}</span>
    </div>
  )
})

export default InputNumberPlus;
