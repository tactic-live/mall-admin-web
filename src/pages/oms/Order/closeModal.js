import React from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
const { TextArea } = Input;
class CloseModal extends React.PureComponent {

  note = '';
  /**
   * "确定"按钮点击事件
   */
  handleOk = (e) => {
    const { id } = this.props;
    e.preventDefault();
    if (this.note.trim()) {
      this.props.handleOk && this.props.handleOk({
        ids: id,
        note: this.note.trim()
      });
    } else {
      message.info('请填写关闭订单理由')
    }
  }

  onChange = ({ target: { value } }) => {
    console.log('onChange', value)
    this.note = value;
  }

  /**
   * "取消"按钮点击事件
   */
  handleCancel = () => {
    this.props.handleCancel && this.props.handleCancel();
  }

  render() {
    const { visible, loading = false, modalId, id } = this.props;
    return (
      <Modal
        visible={visible && modalId === id}
        title="关闭订单"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>确定</Button>
        ]}
      >
        <Form layout="inline">
          <Form.Item>
            <TextArea
              onChange={this.onChange}
              placeholder="关闭订单原因"
              autosize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: 'closeModal' })(CloseModal);