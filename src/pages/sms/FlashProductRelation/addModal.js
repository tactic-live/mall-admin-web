import React from 'react';
import { Modal, Button, Form, Input, Radio } from 'antd';
class AddModal extends React.PureComponent {

  addOk = () => {
    const { data } = this.props;
    this.props.addOk && this.props.addOk(data);
  }

  /**
   * "取消"按钮点击事件
   */
  addCancel = () => {
    this.props.delectCancel && this.props.delectCancel();
  }

  render() {
    const { cancelVisible, loading = false, delectId, data } = this.props;
    console.log('cancelVisible', cancelVisible)
    return (
      <Modal
        visible={cancelVisible && delectId === data.id}
        title="提示"
        onOk={this.delectOk}
        onCancel={this.delectCancel}
        footer={[
          <Button key="back" onClick={this.addCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.addOk}>确定</Button>
        ]}
      >
        <Form {...this.formItemLayout}>
          <Form.Item label="商品名称:" >
            <Input type="text"
              // value={formDate && formDate.product && formDate.product ? formDate.product.name : ''}
              disabled={true}
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default AddModal;