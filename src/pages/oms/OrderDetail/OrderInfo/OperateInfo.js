import React, { Component } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import CommonConsts from '../../../../consts/CommonConsts';

export default class OperateInfo extends Component {
  columns = [
    {
      title: '操作者',
      dataIndex: 'operateMan',
      align: 'center'
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
      render: text => moment(text).format('YYYY-MM-DD HH:mm')
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      align: 'center',
      render: text => CommonConsts.orderStatus[text]
    },
    {
      title: '备注',
      dataIndex: 'note',
      align: 'center'
    },
  ];

  render() {
    const { info = {} } = this.props;
    const { historyList = [] } = info;
    return (
      <div className="od-goods">
        <div className="od-block-title">操作信息</div>
        <div className="od-block-info">
          <Table
            className="od-goods-table"
            columns={this.columns}
            dataSource={historyList}
            rowKey={record => record.id}
            pagination={false}
          />
        </div>
      </div>
    );
  }
}
