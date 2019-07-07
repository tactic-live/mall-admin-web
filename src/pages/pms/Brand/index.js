import React from 'react';
import { SearchLayout } from '@/components/layout';
import { Popconfirm, Button, Switch, message } from 'antd';
import QueryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from './action';


class Brand extends SearchLayout {

  fields = [
    {
      name: 'keyword',
      label: '输入搜索',
      required: true,
      placeholder: '品牌名称/关键字',
      span: 12
    }
  ];

  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '品牌名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '品牌首字母',
      dataIndex: 'firstLetter',
      key: 'firstLetter',
      width: 150
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 80
    },
    {
      title: '品牌制造商',
      dataIndex: 'factoryStatus',
      key: 'factoryStatus',
      width: 150,
      render: (text, record) => <Switch checked={!!text} onChange={(checked) => {
        const factoryStatus = checked ? 1 : 0;
        this.updateFactoryStatus([record.id], factoryStatus)
      }} />
    },
    {
      title: '是否显示',
      dataIndex: 'showStatus',
      key: 'showStatus',
      width: 150,
      render: (text, record) => <Switch checked={!!text} onChange={(checked) => {
        const showStatus = checked ? 1 : 0;
        this.updateShowStatus([record.id], showStatus)
      }} />
    },
    {
      title: '相关',
      dataIndex: 'id',
      key: 'about',
      width: 200,
      render: (text, record) => (
        <div>
          商品: {record.productCount}
          评价: {record.productCommentCount}
        </div>
      )
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'actions',
      width: 150,
      render: (text, record) => (
        <div>
          <Link to={`/pms/updateBrand/${text}`}>
            <Button ghost type="primary" size="small">编辑</Button>
          </Link>
          &nbsp;
          <Popconfirm
            title={`确认要删除品牌 [${record.name}] 吗?`}
            onConfirm={() => this.deleteBrand(text, record.name)}
            okText="删除"
            onCancel="取消"
          >
            <Button ghost type="danger" size="small">删除</Button>
          </Popconfirm>
        </div>
      )
    },
  ];

  extActions = [
    (
      <Link to="/pms/addBrand" key="btnAdd">
        <Button type="primary" ghost>添加</Button>
      </Link>
    )
  ]

  constructor(props, context) {
    super(props, context);
    this.state.conditionFields = this.fields
    this.state.columns = this.columns
    this.state.extActions = this.extActions;
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const { fetchAll, location } = this.props;
    console.log('props', this.props)
    const { search } = location;
    const params = QueryString.parse(search);
    const { current, pageSize = 10 } = params;
    fetchAll(current, pageSize);
  }

  /**
   * 删除品牌信息
   *
   * @param {number} id 品牌id
   */
  deleteBrand = async (id, name) => {
    const { deleteBrand } = this.props;
    await deleteBrand(id);
    message.success(`品牌 [${name}] 删除成功`);
    this.reSearch();
  }

  /**
  * 批量更新厂家制造商状态
  *
  * @param {*} ids id数组
  * @param {*} factoryStatus 厂家制造商状态
   */
  updateFactoryStatus = (ids, factoryStatus) => {
    const { updateFactoryStatus } = this.props;
    if (!ids || ids.length === 0) {
      message.error('请先选择厂家');
    }
    updateFactoryStatus(ids, factoryStatus);
  }

  /**
  * 批量更新显示状态
  *
  * @param {*} ids id数组
  * @param {*} showStatus 显示状态
   */
  updateShowStatus = (ids, showStatus) => {
    const { updateShowStatus } = this.props;
    if (!ids || ids.length === 0) {
      message.error('请先选择厂家');
    }
    updateShowStatus(ids, showStatus);
  }

}

const store = (state) => {
  const { pms = {} } = state;
  const { brandList = {}, loading } = pms;
  const retVal = { ...brandList };
  if (brandList.list) {
    retVal.list = brandList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { _result: retVal, loading };
}

export default connect(store, actions)(Brand);
