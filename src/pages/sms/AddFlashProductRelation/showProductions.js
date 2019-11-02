import React from 'react';
import { connect } from 'react-redux';
import { Table, Pagination } from 'antd';
import { actions } from './action';
import ConditionForm from '@/components/search-condition';

import './index.less';
const columns = [
  {
    title: '商品图片',
    dataIndex: 'pic',
    render: text => (
      <img className="pic" src={text} alt='商品图片' />
    )
  },
  {
    title: '商品名称',
    dataIndex: 'name',
  },
  {
    title: '商品名称',
    dataIndex: 'brandName',
  },
  {
    title: '货号',
    dataIndex: 'productSn',
    render: text => (
      <div>
        NO.{text}
      </div>
    )
  },
  {
    title: '价格',
    dataIndex: 'price',
    render: text => (
      <div>
        ￥{text}
      </div>
    )
  },
];



const fields = [{
  name: 'keyword',
  label: '活动名称：',
}];

const extActions = [];

class ShowProductions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      conditionFields: fields,
      extActions,
      curCond: '',
      selectedRowKeys: [],
      pageNum: 1
    }
  }
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const { getSelectData } = this.props;
      console.log('selectedRowKeysselectedRowKeys', selectedRowKeys, selectedRows)
      this.setState({
        selectedRowKeys: selectedRowKeys
      })
      getSelectData({
        pageNum: this.state.pageNum,
        selectedRows
      });
    },

  };


  async componentDidMount() {
    const { fetchProductList } = this.props;
    await fetchProductList({
      keyword: ''
    });
  }

  onChangePage = async (page) => {
    const { fetchProductList } = this.props;
    const { curCond } = this.state;
    await fetchProductList({
      keyword: curCond ? curCond : '',
      pageNum: page
    });
    this.setState({
      pageNum: page
    })
  }

  onSearch = async (data) => {
    const { fetchProductList } = this.props;
    await fetchProductList({
      keyword: data.keyword,
    });
    this.setState({
      curCond: data.keyword,
      pageNum: 1
    });
  }

  render() {
    const { flashProductionList } = this.props;
    const { conditionFields, extActions, curCond } = this.state;
    return (
      <div className='showProduction'>
        <ConditionForm
          fields={conditionFields}
          onSearch={(data) => this.onSearch(data)}
          extActions={extActions}
          defaultValues={curCond}
        />
        <div className="showTable">
          <Table rowSelection={this.rowSelection}
            columns={columns}
            dataSource={flashProductionList.list}
            pagination={false}
          />
        </div>


        <div className="productionpag">
          <Pagination {...flashProductionList} onChange={(page) => this.onChangePage(page)} />
        </div>
      </div>
    );
  }
}

const store = (state) => {
  const { loading, flashProductionList = {} } = state.sms;
  const retVal = { ...flashProductionList };
  if (flashProductionList.list) {
    retVal.list = flashProductionList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { loading, flashProductionList: retVal };
}

export default connect(store, actions)(ShowProductions);
