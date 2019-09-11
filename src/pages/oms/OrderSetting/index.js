import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { actions } from './action';
import './index.less';
import FormLayout from '@/components/layout/form-layout';

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18, offset: 4 },
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18},
}

class OrderSetting extends React.Component {

  async  componentDidMount() {
    const { fetchOrderSetting } = this.props;
    await fetchOrderSetting(1);
  }

  onLoad = () => {
    const { form } = this.props;
    const step2Data = {
      promotionType: "1",
      promotionStartTime: moment()
    }
    form.setFieldsValue(step2Data);
  }

  InputNumber = ({ value, tips, desc }) => (
    <div className="setting-input-main">
      <div className="setting-input ">
        <Input type="number" min='0' className="flashOrderOvertime" defaultValue={value} />
        <p>{tips}</p>
      </div>
      <span className="setting-desc">{desc}</span>
    </div>
  )

  fields = (props) => [
    {
      name: 'flashOrderOvertime',
      label: '秒杀订单超过：',
      rules: [],
      render: (text) => this.InputNumber({ value: props.flashOrderOvertime, tips: '分', desc: '未付款，订单自动关闭' })
    },
    {
      name: 'normalOrderOvertime',
      label: '正常订单超过：',
      rules: [],
      render: (text) => this.InputNumber({ value: props.normalOrderOvertime, tips: '分', desc: '未付款，订单自动关闭' })
    },
    {
      name: 'confirmOvertime',
      label: '发货超过：',
      rules: [],
      render: (text) => this.InputNumber({ value: props.confirmOvertime, tips: '天', desc: '未收货，订单自动完成' })
    },
    {
      name: 'finishOvertime',
      label: '订单完成超过：',
      rules: [],
      render: (text) => this.InputNumber({ value: props.finishOvertime, tips: '天', desc: '自动结束交易，不能申请售后' })
    },
    {
      name: 'commentOvertime',
      label: '订单完成超过：',
      rules: [],
      render: (text) => this.InputNumber({ value: props.commentOvertime, tips: '天', desc: '自动五星好评' })
    },
  ]

  submitForm = (e) => {
    e.preventDefault();
    const { form } = this.props;
    // const { current, tmpDatas } = this.state;
    // const currentStepComp = stepFormList[current];
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { orderSetting, updateOrderSetting, } = this.props;
        let isFormit = true;
        for (const data in values) {
          values[data] = Number(values[data] || orderSetting[data]);
          if (values[data] < 0) {
            console.log('orderSettingorderSettingorderSetting', data, values[data])
            message.info('请填写大于0的数字');
            isFormit = false
            break;
          }
        }
        if (isFormit) {
          const data = await updateOrderSetting({ id: orderSetting['id'], condition: values });
          const { isOrderSettingUpdateSuccess } = this.props;
          console.log('datadatadata', this.props, isOrderSettingUpdateSuccess)
          if (isOrderSettingUpdateSuccess) {
            message.info('修改成功');
          } else {
            message.error('修改失败');
          }
        }
      }
    })
  }

  render() {
    const { orderSetting, ...rest } = this.props;
    const actions =
      (
        <Button className="setting-btn" type="primary" onClick={this.submitForm} key="submit">提交</Button>
      )

    const fields = this.fields({ ...orderSetting });

    return (
      <div className="setting">
        <FormLayout formItemLayout={formItemLayout} fields={fields} {...rest} {...formTailLayout}
          onLoad={this.onLoad} actions={actions} onSubmit={this.submitForm} key={orderSetting.id}>
        </FormLayout>
      </div>


    )
  }
}

const store = (state) => {
  const { orderSetting, loading, isOrderSettingUpdateSuccess } = state.oms;
  return { orderSetting: orderSetting, loading, isOrderSettingUpdateSuccess };
}

const WrappedOrderSetting = Form.create({ name: 'change.orderSetting' })(OrderSetting)
export default connect(store, actions)(WrappedOrderSetting);
