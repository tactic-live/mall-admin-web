import React from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { Switch, Button, Popconfirm } from 'antd';
import { SearchLayout } from '@/components/layout';
import SortModal from '@/components/sort-modal';
import { actions } from './action';

import './index.less';

const fields = [];

class FlashProductRelation extends SearchLayout {

  extActions = [
    (
      <div>
        <Button type="primary" className='activitykey' ghost key="activitykey" onClick={() => this.handleAdd()}>添加</Button>
      </div>
    )
  ];


  columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 80
  }, {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    width: 100
  }, {
    title: '货号',
    dataIndex: 'productSn',
    key: 'productSn',
    width: 100
  }, {
    title: '商品价格',
    dataIndex: 'price',
    key: 'price',
    width: 100
  }, {
    title: '剩余数量',
    dataIndex: 'stock',
    key: 'stock',
    width: 100
  }, {
    title: '秒杀价格',
    dataIndex: 'flashPromotionCount',
    key: 'flashPromotionCount',
    width: 100
  }, {
    title: '限购数量',
    dataIndex: 'flashPromotionLimit',
    key: 'flashPromotionLimit',
    width: 100
  }, {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 100
  }, {
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
    width: 80,
    render: (text, record) => {
      const { id, sort, delStatus } = record;
      const { sortDatas } = this.state;
      const { visibleId } = sortDatas;
      const modalVisible = visibleId === id;
      return (
        <div className="hot-recommend-action-btn">
          <div className="hot-recommend-sort-btn">
            <SortModal
              id={id}
              sort={sort}
              visible={modalVisible}
              loading={this.props.loading}
              handleOk={this.confirmSort}
              handleCancel={this.cancelSort}
            />
            <Button type="primary" size="small" ghost disabled={delStatus} onClick={() => { this.onSort(id, sort); }}>设置排序</Button>
          </div>

          <Popconfirm
            disabled={delStatus}
            title={`确认要删除该推荐商品吗?`}
            onConfirm={() => {
              const { deleteHotRecommendProduct } = this.props;
              deleteHotRecommendProduct([record.id]);
            }}
            okText="删除"
            cancelText="取消"
          >
            <Button type="primary" ghost size="small" disabled={delStatus}>删除</Button>
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
    // 排序modal数据
    this.state.sortDatas = {
      visibleId: null,
      sort: 0
    }
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

  /**
 * "设置排序"按钮点击事件
 * @param {Number} id 编号
 * @param {Number} sort 原有排序
 */
  onSort = (id, sort) => {
    this.setState({
      sortDatas: {
        visibleId: id,
        sort
      }
    });
  }

  /**
   * 确认排序操作
   */
  confirmSort = async ({ id, values }) => {
    const { sort } = values;
    const { updateHotRecommendProductSort } = this.props;
    updateHotRecommendProductSort({ sort, id });
    this.cancelSort();
  }

  /**
   * 取消排序操作
   */
  cancelSort = () => {
    this.setState({
      sortDatas: {
        visibleId: null,
        sort: 0
      }
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

export default connect(store, actions)(FlashProductRelation);
