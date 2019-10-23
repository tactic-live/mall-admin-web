import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { actions } from './action';
import CommonConsts from '@/consts/CommonConsts';
import './index.less';
import HistoryList from './HistoryList';

// 优惠券详情
class CouponDetail extends React.Component {
  componentDidMount() {
    const { fetchCouponDetail, match } = this.props;
    const { id } = match.params || {};
    fetchCouponDetail(id);
  }

  render() {
    const { couponDetail, match } = this.props;
    const { id } = match.params || {};
    const {
      name, type, useType, minPoint, amount, useStatus, startTime, endTime, publishCount, receiveCount, useCount
    } = couponDetail || {};
    const time = `${moment(startTime).format('YYYY-MM-DD')}至${moment(endTime).format('YYYY-MM-DD')}`;
    return (
      <React.Fragment>
        <div className="coupon-detail-info">
          <div className="cdi-block">名称：{name}</div>
          <div className="cdi-block">优惠券类型：{CommonConsts.couponType[type]}</div>
          <div className="cdi-block">可使用商品：{CommonConsts.couponUseType[useType]}</div>
          <div className="cdi-block">使用门槛：{minPoint || '无门槛'}</div>
          <div className="cdi-block">面值：{amount}</div>
          <div className="cdi-block">状态：{CommonConsts.couponUseStatus[useStatus]}</div>
          <div className="cdi-block">有效期：{time}</div>
          <div className="cdi-block">总发行量：{publishCount}</div>
          <div className="cdi-block">已领取：{receiveCount}</div>
          <div className="cdi-block">待领取：{publishCount-receiveCount}</div>
          <div className="cdi-block">已使用：{useCount}</div>
          <div className="cdi-block">未使用：{publishCount-useCount}</div>
        </div>
        <HistoryList id={id} {...this.props}/>
      </React.Fragment>
    )
  }
}

const store = (state) => {
  const { couponDetail, couponHistory, loading } = state.sms;
  return { couponDetail, _result: couponHistory, loading };
}

export default connect(store, actions)(CouponDetail);
