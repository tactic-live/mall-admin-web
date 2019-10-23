import React from 'react';
import QueryString from 'query-string';
import { Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
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
    name: 'name',
    label: '优惠券名称',
  },
  {
    name: 'type',
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
          <Link href={`/sms/couponDetail/${record.id}`} to={`/sms/couponDetail/${record.id}`}>
            <Button
              type="primary"
              size="small"
              ghost
              // onClick={() => this.toPage(`/sms/couponDetail/${record.id}`)}
            >查看</Button>
          </Link>
          <Button
            type="primary"
            size="small"
            ghost
            onClick={() => this.toPage(`/sms/couponAdd/${record.id}`)}
          >编辑</Button>
          <Popconfirm
            placement="top"
            title="确定要删除该优惠券吗？"
            onConfirm={() => this.delete(record)}
            okText="是"
            cancelText="否"
          >
            <Button type="primary" size="small" ghost>删除</Button>
          </Popconfirm>
        </div>
      ),
      width: 200
    }
  ]

  extActions = [(<Button key="coupon-add" onClick={() => this.toPage('/sms/couponAdd/0')}>添加</Button>)];

  // 查看、新增、编辑
  toPage = (url) => {
    const { history } = this.props;
    history.push(url);
  }

  delete = async (record) => {
    const { id, name } = record;
    const { deleteCoupon } = this.props;
    await deleteCoupon(id);
    message.success(`优惠券【${name}】删除成功`);
    this.reSearch();
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
  const { couponList, couponDeleteNum, loading } = state.sms;
  if (couponList.list) {
    couponList.list = couponList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { _result: couponList, couponDeleteNum, loading };
}

export default connect(store, actions)(Coupon);
