import React, { useEffect } from 'react';
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
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

// 添加/更新优惠券
function AddCoupon(props) {
  const {
    match, getCouponDetail, data
  } = props;
  const { params } = match || {};
  const { id } = params || {};
  useEffect(() => {
    getCouponDetail(id);
    return () => {};
  }, [id]);

  const submitForm = (e) => {
    e.preventDefault();
    const { form } = props;
    form.validateFieldsAndScroll((err, values) => {
      const { createCoupon, updateCoupon, history } = props;
      if (!err) {
        const {
          effectDate = []
        } = values;
        const startTime = effectDate[0] ? moment(effectDate[0]) : null;
        const endTime = effectDate[1] ? moment(effectDate[1]) : null;
        const enableTime = new Date();
        let result = Object.assign({}, values, { startTime, endTime, enableTime });
        if (id) {
          updateCoupon(id, result);
        } else {
          createCoupon(result);
        }
        message.success('操作成功', 2);
        history.push('/sms/coupon');
      } else {
        message.warn('表单信息有误', 2);
      }
    })
  }

  const resetForm = (e) => {
    const { form } = props;
    form.resetFields();
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
      rules: [
        {
          required: true,
          message: '[优惠券类型] 不能为空',
        }
      ],
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
      rules: [
        {
          required: true,
          message: '[优惠券名称] 不能为空',
        }
      ],
    },
    {
      name: 'platform',
      label: '适用平台',
      rules: [
        {
          required: true,
          message: '[适用平台] 不能为空',
        }
      ],
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
      rules: [
        {
          required: true,
          message: '[总发行量] 不能为空',
        }
      ],
      placegolder: '只能输入正整数'
    },
    {
      name: 'amount',
      label: '面额',
      placegolder: '面额只能是数值，限2位小数',
      rules: [
        {
          required: true,
          message: '[面额] 不能为空',
        }
      ],
    },
    {
      name: 'perLimit',
      label: '每人限领',
      rules: [
        {
          required: true,
          message: '[每人限领] 不能为空',
        }
      ],
      render: (text) => <Input placeholder="只能输入正整数" addonAfter="张" />
    },
    {
      name: 'minPoint',
      label: '使用门槛',
      rules: [
        {
          required: true,
          message: '[使用门槛] 不能为空',
        }
      ],
      render: (text) => {
        return <Input addonBefore="满" addonAfter="元可用" />;
      }
    },
    {
      name: 'effectDate',
      label: '有效期',
      rules: [
        {
          required: true,
          message: '[有效期] 不能为空',
        }
      ],
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
      rules: [
        {
          required: true,
          message: '[可使用商品] 不能为空',
        }
      ],
      render: (text) => <UseTypeComp {...props} />
    },
    {
      name: 'note',
      label: '备注',
    }
  ];

  const { startTime, endTime } = data;
  const effectDate = [moment(startTime), moment(endTime)];
  const defaultData = Object.assign({}, data);
  defaultData.platform = `${data.platform}`;
  defaultData.type = `${data.type}`;
  defaultData.useType = `${data.useType}`;
  defaultData.effectDate = effectDate;
  return (
    <FormLayout
      {...formTailLayout}
      actions={operations}
      {...props}
      fields={fields}
      defaultValues={defaultData}
      data={defaultData}
    />
  )
}

const store = (state) => {
  const { couponDetail, loading } = state.sms;
  return { data: couponDetail, loading };
}

const connAddCoupon = connect(store, actions)(AddCoupon);
const WrappedAddCoupon = Form.create({ name: 'add.coupon' })(connAddCoupon)
export default WrappedAddCoupon;
