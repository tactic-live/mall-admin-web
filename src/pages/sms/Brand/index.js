import React from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { Popconfirm, Switch, Button, message } from 'antd';

import { SearchLayout } from '@/components/layout';
import SortModal from '@/components/sort-modal';
import { actions } from './action';

import './index.less';

class Brand extends SearchLayout {
  fields = [{
    name: 'brandName',
    label: '品牌名称'
  }, {
    name: 'recommendStatus',
    label: '推荐状态',
    type: 'select',
    options: [{
      value: null,
      label: '全部'
    }, {
      value: '0',
      label: '未推荐'
    }, {
      value: '1',
      label: '推荐中'
    }]
  }];

  extActions = [];

  columns = [{
    title: '品牌编号',
    dataIndex: 'brandId',
    key: 'id',
    width: 80
  }, {
    title: '品牌名称',
    dataIndex: 'brandName',
    key: 'name',
    width: 100
  }, {
    title: '是否推荐',
    dataIndex: 'recommendStatus',
    key: 'recommend',
    width: 100,
    render: (text, record) => {
      return (
        <Switch
          defaultChecked={!!text}
          onChange={(checked) => {
            text !== null ?
              this.updateRecommendStatus([record.id], checked) :
              this.insertRecommendBrand([{
                brandId: record.brandId,
                brandName: record.brandName
              }]);
          }}
        />
      )
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
    render: text => (text === 1 ? '推荐中' : '未推荐'),
  }, {
    title: '操作',
    dataIndex: 'id',
    key: 'actions',
    render: (text, record) => {
      const { sort } = record;
      const { sortDatas } = this.state;
      const { visibleId } = sortDatas;
      let modalVisible = text && visibleId === text;
      const isRecommendActions = (
        <div className="sms-brand-table-actions">
          <div className="action-sort">
            <SortModal
              id={text}
              sort={sort}
              visible={modalVisible}
              loading={this.props.loading}
              handleOk={this.confirmSort}
              handleCancel={this.cancelSort}
            />
            <Button
              type="primary"
              size="small"
              ghost
              onClick={() => { this.onSort(text, sort); }}
            >
              设置排序
            </Button>
          </div>
          <div className="action-delete">
            <Popconfirm
              title="确认要删除该推荐吗？"
              okText="删除"
              cancelText="取消"
              onConfirm={() => {
                this.deleteRecommend(text);
              }}
            >
              <Button
                type="primary"
                size="small"
                ghost
              >
                删除
              </Button>
            </Popconfirm>
          </div>
        </div>
      );
      const ele = text ? isRecommendActions : null;
      return ele;
    },
    width: 80
  }];

  constructor(props, context) {
    super(props, context);
    this.state.conditionFields = this.fields;
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
    const { location, fetchBrandList } = this.props;
    const { search } = location;
    const params = QueryString.parse(search);
    const { current = 1, pageSize = 5, ...rest } = params;
    fetchBrandList({
      pageNum: current,
      pageSize: pageSize,
      ...rest
    });
  }

  /**
   * 新增品牌推荐
   * @param {Array} brandList 品牌列表
   */
  insertRecommendBrand = async (brandList) => {
    await this.props.addRecommendBrands(brandList);

    message.success('操作成功');
  }

  /**
   * 更新推荐状态
   * @param {Array} ids 编号列表
   * @param {Boolean} checked 是否推荐
   */
  updateRecommendStatus = async (ids, checked) => {
    const recommendStatus = checked ? 1 : 0;
    await this.props.updateBrandRecommendStatus(ids, recommendStatus);

    message.success('操作成功');
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
    await this.props.updateBrandSort(id, sort);

    message.success('操作成功');
    // 关闭排序弹层
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

  /**
   * 删除推荐
   * @param {Number} id 编号
   */
  deleteRecommend = async (id) => {
    await this.props.deleteBrands([id]);
    message.success('操作成功');
  }
}

const store = (state) => {
  const { loading, brandList = {} } = state.sms;
  const retVal = { ...brandList };
  if (brandList.list) {
    retVal.list = brandList.list.map(item => {
      item.key = item.brandId
      return item;
    });
  }
  return { loading, _result: retVal };
}

export default connect(store, actions)(Brand);
