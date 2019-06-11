import React, { useState } from 'react';
import { Input, Icon } from "antd";

import './index.less';

class InputClose extends React.Component {
  state = {
    value: this.props.defaultValue
  }
  clearInput = (e) => {
    const { onChange } = this.props;

    this.setState({
      value: ''
    });
    onChange(e);
  }

  updateValue = (e) => {
    const { onChange } = this.props;
    onChange(e);
    this.setState({
      value: e.currentTarget.value
    });
  }
  render() {
    const { onChange, ...rest } = this.props;
    const { value } = this.state;

    let suffix = null;
    if (value) {
      suffix = <Icon type="close-circle" theme="filled" onClick={this.clearInput} className="input-suffix" />;
    }
    // const ForwardInputClose = React.forwardRef((_props, ref) => <InputClose {..._props} ref={ref} />);
    return <Input {...rest} value={value} onChange={this.updateValue} suffix={suffix} className="input-close" />;
  }
}

// export default React.forwardRef((_props, ref) => <InputClose {..._props} ref={ref} />);
export default InputClose;
