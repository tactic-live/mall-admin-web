import React from 'react';
import { Modal, Button, Form, Input, Radio, message, TimePicker } from 'antd';
import moment from 'moment';
import { formatDate } from './date'

class EditModal extends React.PureComponent {

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  state = {
    formDate: {
      name: null,
      startTime: null,
      endTime: null,
      status: 0
    }
  }

  changeData = (e, type) => {
    const { formDate } = this.state;
    console.log('formDate', formDate, e)
    if (formDate) {

      formDate[type] = (type === 'startTime' || type === 'endTime') ? e : e.target.value;
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

  updateTime = (date) => {
    // 转换成UTC时间
    if (moment.isMoment(date)) {
      const utcDate = date.utc();
      const hours = utcDate.hours() >= 10 ? utcDate.hours() : `0${utcDate.hours()}`;
      const min = utcDate.minutes() >= 10 ? utcDate.hours() : `0${utcDate.hours()}`;
      return `1970-01-01T${hours}:${min}:00.000+0000`
    } else {
      return date
    }
  }

  handleOk = () => {
    const { formDate } = this.state;
    const { isFrom } = this.props;
    let data = formDate
    if (!formDate.name) {
      message.info('秒杀时间段名称');
      return false
    }
    if (!formDate.startTime) {
      message.info('每日开始时间');
      return false
    }
    if (formDate.startTime) {
      if (moment.isMoment(formDate.startTime)) {
        data.startTime = this.updateTime(formDate.startTime)
        console.log('formDate.startTime', data.startTime)
      }
    }
    if (!formDate.endTime) {
      message.info('每日结束时间');
      return false
    }
    if (formDate.endTime) {
      if (moment.isMoment(formDate.endTime)) {
        data.endTime = this.updateTime(formDate.endTime)
      }
    }


    this.props.handleOk && this.props.handleOk(data, isFrom);
  }

  /**
   * "取消"按钮点击事件
   */
  handleCancel = () => {
    this.props.handleCancel && this.props.handleCancel();
  }


  formateDate = (time) => {
    if (time == null || time === '') {
      return 'N/A';
    }
    let date = new Date(time);
    const res = formatDate(date, 'hh:mm');
    return moment(res, 'hh:mm')
  }

  render() {
    const { visible, loading = false, editId, data, isFrom, addIndex } = this.props;
    const { formDate } = this.state;
    const canVisible = (visible && data && editId === data.id) || (visible && isFrom === 'add' && addIndex === 0)
    return (
      <Modal
        visible={canVisible}
        title="秒杀时间"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>确定</Button>
        ]}
      >
        <Form {...this.formItemLayout}>
          <Form.Item label="秒杀时间段名称：" >
            <Input type="text"
              value={formDate ? formDate.name : ''}
              onChange={(value) => this.changeData(value, 'name')}
            />
          </Form.Item>
          <Form.Item label="每日开始时间：" >
            <TimePicker
              defaultValue={formDate && formDate.startTime ? this.formateDate(formDate.startTime, 'HH:mm') : moment('00:00', 'HH:mm')}
              onChange={(value) => this.changeData(value, 'startTime')}
              format={'HH:mm'}
            />
          </Form.Item>
          <Form.Item label="每日结束时间：" >
            <TimePicker
              defaultValue={formDate && formDate.endTime ? this.formateDate(formDate.endTime, 'HH:mm') : moment('00:00', 'HH:mm')}
              onChange={(value) => this.changeData(value, 'endTime')}
              format={'HH:mm'}
            />
          </Form.Item>
          <Form.Item label="上线/下线" >
            <Radio.Group value={formDate ? formDate.status : 1}
              onChange={(value) => this.changeData(value, 'status')}
              format={'HH:mm'}
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