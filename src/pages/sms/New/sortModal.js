import React from 'react';
import { Modal, Button, Form, Input } from 'antd';

class DeliveryModal extends React.PureComponent {
  // 排序值
  sort = 0

  /**
   * 更改配送方式
   */
  updateSort = (value) => {
    this.sort = value;
  }

  /**
   * "确定"按钮点击事件
   */
  handleOk = () => {
    // // 判断物流单号是否填写
    // // 首先验证配送方式和物流单号都填写了
    // if (!this.deliveryCompany) {
    //   message.warning('请选择配送方式', 1);
    //   return;
    // }
    // if (!this.deliverySn) {
    //   message.warning('请填写物流单号', 1);
    //   return;
    // }

    // this.props.handleOk && this.props.handleOk({
    //   id: this.props.id || null,
    //   deliveryCompany: this.deliveryCompany,
    //   deliverySn: this.deliverySn
    // })
  }

  /**
   * "取消"按钮点击事件
   */
  handleCancel = () => {
    this.props.handleCancel && this.props.handleCancel();
  }

  render() {
    const { visible, loading = false } = this.props;
    return (
      <Modal
        visible={visible}
        title="设置排序"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>确定</Button>
        ]}
      >
        <Form>
          <Form.Item label="排序">
            <Input allowClear onChange={this.updateSort}  />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default DeliveryModal;