import React from 'react';
import { Button, Popconfirm, Switch } from 'antd';
import { Link } from 'react-router-dom';
import QueryString from 'query-string';
import { SearchLayout } from '@/components/layout';
import { connect } from 'react-redux';
import { actions } from './action';

const fields = [
  // {
  //   name: 'productAttrName',
  //   label: '类型名称',
  //   required: true,
  //   placeholder: '',
  //   span: 8
  // }
]

class ProductCate extends SearchLayout {
  extActions = [
    (
      <Link to="/pms/addProductCate" key="btnAdd">
        <Button type="primary" ghost>添加</Button>
      </Link>
    )
  ];

  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (text, record) => {
        const level = parseInt(text, 10) + 1;
        return (
          <div>{`${level} 级`}</div>
        )
      }
    },
    {
      title: '商品数量',
      dataIndex: 'productCount',
      key: 'productCount',
      width: 100
    },
    {
      title: '数量单位',
      dataIndex: 'productUnit',
      key: 'productUnit',
      width: 100
    },
    {
      title: '导航栏',
      dataIndex: 'navStatus',
      key: 'navStatus',
      width: 100,
      render: (text, record) => {
        return (
          <Switch defaultChecked={!!text} onChange={
            (checked) => {
              const { updateProductCategoryPart } = this.props;
              const navStatus = checked ? 1 : 0;
              updateProductCategoryPart({ id: record.id, navStatus })
            }
          } />
        )
      }
    },
    {
      title: '是否显示',
      dataIndex: 'showStatus',
      key: 'showStatus',
      width: 100,
      render: (text, record) => {
        return (
          <Switch defaultChecked={!!text} onChange={
            (checked) => {
              const { updateProductCategoryPart } = this.props;
              const showStatus = checked ? 1 : 0;
              updateProductCategoryPart({ id: record.id, showStatus })
            }
          } />
        )
      }
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 100
    },
    {
      title: '设置',
      dataIndex: 'id',
      key: 'setting',
      width: 250,
      render: (text, record) => {
        const { match } = this.props;
        return (
          <div>
            <Link to={{
              pathname: match.path,
              search: `?parentId=${text}`
            }}>
              <Button type="primary" ghost size="small" onClick={() => { }}>查看下级</Button>
            </Link>
            &nbsp;
            <Link to={{
              pathname: '/pms/productAttrList',
              search: `?cid=${text}&cname=${encodeURIComponent(record.name)}&type=1`
            }}>
              <Button type="primary" ghost size="small">转移商品</Button>
            </Link>
          </div >
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'actions',
      width: 250,
      render: (text, record) => {
        return (
          <div>
            <Link to={`/pms/updateProductCate/${text}`}>
              <Button type="primary" ghost size="small" onClick={() => { }}>编辑</Button>
            </Link>
            &nbsp;
            <Popconfirm
              title={`确认要删除商品类型[${record.name}]吗?`}
              onConfirm={() => {
                const { deleteAttributeCategory } = this.props;
                deleteAttributeCategory(text);
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
    },
  ]

  componentDidMount() {
    this.setState({
      conditionFields: fields,
      columns: this.columns,
      extActions: this.extActions
    });
    this.init();
  }

  async init() {
    const { fetchAll, location } = this.props;
    console.log('ProductCate props', this.props)
    const { search } = location;
    const params = QueryString.parse(search);
    const { current, pageSize, parentId } = params;
    fetchAll(parentId, current, pageSize);
  }
}
const store = (state) => {
  const { pms = {} } = state;
  const { productCateList = {}, loading } = pms;
  const retVal = { ...productCateList };
  if (productCateList.list) {
    retVal.list = productCateList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { _result: retVal, loading };
}
export default connect(store, actions)(ProductCate);
