import React, { Component } from 'react';
import { Table } from 'antd';

// 商品信息
export default class GoodsInfo extends Component {
  columns = [
    {
      title: '商品图片',
      dataIndex: 'productPic',
      align: 'center',
      render: (text, record) => {
        return <img className="od-goods-img" src={text} alt="" />;
      }
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      align: 'center',
      render: (text, record) => {
        const { productBrand } = record;
        return <div><div>{text}</div><div>品牌：{productBrand}</div></div>;
      }
    },
    {
      title: '价格/货号',
      dataIndex: 'productPrice',
      align: 'center',
      render: (text, record) => {
        const { productSn } = record;
        return <div><div>价格：{text}</div><div>货号：{productSn}</div></div>;
      }
    },
    {
      title: '属性',
      dataIndex: 'productAttr',
      align: 'center',
      render: (text) => {
        const productAttr = eval(text);
        const attr = productAttr.map(({key, value}) => (<div>{key}{value}</div>));
        return attr;
      }
    },
    {
      title: '数量',
      dataIndex: 'productQuantity',
      align: 'center'
    },
    {
      title: '小计',
      dataIndex: 'realAmount',
      align: 'center',
      render: (text, record) => {
        const { productPrice, productQuantity } = record;
        const money = productPrice * productQuantity;
        return `￥${money}`;
      }
    },
  ];

  render() {
    const { info = {} } = this.props;
    const { orderItemList = [], totalAmount } = info;
    return (
      <div className="od-goods">
        <div className="od-block-title">商品信息</div>
        <div className="od-block-info">
          <Table
            className="od-goods-table"
            columns={this.columns}
            dataSource={orderItemList}
            rowKey={record => record.id}
            pagination={false}
          />
          <div className="total-amount-div">合计：<span className="total-amount">￥{totalAmount}</span></div>
        </div>
      </div>
    );
  }
}
