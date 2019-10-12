import React from 'react';
import QueryString from 'query-string';
import { Button, message } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { actions } from './action';
import CommonConsts from '@/consts/CommonConsts';
import './index.less';

// 添加/更新优惠券
class AddCoupon extends React.Component {

  render() {
    return (
      <div>add coupon page</div>
    )
  }
}

const store = (state) => {
  const { couponDetail, loading } = state.sms;
  return { _result: couponDetail, loading };
}

export default connect(store, actions)(AddCoupon);
