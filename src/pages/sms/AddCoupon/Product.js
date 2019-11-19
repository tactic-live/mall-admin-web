import React from 'react';
import { connect } from 'react-redux';
import { actions } from './action';
import { AutoComplete, Input, Button, Table } from 'antd';

class Product extends React.PureComponent {
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
    title: '商品名称',
    dataIndex: 'productName',
    align: 'center',
  }, {
    title: '货号',
    dataIndex: 'productSn',
    align: 'center',
    render: (text) => `NO.${text}`
  }, {
    title: '操作',
    dataIndex: 'id',
    align: 'center',
    render: (text) => <Button type="danger" onClick={() => this.onDelete(text)}>删除</Button>
  }];

  componentDidMount() {
    this.handleSearch();
  }

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
      this.props.relateProduct(result);
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
    this.props.relateProduct(newData);
  }

  // 选择
  onSelect = (value) => {
    const { list } = this.props;
    const temp = list.filter(item => item.id == value);
    this.selectedRecord = temp && temp[0] ? temp[0] : null;
  }

  handleSearch = async (value) => {
    const { getCouponProductList } = this.props;
    await getCouponProductList(value);
  }

  render() {
    const { tableData = [] }= this.state;
    const { list } = this.props;
    return (
      <div className="coupon-products">
        <AutoComplete
          dataSource={list}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
        >
          <Input
            placeholder="商品名称/商品货号"
          />
        </AutoComplete>
        <Button onClick={this.onAdd}>添加</Button>
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
  const { couponProductList , loading } = state.sms;
  const list = couponProductList.map(({id, name, productSn}) => ({value: id, text: name, productName: name, productSn, id}));
  return { list , loading };
}

export default connect(store, actions)(Product);
