import React, { useState, useEffect } from 'react';
import SkuModel from '@/models/SkuModel';
import ProductAttributeModel from '@/models/ProductAttributeModel';
import LabelMoney from '@/components/label-money';
import { Table, Statistic } from 'antd';

function createColumns(attrs = []) {

  let columns = [
    {
      title: 'SKU编号',
      dataIndex: 'skuCode',
      key: 'skuCode',
      width: 80
    },
  ].concat(attrs.map((attr, index) => ({
    title: attr.name,
    dataIndex: `sp${index + 1}`,
    key: `sp${index + 1}`,
    width: 80
  }))).concat([
    {
      title: '销售价格',
      dataIndex: 'price',
      key: 'price',
      width: 80,
      render: text => <LabelMoney value={text} precision={2}/>
    },
    {
      title: '商品库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 80
    },
    {
      title: '库存预警值',
      dataIndex: 'lowStock',
      key: 'lowStock',
      width: 80
    },
  ])
  return columns;
}

function ExpandedRow({ pid, productAttributeCategoryId }) {
  const [result, setResult] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    Promise.all([
      new SkuModel().fetchSkusByProductId(pid),
      new ProductAttributeModel().fetchAttributeById(productAttributeCategoryId),
    ]).then(([skuList, attrs]) => {
      setColumns(createColumns(attrs));
      setResult(skuList);
    })
  }, [pid, productAttributeCategoryId]);


  return (
    <div>
      <Table dataSource={result} pagination={false} columns={columns} size="small"/>
    </div>
  );
}

export default ExpandedRow;
