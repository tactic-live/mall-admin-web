import React, { useEffect } from 'react';
import QueryString from 'query-string';
import { Form, Button, Select, Input, DatePicker, message } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import CommonConsts from '@/consts/CommonConsts';
import FormLayout from '@/components/layout/form-layout';
import { actions } from './action';
import UseTypeComp from './UseTypeComp';
import './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

// 添加/更新优惠券
function AddCoupon(props) {
  console.log('AddCoupon props', props);
  const submitForm = (e) => {
    e.preventDefault();
    const { form } = props;
    form.validateFieldsAndScroll((err, values) => {
      console.log('form values', values);
      const { createCoupon, history } = props;
      if (!err) {
        const {
          effectDate = []
        } = values;
        const startTime = effectDate[0] ? moment(effectDate[0]) : null;
        const endTime = effectDate[1] ? moment(effectDate[1]) : null;
        const enableTime = new Date();
        const result = Object.assign({}, values, { startTime, endTime, enableTime });
        createCoupon(result);
        message.success('操作成功', 2);
        history.push('/sms/coupon');
      } else {
        message.warn('表单信息有误', 2);
      }
    })
  }

  const resetForm = (e) => {
    //
  }

  const operations = [
    <Button type="primary" onClick={submitForm} key="submit">提交</Button>,
    <Button type="default" onClick={resetForm} key="reset">重置</Button>
  ];

  const { couponType, couponPlatform } = CommonConsts;

  const fields = [
    {
      name: 'type',
      label: '优惠券类型',
      render: (text) => {
        return (
          <Select placeholder="请选择">
            {Object.keys(couponType).map(
              val => <Option value={val} key={val}>{couponType[val]}</Option>)}
          </Select>
        );
      }
    },
    {
      name: 'name',
      label: '优惠券名称',
    },
    {
      name: 'platform',
      label: '适用平台',
      render: (text) => {
        return (
          <Select placeholder="请选择">
            {Object.keys(couponPlatform).map(
              val => <Option value={val} key={val}>{couponPlatform[val]}</Option>)}
          </Select>
        );
      }
    },
    {
      name: 'count',
      label: '总发行量',
      placegolder: '只能输入正整数'
    },
    {
      name: 'amount',
      label: '面额',
      placegolder: '面额只能是数值，限2位小数',
    },
    {
      name: 'perLimit',
      label: '每人限领',
      render: (text) => <Input placeholder="只能输入正整数" addonAfter="张" />
    },
    {
      name: 'minPoint',
      label: '使用门槛',
      render: (text) => {
        return <Input addonBefore="满" addonAfter="元可用" />;
      }
    },
    {
      name: 'effectDate',
      label: '有效期',
      render: (text) => {
        const disabledDate = (current) => {
          return current && current < moment().endOf('day');
        }
        return <RangePicker disabledDate={disabledDate} />;
      }
    },
    {
      name: 'useType',
      label: '可使用商品',
      render: (text) => <UseTypeComp {...props} />
    },
    {
      name: 'note',
      label: '备注',
    }
  ];

  return (
    <FormLayout actions={operations} {...props} fields={fields} />
  )
}


const store = (state) => {
  const { brandInfo, loading } = state.pms;
  return { brandInfo, loading };
}

const connAddCoupon = connect(store, actions)(AddCoupon);
const WrappedAddCoupon = Form.create({ name: 'add.coupon' })(connAddCoupon)
export default WrappedAddCoupon;
