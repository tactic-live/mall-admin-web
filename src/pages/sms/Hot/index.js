import React from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { Switch, Button, Popconfirm } from 'antd';
import { SearchLayout } from '@/components/layout';
import { actions } from './action';

import './index.less';

const fields = [
  {
    name: 'productName',
    label: '商品名称',
    required: true,
    placeholder: ''
  },
  {
    name: 'recommendStatus',
    label: '上架状态',
    type: 'select',
    options: [
      { label: '未推荐', value: '0' },
      { label: '推荐中', value: '1' }
    ]
  }
];

class HotRecommend extends SearchLayout {

  extActions = [];

  columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 80
  }, {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'name',
    width: 100
  }, {
    title: '是否推荐',
    dataIndex: 'recommendStatus',
    key: 'recommendStatus',
    width: 100,
    render: (text, record) => {
      return (
        <Switch checked={!!text} onChange={(checked) => {
          const { updateHotRecommendStatus } = this.props;
          const status = checked ? 1 : 0;
          updateHotRecommendStatus({ ids: [record.id], recommendStatus: status })
        }
        } />
      );
    }
  }, {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 100
  }, {
    title: '状态',
    dataIndex: 'recommendStatus',
    key: 'status',
    width: 100,
    render: text => (text === 0 ? '未推荐' : '推荐中'),
  }, {
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
    width: 80,
    render: (text, record) => {
      return (
        <div>
          <Button type="primary" size="small" ghost onClick={() => { }}>设置排序</Button>
          <Popconfirm
              title={`确认要删除该推荐商品吗?`}
              onConfirm={() => {
                const { deleteHotRecommendProduct } = this.props;
                deleteHotRecommendProduct(record.id);
                this.reSearch();
              }}
              okText="删除"
              cancelText="取消"
            >
              <Button type="primary" ghost size="small" onClick={() => { }}>删除</Button>
            </Popconfirm>
        </div>
      );
    }
  }];

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
    const { location, fetchHotRecommendProductList } = this.props;
    const { search } = location;
    const params = QueryString.parse(search);
    const { current = 1, pageSize = 5, productName, recommendStatus } = params;
    fetchHotRecommendProductList({
      pageNum: current,
      pageSize: pageSize,
      productName,
      recommendStatus
    });
  }
}

const store = (state) => {
  const { sms = {} } = state;
  const { hotRecommendList = {}, loading } = sms;
  const retVal = { ...hotRecommendList };
  if (hotRecommendList.list) {
    retVal.list = hotRecommendList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { _result: retVal, loading };
}

export default connect(store, actions)(HotRecommend);
