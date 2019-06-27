import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import QueryString from 'query-string';
import { SearchLayout } from '@/components/layout';
import { connect } from 'react-redux';
import { actions } from './action';
import EditButton from './EditButton';
import AddButton from './AddButton';

const fields = [
  // {
  //   name: 'productAttrName',
  //   label: '类型名称',
  //   required: true,
  //   placeholder: '',
  //   span: 8
  // }
]

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 80
  },
  {
    title: '类型',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '属性数量',
    dataIndex: 'attributeCount',
    key: 'attributeCount',
    width: 100
  },
  {
    title: '参数数量',
    dataIndex: 'paramCount',
    key: 'paramCount',
    width: 100
  },
  {
    title: '设置',
    dataIndex: 'id',
    key: 'setting',
    width: 250,
    render(text, record) {
      return (
        <div>
          <Link to={{
            pathname: '/pms/productAttrList',
            search: `?cid=${text}&cname=${encodeURIComponent(record.name)}&type=0`
          }}>
            <Button type="primary" ghost size="small" onClick={() => { }}>属性列表</Button>
          </Link>
          &nbsp;
          <Link to={{
            pathname: '/pms/productAttrList',
            search: `?cid=${text}&cname=${encodeURIComponent(record.name)}&type=1`
          }}>
            <Button type="primary" ghost size="small">参数列表</Button>
          </Link>
        </div >
      )
    }
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'actions',
    width: 150,
    render(text, record) {
      return (
        <div>
          <EditButton record={record} />
          &nbsp;
          <Button type="primary" ghost size="small" onClick={() => { }}>删除</Button>
        </div>
      );
    }
  },
]

class ProductAttr extends SearchLayout {
  extActions = [
    <AddButton onCreate={this.reSearch}/>
  ];

  componentDidMount() {
    this.setState({
      conditionFields: fields,
      columns: columns,
      extActions: this.extActions
    });
    this.init();
  }

  async init() {
    const { fetchAll, location } = this.props;
    console.log('props', this.props)
    const { search } = location;
    const params = QueryString.parse(search);
    const { current, pageSize, productAttrName } = params;
    fetchAll(current, pageSize, productAttrName);
    // const { payload } = await fetchProductAttributeCategory(current, pageSize);
    // dispatch({
    //   type: ACTION_TYPES.FETCH_PRODUCT_ATTRIBUTE_CATEGORY,
    //   payload
    // });
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
export default connect(store, actions)(ProductAttr);
