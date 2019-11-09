import React from 'react';
import { Modal, Button, Form, InputNumber } from 'antd';

class SortModal extends React.PureComponent {
  /**
   * "确定"按钮点击事件
   */
  onSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (values.sort !== null) {
        this.props.handleOk && this.props.handleOk({
          id: this.props.id || 0,
          values
        });
      } else {
        this.handleCancel();
      }
    });
  }

  /**
   * "取消"按钮点击事件
   */
  handleCancel = () => {
    this.props.form.setFields({
      sort: {
        value: this.props.sort
      },
    });
    this.props.handleCancel && this.props.handleCancel();
  }

  render() {
    const { visible, id, sort, loading = false } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={visible}
        title="设置排序"
        onOk={this.onSubmit}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.onSubmit}>确定</Button>
        ]}
      >
        <Form onSubmit={this.onSubmit}>
          <Form.Item label="排序">
            {getFieldDecorator('sort', {
              initialValue: sort
            })(<InputNumber key={`sort_${id}`} allowClear min={0} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const WrappedConditionForm = Form.create({ name: 'sort_form' })(SortModal);
export default WrappedConditionForm;
