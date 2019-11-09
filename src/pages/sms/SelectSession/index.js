import React from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { Table, Button, Tag } from 'antd';
import { actions } from './action';
import './index.less';

class SelectSession extends React.Component {

  columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 80
  }, {
    title: '秒杀时间段名称',
    dataIndex: 'name',
    key: 'name',
    width: 100
  }, {
    title: '每日开始时间',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 100
  }, {
    title: '每日结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
    width: 100,
  }, {
    title: '商品数量',
    dataIndex: 'productCount',
    key: 'productCount',
    width: 100,
  }, {
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
    width: 80,
    render: (text, record) => {
      return (
        <div className="hot-recommend-action-btn">
          <Button type="primary" ghost size="small" onClick={() => this.gotoGoodList(record)} >商品列表</Button>
        </div>
      );
    }
  }];

  componentDidMount() {
    this.init();
  }


  gotoGoodList(record) {
    console.log('record', record);
    const { location, history } = this.props;
    const { search } = location;
    const params = QueryString.parse(search);
    const { flashPromotionId } = params;
    history.push(`/sms/flashProductRelation?flashPromotionId=${flashPromotionId}&flashPromotionSessionId=${record.id}`);
  }

  async init() {
    const { location, fetchFlashSessionList } = this.props;
    const { search } = location;
    const params = QueryString.parse(search);
    const { flashPromotionId } = params;
    fetchFlashSessionList({
      flashPromotionId
    });
  }

  render() {
    const { loading, flashGoodTimeList } = this.props;
    return (
      <Table
        columns={this.columns}
        dataSource={flashGoodTimeList}
        pagination={false}
        loading={loading} />
    )
  }
}



const store = (state) => {
  const { sms = {} } = state;
  let { flashGoodTimeList = [], loading } = sms;
  if (flashGoodTimeList) {
    flashGoodTimeList = flashGoodTimeList.map(item => {
      item.key = item.id;
      return item;
    });
  }
  console.log('storeflashGoodTimeList', flashGoodTimeList, loading)
  return { flashGoodTimeList, loading };
}

export default connect(store, actions)(SelectSession);
