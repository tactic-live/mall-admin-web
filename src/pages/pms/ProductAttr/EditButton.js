import React from 'react';
import { Button, Modal, Input } from 'antd';
import { connect } from 'react-redux';

import { updateAttributeCategory } from './action';

class EditButton extends React.Component {

  state = {
    value: null,
    id: null
  }

  constructor(props, context) {
    super(props, context);
    const { name, id } = props.record;
    this.state.value = name;
    this.state.id = id;
  }

  update = async () => {
    const { id, value } = this.state;
    const { dispatch } = this.props;
    const action = await updateAttributeCategory(id, value)
    dispatch(action);
  }

  // componentWillUpdate(nextProps, nextState, nextContext) {
  //   console.log('componentWillUpdate')
  //   const { id, name } = nextProps.record;
  //   nextState.id = id;
  //   nextState.value = name;
  // }

  render() {
    const { value } = this.state; console.log('render', this.state, this.props)
    return (
      <Button type="primary" ghost size="small" onClick={() => {
        Modal.confirm({
          title: '编辑类型',
          content: (
            <div>
              <Input addonBefore="类型名称" defaultValue={value} onChange={(e) => {
                const { value: val } = e.target;
                this.setState({
                  value: val
                });
              }} />
            </div>
          ),
          onOk: () => { this.update(); }
        });
      }}>编辑</Button>
    )
  }

}

const store = (state) => {
  return state;
}

export default connect(store)(EditButton);
