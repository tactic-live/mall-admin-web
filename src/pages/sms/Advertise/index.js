import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import QueryString from 'query-string';
import moment from 'moment';
import { Switch, Button, Popconfirm } from 'antd';
import { SearchLayout } from '@/components/layout';
import { actions } from './action';

import './index.less';

const fields = [
  {
    name: 'name',
    label: '广告名称',
    required: true,
    placeholder: ''
  },
  {
    name: 'type',
    label: '广告位置',
    type: 'select',
    options: [
      { label: 'PC首页轮播', value: '0' },
      { label: 'APP首页轮播', value: '1' }
    ]
  },
  {
    name: 'endTime',
    label: '到期时间',
    type: 'date-picker',
    format: 'YYYY-MM-DD'
  }
];

class Advertise extends SearchLayout {

  extActions = [(
    <Link to={{ pathname: '/sms/addAdvertise' }} key='add'>
      <Button type="primary" ghost size="small" onClick={() => { }}>添加</Button>
    </Link>
  )];

  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      // width: 80
    },
    {
      title: '广告名称',
      dataIndex: 'name',
      key: 'name',
      // width: 100
    },
    {
      title: '广告位置',
      dataIndex: 'type',
      key: 'type',
      // width: 100,
      render: (text) => {
        return (<div>{text === 1 ? 'app首页轮播' : 'PC首页轮播'}</div>)
      }
    },
    {
      title: '广告图片',
      dataIndex: 'pic',
      key: 'pic',
      // width: 100,
      render: (text) => {
        return (
          <div className="ad-img-wrap"><img src={text} alt="" /></div>
        );
      }
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      // width: 100,
      render: (text, record) => {
        const { startTime, endTime } = record;
        return (
          <div>
            <p>开始时间:{moment(startTime).format("YYYY-MM-DD HH:mm:ss")}</p>
            <p>结束时间:{moment(endTime).format("YYYY-MM-DD HH:mm:ss")}</p></div>
        );
      }
    },
    {
      title: '上线/下线',
      dataIndex: 'status',
      key: 'status',
      // width: 100,
      render: (text, record) => {
        const { id, delStatus } = record;
        return (
          <Switch
            checked={!!text}
            disabled={delStatus}
            onChange={(checked) => {
              const { updateAdvertiseStatus } = this.props;
              const status = checked ? 1 : 0;
              updateAdvertiseStatus({ id, status });
            }}
          />
        )
      }
    },
    {
      title: '点击次数',
      dataIndex: 'clickCount',
      key: 'clickCount',
    },
    {
      title: '生成订单',
      dataIndex: 'orderCount',
      key: 'orderCount',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      // width: 80,
      render: (text, record) => {
        const { id, delStatus } = record;
        return (
          <div className="advertise-action-wrap">
            <Link to={{ pathname: '/sms/updateAdvertise', search: `?id=${id}` }}>
              <Button type="primary" ghost size="small" disabled={delStatus} onClick={() => { }}>编辑</Button>
            </Link>
            &nbsp;&nbsp;
            <Popconfirm
              disabled={delStatus}
              title="是否要删除该广告"
              onConfirm={() => {
                const { deleteAdvertiseById } = this.props;
                deleteAdvertiseById([id]);
              }}
              okText="删除"
              cancelText="取消"
            >
              <Button type="primary" ghost size="small" disabled={delStatus} onClick={() => { }}>删除</Button>
            </Popconfirm>
          </div>
        );
      }
    }
  ];

  constructor(props, context) {
    super(props, context);
    this.state.conditionFields = fields;
    this.state.extActions = this.extActions;
    this.state.columns = this.columns;
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    const { location, fetchAdvertiseList } = this.props;
    const { search } = location;
    const params = QueryString.parse(search);
    const { current = 1, pageSize = 5, name, type, endTime } = params;
    fetchAdvertiseList({
      pageNum: current,
      pageSize: pageSize,
      name,
      type,
      endTime: endTime ? moment(endTime).format('YYYY-MM-DD') : ''
    });
  }
}

const store = (state) => {
  const { sms = {} } = state;
  const { advertiseList = {}, loading } = sms;
  const retVal = { ...advertiseList };
  if (advertiseList.list) {
    retVal.list = advertiseList.list.map(item => {
      item.key = item.id;
      return item;
    });
  }
  return { _result: retVal, loading };
}

export default connect(store, actions)(Advertise);
