import React, { useState, useEffect } from 'react';
import QueryString from 'query-string';
import ConditionForm from '@/components/search-condition';
import { PagableTable } from '@/components/search-result';
import { Button } from 'antd';

import GoodsModel from '@/models/GoodsModel';

import './index.less';

const fields = [
  {
    name: 'goodsName',
    label: '商品名称',
    required: true,
    placeholder: ''
  },
  {
    name: 'productSn',
    label: '商品货号'
  },
  {
    name: 'productCategoryName',
    label: '商品分类'
  },
  {
    name: 'brandName',
    label: '商品品牌'
  },
  {
    name: 'publishStatus',
    label: '上架状态',
    type: 'select',
    options: [
      { label: '上架', value: '1' },
      { label: '下架', value: '0' }
    ]
  },
  {
    name: 'verifyStatus',
    label: '审核状态',
    type: 'select',
    options: [
      { label: '审核通过', value: '1' },
      { label: '未审核', value: '0' }
    ]
  },
];

const columns = [
  {
    title: '编号',
    dataIndex: 'productSn',
    key: 'productSn',
    width: 80
  },
  {
    title: '商品图片',
    dataIndex: 'pic',
    key: 'pic',
    render: text => <img src={text} alt="" width="50px" />,
    width: 100
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '价格/货号',
    dataIndex: 'price',
    key: 'price',
    width: 100
  },
  {
    title: '标签',
    dataIndex: 'tag',
    key: 'tag',
    render: text => (
      <div>
        上架：

        新品：

        推荐：

      </div>
    ),
    width: 80
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    render: text => <a href="javascript:;">{text}</a>,
    width: 80
  },
  {
    title: 'SKU库存',
    dataIndex: 'stock',
    key: 'stock',
    render: text => <a href="javascript:;">{text}</a>,
    width: 100
  },
  {
    title: '销量',
    dataIndex: 'sale',
    key: 'sale',
    width: 80
  },
  {
    title: '审核状态',
    dataIndex: 'verifyStatus',
    key: 'verifyStatus',
    render: text => (text === 0 ? '未审核' : '已审核'),
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
    render: text => (
      <div>
        <Button type="primary" size="small" ghost>编辑</Button>

        <Button type="danger" size="small" ghost>删除</Button>
      </div>
    ),
    width: 80
  }
]

function Goods({ location, history, match }) {
  const defaultValues = QueryString.parse(location.search);
  const { current, pageSize, ...rest } = defaultValues;
  const [curCond, setCurCond] = useState({ current, pageSize });
  const [curPageCond, setCurPageCond] = useState(rest);

  // 搜索
  const onSearch = (searchCond) => {
    const condition = {
      ...curPageCond,
      ...searchCond
    };
    setCurCond(searchCond);
    history.push({
      path: match.path,
      search: `?${QueryString.stringify(condition)}`
    });
  }
  // 换页
  const onChangePage = (pageCond) => {
    setCurPageCond(pageCond)
    onSearch({
      ...curCond,
      ...pageCond
    });
  }

  const [result, setResult] = useState(null);

  useEffect(() => {
    const { current, goodsName, ...rest } = defaultValues;
    new GoodsModel().fetchGoodsByCondition({
      pageNum: current, pageSize: 5,
      keyword: goodsName,
      ...rest
    })
      .then(result => {
        if (result) {
          result.list = result.list.map(data => ({ key: data.id, ...data }))
          setResult(result);
        }
      });
  }, []);
  const pagination = {
    ...defaultValues
  }
  if (defaultValues.pageNum !== null && defaultValues.pageNum !== undefined) {
    pagination.current = defaultValues.pageNum;
  }
  return (
    <div className="product">
      <ConditionForm
        className="productConditionForm"
        onSearch={onSearch} fields={fields} defaultValues={defaultValues} />
      <PagableTable
        className="productSearchResult"
        data={result} columns={columns} pagination={pagination} onChangePage={onChangePage} />
    </div>
  );
}

export default Goods;
