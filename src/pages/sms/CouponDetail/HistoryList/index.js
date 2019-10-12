import React from 'react';
import QueryString from 'query-string';
import moment from 'moment';
import { SearchLayout } from '@/components/layout';
import CommonConsts from '@/consts/CommonConsts';
import './index.less';

const couponUseStatusOptions = [];
for(let [key, value] of Object.entries(CommonConsts.couponUseStatus)) {
  couponUseStatusOptions.push({label: value, value: key});
}

const fields = [
  {
    name: 'useStatus',
    label: '使用状态',
    type: 'select',
    options: couponUseStatusOptions
  },
  {
    name: 'orderSn',
    label: '订单编号',
  }
];

class HistoryList extends SearchLayout {
  columns = [
    {
      title: '优惠码',
      dataIndex: 'couponCode',
      key: 'couponCode',
      width: 80
    },
    {
      title: '领取会员',
      dataIndex: 'memberNickname',
      key: 'couponMemberNickname',
      width: 100
    },
    {
      title: '领取方式',
      dataIndex: 'getType',
      key: 'couponGetType',
      width: 100,
      render: text => CommonConsts.couponGetType[text]
    },
    {
      title: '领取时间',
      dataIndex: 'createTime',
      key: 'couponCreateTime',
      width: 100,
      render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '当前状态',
      dataIndex: 'useStatus',
      key: 'couponUseStatus',
      width: 100,
      render: text => CommonConsts.couponUseStatus[text]
    },
    {
      title: '使用时间',
      dataIndex: 'useTime',
      key: 'couponUseTime',
      width: 100,
      render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
    }
  ]

  extActions = [];

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
    const { location, fetchCouponHistory } = this.props;
    const defaultValues = QueryString.parse(location.search);
    const { current, pageSize, ...rest } = defaultValues;
    fetchCouponHistory({
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

export default HistoryList;
