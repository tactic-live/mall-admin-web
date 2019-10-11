import React from 'react';
import QueryString from 'query-string';
import { Button, message } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { actions } from './action';
import { SearchLayout } from '@/components/layout';
import CommonConsts from '@/consts/CommonConsts';
import './index.less';

const couponTypeOptions = [];
for(let [key, value] of Object.entries(CommonConsts.couponType)) {
  couponTypeOptions.push({label: value, value: key});
}

const fields = [
  {
    name: 'couponName',
    label: '优惠券名称',
  },
  {
    name: 'couponType',
    label: '优惠券类型',
    type: 'select',
    options: couponTypeOptions
  },
];

class Coupon extends SearchLayout {
  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'couponId',
      width: 80
    },
    {
      title: '优惠券名称',
      dataIndex: 'name',
      key: 'couponName',
      width: 100
    },
    {
      title: '优惠券类型',
      dataIndex: 'type',
      key: 'couponType',
      width: 100,
      render: text => CommonConsts.couponType[text]
    },
    {
      title: '可使用商品',
      dataIndex: 'useType',
      key: 'couponUseType',
      width: 100,
      render: text => CommonConsts.couponUseType[text]
    },
    {
      title: '使用门槛',
      dataIndex: 'note',
      key: 'couponNote',
      width: 100
    },
    {
      title: '面值',
      dataIndex: 'amount',
      key: 'couponAmount',
      width: 100,
      render: text => `${text}元`
    },
    {
      title: '适用平台',
      dataIndex: 'platform',
      key: 'couponPlatform',
      width: 100,
      render: text => CommonConsts.couponPlatform[text]
    },
    {
      title: '有效期',
      dataIndex: 'startTime',
      key: 'couponStartTime',
      width: 100,
      render: (text, record) => {
        const { endTime } = record;
        const start = moment(text).format('YYYY-MM-DD');
        const end = moment(endTime).format('YYYY-MM-DD');
        return `${start}至${end}`;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'couponStatus',
      width: 100,
      render: text => CommonConsts.couponUseStatus[text]
    },
    {
      title: '操作',
      dataIndex: 'status',
      key: 'actions',
      render: (text, record) => (
        <div className='couponListBtn'>
          <Button type="primary" size="small" ghost onClick={() => { this.toPage('/show') }}>查看</Button>
          <Button type="primary" size="small" ghost onClick={() => { this.toPage('/edit') }}>编辑</Button>
          <Button type="primary" size="small" ghost onClick={() => { this.delete(record.id) }}>删除</Button>
        </div>
      ),
      width: 200
    }
  ]

  extActions = [(<Button key="coupon-add" onClick={() => this.toPage('/add')}>添加</Button>)];

  // 查看、新增、编辑
  toPage = (url) => {
    console.log('优惠券转跳到', url);
  }

  delete = (id) => {
    console.log('优惠券删除', id);
  }

  onSearch(searchCond) {
    const { location } = this.props;
    const defaultValues = QueryString.parse(location.search);
    const { pageSize } = defaultValues;
    this.setState({
      curCond: {
        current: 1,
        pageSize
      },
    })
    const condition = {
      ...this.state.curCond,
      ...searchCond
    };

    super.onSearch(condition);
  }

  async init() {
    const { location, fetchCouponListCondition } = this.props;
    const defaultValues = QueryString.parse(location.search);
    const { current, pageSize, ...rest } = defaultValues;
    fetchCouponListCondition({
      pageNum: current || 1,
      pageSize: pageSize || 5,
      ...rest
    })
  }

  componentDidMount() {
    const { location } = this.props;
    const defaultValues = QueryString.parse(location.search);
    const { current, pageSize, ...rest } = defaultValues;
    this.setState({
      conditionFields: fields,
      columns: this.columns,
      extActions: this.extActions,
      curPageCond: rest,
      curCond: { current, pageSize }
    });
    this.init();
  }
}

const store = (state) => {
  const { couponList, loading } = state.sms;
  if (couponList.list) {
    couponList.list = couponList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { _result: couponList, loading };
}

export default connect(store, actions)(Coupon);
