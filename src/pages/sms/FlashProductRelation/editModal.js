import React from 'react';
import { Modal, Button, Form, Input, Radio, message } from 'antd';
import moment from 'moment';


class EditModal extends React.PureComponent {

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  state = {
    formDate: null
  }

  changeData = (e, type) => {
    const { formDate } = this.state;
    if (formDate) {
      formDate[type] = Number(e.target.value);
      this.setState({
        formDate: { ...formDate }
      })
    }

  }

  componentWillReceiveProps(props, nextprops) {
    this.setState({
      formDate: {...props.data} || {}
    })
    console.log('formDate', this.state.formDate)

  }

  handleOk = () => {
    const { formDate } = this.state;
    console.log('formDate', formDate)
    this.props.handleOk && this.props.handleOk(formDate);
  }

  /**
   * "取消"按钮点击事件
   */
  handleCancel = () => {
    this.props.handleCancel && this.props.handleCancel();
  }

  render() {
    const { visible, loading = false, editId, data } = this.props;
    const { formDate } = this.state;
    const canVisible = visible && editId === formDate.id;
    console.log('canVisible', canVisible, editId, data)
    return (
      <Modal
        visible={canVisible}
        title="编辑秒杀商品信息"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>确定</Button>
        ]}
      >
        <Form {...this.formItemLayout}>
          <Form.Item label="商品名称:" >
            <Input type="text"
              value={formDate && formDate.product && formDate.product ? formDate.product.name : ''}
              disabled={true}
            />
          </Form.Item>
          <Form.Item label="货号:" >
            <Input type="text"
              value={formDate && formDate.product ? `NO.${formDate.product.productSn}` : ''}
              disabled={true}
            />
          </Form.Item>
          <Form.Item label="商品价格:" >
            <Input prefix="￥" suffix="RMB"
              value={formDate && formDate.product ? `${formDate.product.price}` : ''}
              disabled={true}
            />
          </Form.Item>
          <Form.Item label="秒杀价格:" >
            <Input prefix="￥" suffix="RMB"
              value={formDate ? `${formDate.flashPromotionPrice}` : ''}
              onChange={(value) => this.changeData(value, 'flashPromotionPrice')}
            />
          </Form.Item>
          <Form.Item label="剩余数量：" >
            <Input type="number"
              value={formDate && formDate.product ? `${formDate.product.stock}` : ''}
              disabled={true}
            />
          </Form.Item>
          <Form.Item label="秒杀数量：" >
            <Input type="number"
              value={formDate ? `${formDate.flashPromotionCount}` : ''}
              onChange={(value) => this.changeData(value, 'flashPromotionCount')}
            />
          </Form.Item>
          <Form.Item label="限购数量：" >
            <Input type="number"
              value={formDate ? `${formDate.flashPromotionLimit}` : ''}
              onChange={(value) => this.changeData(value, 'flashPromotionLimit')}
            />
          </Form.Item>
          <Form.Item label="排序：" >
            <Input type="number"
              value={formDate ? `${formDate.sort}` : ''}
              onChange={(value) => this.changeData(value, 'sort')}
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default EditModal;