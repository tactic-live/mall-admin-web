import React from 'react';
import { Button, Modal, Input } from 'antd';
import { connect } from 'react-redux';

import { createAttributeCategory } from './action';

class EditButton extends React.Component {

  state = {
    value: null
  }

  create = async () => {
    const { value } = this.state;
    const { onCreate } = this.props;
    if (value) {
      await createAttributeCategory(value);
      onCreate && onCreate();
    }
  }

  // componentWillUpdate(nextProps, nextState, nextContext) {
  //   console.log('componentWillUpdate')
  //   const { id, name } = nextProps.record;
  //   nextState.id = id;
  //   nextState.value = name;
  // }

  render() {
    const { value } = this.state; console.log('render', this.state, this.props);
    return (
      <Button type="primary" ghost size="small" onClick={() => {
        Modal.confirm({
          title: '增加类型',
          content: (
            <div>
              <Input addonBefore="类型名称" defaultValue={value} onChange={(e) => {
                const { value: val } = e.target;
                this.setState({
                  value: val
                });
              }}
              />
            </div>
          ),
          onOk: () => { this.create(); }
        });
      }}>增加</Button>
    )
  }

}

const store = (state) => {
  return state;
}

export default connect(store)(EditButton);
