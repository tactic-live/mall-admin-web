import React from 'react';
import { SearchLayout } from '@/components/layout';
import { Popconfirm, Button } from 'antd';
import QueryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from './action';

class ProductAttrList extends SearchLayout {

  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '属性名称',
      dataIndex: 'name',
      key: 'name',
      width: 100
    },
    {
      title: '商品类型',
      dataIndex: 'cname',
      key: 'cname',
      width: 100
    },
    {
      title: '属性是否可选',
      dataIndex: 'selectType',
      key: 'selectType',
      width: 200
    },
    {
      title: '值录入方式',
      dataIndex: 'inputType',
      key: 'inputType',
      width: 200
    },
    {
      title: '可选值列表',
      dataIndex: 'paramCount',
      key: 'paramCount',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 100
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'actions',
      width: 150,
      render: (text, record) => {
        return (
          <div>
            <Link to={`/pms/updateProductAttr/${text}`}>
              <Button type="primary" ghost size="small" onClick={() => { }}>编辑</Button>
            </Link>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => {
                const { deleteProductAttribute } = this.props;
                deleteProductAttribute(text);
                this.reSearch();
              }}
              okText="删除"
              cancelText="取消"
            >
              <Button type="primary" ghost size="small" onClick={() => { }}>删除</Button>
            </Popconfirm>
          </div >
        );
      }
    },
  ]


  componentDidMount() {
    const { location } = this.props;
    const params = QueryString.parse(location.search);
    const extActions = [
      <Link to={`/pms/addProductAttr/${params.cid}/${params.type}`} key="btnAdd">
        <Button type="primary" ghost size="small" key="btnAdd">增加</Button>
      </Link>
    ];
    console.log('match', location.search)
    this.setState({
      conditionFields: [],
      columns: this.columns,
      extActions: extActions
    });
    this.init();
  }

  init = () => {
    const { fetchAll, location } = this.props;
    console.log('props', this.props)
    const { search } = location;
    const params = QueryString.parse(search);
    const { cid, current, pageSize } = params;
    fetchAll(cid, 0, current, pageSize);
  }
}

const store = (state) => {
  const { pms = {} } = state;
  const { productAttrList = {}, loading } = pms;
  const retVal = { ...productAttrList };
  if (productAttrList.list) {
    retVal.list = productAttrList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { _result: retVal, loading };
}
export default connect(store, actions)(ProductAttrList);
