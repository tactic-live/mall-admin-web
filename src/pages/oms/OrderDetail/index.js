import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './action';
import './index.less';

class OrderDetail extends Component {
  componentDidMount() {
    const { match, fetchOrderDetail } = this.props;
    console.log('this.props', this.props);
    const { id } = match.params || {};
    fetchOrderDetail(id);
  }
  
  render() {
    return (
      <div className="order-detail">order detail</div>
    )
  }
}

const store = (state) => {
  const { orderDetail, loading } = state.oms;
  return { _result: orderDetail, loading };
}

export default connect(store, actions)(OrderDetail);
