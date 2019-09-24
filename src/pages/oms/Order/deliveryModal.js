import React from 'react';
import { Modal, Button, Form, Select, Input, message } from 'antd';

const { Option } = Select;
class DeliveryModal extends React.PureComponent {
  // 配送方式
  deliveryCompany = '';
  // 物流单号
  deliverySn = '';

  /**
   * 更改配送方式
   */
  updateDeliverWay = (value) => {
    this.deliveryCompany = value;
  }

  /**
   * 物流单号
   */
  updateTrackingNo = ({ target }) => {
    this.deliverySn = target.value;
  }

  /**
   * "确定"按钮点击事件
   */
  handleOk = () => {
    // 判断物流单号是否填写
    // 首先验证配送方式和物流单号都填写了
    if (!this.deliveryCompany) {
      message.warning('请选择配送方式', 1);
      return;
    }
    if (!this.deliverySn) {
      message.warning('请填写物流单号', 1);
      return;
    }

    this.props.handleOk && this.props.handleOk({
      id: this.props.id || null,
      deliveryCompany: this.deliveryCompany,
      deliverySn: this.deliverySn
    })
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
        title="订单发货"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>确定</Button>
        ]}
      >
        <Form layout="inline">
          <Form.Item>
            <Select
              style={{ width: 200 }}
              placeholder="请选择物流公司"
              onChange={this.updateDeliverWay}
            >
              <Option value="顺丰快递">顺丰快递</Option>
              <Option value="圆通快递">圆通快递</Option>
              <Option value="中通快递">中通快递</Option>
              <Option value="韵达快递">韵达快递</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Input allowClear placeholder="请填写物流单号" onChange={this.updateTrackingNo} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default DeliveryModal;