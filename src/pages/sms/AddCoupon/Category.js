import React from 'react';
import { connect } from 'react-redux';
import { actions } from './action';
import { Cascader, Button, Table } from 'antd';

class Category extends React.PureComponent {
  constructor(props) {
    super(props);
    const { initVal = [] } = props;
    this.state = {
      tableData: initVal || []
    };
    this.selectedIds = initVal.map(({id}) => id) || [];
  }

  selectedRecord = {};
  columns = [{
    title: '分类名称',
    dataIndex: 'productCategoryName',
    align: 'center',
    render: (text, record) => {
      const { productCategoryName, parentCategoryName } = record;
      let result = productCategoryName;
      if (parentCategoryName) {
        result = `${parentCategoryName} > ${productCategoryName}`;
      }
      return result;
    }
  }, {
    title: '操作',
    dataIndex: 'id',
    align: 'center',
    render: (text) => <Button type="danger" onClick={() => this.onDelete(text)}>删除</Button>
  }];

  componentDidUpdate(prevProps) {
    if (prevProps.initVal.length !== this.props.initVal.length) {
      this.selectedIds = this.props.initVal.map(({id}) => id) || [];
      this.setState({
        tableData: this.props.initVal || []
      });
    }
  }

  // 单条数据添加到表格
  onAdd = () => {
    if (this.selectedRecord && this.selectedRecord.id && this.selectedIds.indexOf(this.selectedRecord.id) === -1) {
      const { tableData } = this.state;
      const result = [].concat(tableData).concat([this.selectedRecord]);
      this.selectedIds.push(this.selectedRecord.id);
      this.setState({
        tableData: result
      });
      this.props.relateCategory(result);
    }
  }

  // 删除
  onDelete = (id) => {
    const { tableData } = this.state;
    const newData = [];
    tableData.forEach((item) => {
      if (Number(id) !== Number(item.id)) {
        newData.push(item);
      }
    });
    this.selectedIds.splice(this.selectedIds.indexOf(id), 1);
    this.setState({ tableData: newData });
    this.props.relateCategory(newData);
  }

  // 联动
  onChange = (val, selectedOptions) => {
    const last = selectedOptions[selectedOptions.length - 1];
    if (last) {
      this.selectedRecord = last;
    } else {
      this.selectedRecord = null;
    }
  }

  render() {
    const { tableData = [] }= this.state;
    const { list } = this.props;
    
    return (
      <div className="coupon-categories">
        <Cascader
          placeholder="请选择类目"
          options={list}
          onChange={this.onChange}
          fieldNames={{label: 'productCategoryName', value: 'id', children: 'children'}}
          showSearch
        />
        <Button onClick={this.onAdd} >添加</Button>
        <Table
          columns={this.columns}
          dataSource={tableData}
          pagination={false}
          rowKey={record => record.id}
        />
      </div>
    );
  }
}
const store = (state) => {
  const { couponCategoryList , loading } = state.sms;
  const list = couponCategoryList.map(({id, name, parentId, children}) => {
    const childList = children && children.length ? children.map((item) => {
      const child = {
        id: item.id,
        productCategoryName: item.name,
        parentCategoryName: name,
        parentId: id
      };
      return child;
    }) : null;
    const tempObj = {
      id,
      productCategoryName: name,
      children: childList,
      parentId: 0
    }
    return tempObj;
  });
  return { list , loading };
}

export default connect(store, actions)(Category);
