import React from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { Table } from 'antd';
import { actions } from './action';
import './index.less';

class ReturnApplyDetail extends React.PureComponent {
  constructor() {
    super();
    this.columns = [
      {
        title: '商品图片',
        dataIndex: 'id',
        key: 'id',
        width: 80
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: 200
      },
      {
        title: '价格/货号',
        dataIndex: 'sort',
        key: 'sort',
        width: 100
      },
      {
        title: '属性',
        dataIndex: 'status',
        key: 'status',
        width: 100
      },
      {
        title: '数量',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 200
      },
      {
        title: '小计',
        dataIndex: 'id',
        key: 'actions',
        width: 250
      }
    ]
  }



  fetchReturnApplyDetail() {
    const { fetchReturnApplyDetailById, location } = this.props;
    const { search } = location;
    const params = QueryString.parse(search);
    const { id } = params;
    fetchReturnApplyDetailById(id);
  }

  componentDidMount() {
    this.fetchReturnApplyDetail();
  }

  render() {
    const { returnApplyDetail } = this.props;
    return (
      <div className="return-detail-wrap">
        <div className="return-goods-wrap">
          退货商品
          <Table />
        </div>
        <div className="server-order-wrap">服务单信息</div>
      </div>
    )
  }
}

const store = (state) => {
  const { oms = {} } = state;
  const { returnApplyDetail = {}, loading } = oms;
  return { returnApplyDetail: returnApplyDetail, loading };
}

export default connect(store, actions)(ReturnApplyDetail);
