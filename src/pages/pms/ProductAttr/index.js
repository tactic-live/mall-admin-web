import React from 'react';
import QueryString from 'query-string';
import ConditionForm from '@/components/search-condition';
import { SearchLayout } from '@/components/layout';
import { PagableTable } from '@/components/search-result';

import ProductAttributeModel from '@/models/ProductAttributeModel';

const fields = [
  {
    name: 'productAttrName',
    label: '类型名称',
    required: true,
    placeholder: ''
  }
]

// class ProductAttr extends React.Component {

//   state = {
//     curCond: null,
//     curPageCond: null,
//     defaultValues: {},
//     result: [],

//   componentWillMount() {
//     const { location } = this.props;
//     const defaultValues = QueryString.parse(location.search);
//     const { current, pageSize, ...rest } = defaultValues;
//     this.setState({
//       curPageCond: rest,
//       curCond: { current, pageSize }
//     });
//   }

//   componentDidMount() {
//     new ProductAttributeModel().fetchAttributeCategory().then((result) => {
//       this.setState({
//         result
//       });
//     })
//   }

//   /**
//    * 翻页
//    */
//   onChangePage = (pageCond) => {
//     const { curCond } = this.state;
//     this.setState({
//       curPageCond: pageCond
//     })
//     this.onSearch({
//       ...curCond,
//       ...pageCond
//     });
//   }
//   render() {
//     const { defaultValues, columns, result } = this.state;
//     console.log('result', result)
//     return (
//       <div className="productAttr">
//         <ConditionForm className="productAttrConditionForm" fields={fields}
//           defaultValues={defaultValues}
//         />
//         <PagableTable
//           // scroll={{ y: 640 }}
//           className="productAttrSearchResult"
//           data={result}
//           columns={columns}
//           // pagination={pagination}
//           onChangePage={this.onChangePage}
//         />
//       </div>
//     );
//   }
// }
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
    dataIndex: 'setting',
    key: 'setting',
    width: 150
  },
  {
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
    width: 150
  },
]

class ProductAttr extends SearchLayout {
  componentDidMount() {
    this.setState({
      conditionFields: fields,
      columns: columns
    });
    this.init();
  }

  async init() {
    const result = await new ProductAttributeModel().fetchAttributeCategory()
    result.list = result.list.map(item => {
      item.key = item.id
      return item;
    });
    this.setState({
      result
    });
  }
}

export default ProductAttr;
