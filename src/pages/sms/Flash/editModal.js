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
      formDate[type] = e.target.value;
      this.setState({
        formDate: { ...formDate }
      })
    }

  }

  componentWillReceiveProps(props, nextprops) {
    this.setState({
      formDate: props.data || {}
    })
  }

  handleOk = () => {
    const { formDate } = this.state;
    const { isFrom } = this.props;
    if (!formDate.title) {
      message.info('请填写活动标题');
      return false
    }
    if (!formDate.startDate) {
      message.info('请填写开始时间');
      return false
    }
    if (!formDate.endDate) {
      message.info('请填写endDate');
      return false
    }
    this.props.handleOk && this.props.handleOk(this.state.formDate, isFrom);
  }

  /**
   * "取消"按钮点击事件
   */
  handleCancel = () => {
    this.props.handleCancel && this.props.handleCancel();
  }

  render() {
    const { visible, loading = false, editId, data, isFrom ,addIndex} = this.props;
    const { formDate } = this.state;
    const canVisible = (visible && editId === data.id) || (visible && isFrom === 'add' && addIndex === 0)
    console.log('formDate', addIndex )

    return (
      <Modal
        visible={canVisible}
        title="添加活动"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>确定</Button>
        ]}
      >
        <Form {...this.formItemLayout}>
          <Form.Item label="活动标题：" >
            <Input type="text"
              value={formDate ? formDate.title : ''}
              onChange={(value) => this.changeData(value, 'title')}
            />
          </Form.Item>
          <Form.Item label="开始时间：" >
            <Input type="date"
              value={formDate ? moment(formDate.startDate).format('YYYY-MM-DD') : new Date()}
              onChange={(value) => this.changeData(value, 'startDate')}
            />
          </Form.Item>
          <Form.Item label="结束时间：" >
            <Input type="date"
              value={formDate ? moment(formDate.endDate).format('YYYY-MM-DD') : new Date()}
              onChange={(value) => this.changeData(value, 'endDate')}
            />
          </Form.Item>
          <Form.Item label="上线/下线" >
            <Radio.Group value={formDate ? formDate.status : 1}
              onChange={(value) => this.changeData(value, 'status')}
            >
              <Radio value={1}>上线</Radio>
              <Radio value={0}>下线</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default EditModal;