import React from 'react';
import QueryString from 'query-string';
import ConditionForm from '@/components/search-condition';
import { PagableTable } from '@/components/search-result';
import { Button, Switch } from 'antd';
import { connect } from 'react-redux';

import './index.less';
import ExpandedRow from './ExpandedRow';


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

class Goods extends React.PureComponent {

  state = {
    curCond: null,
    curPageCond: null,
    showEditModal: false,
    result: null,
    editModalPid: ''
  }

  columns = [
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
      render: (text, record) => (
        <div>
          <div>
            上架：<Switch defaultChecked={!!record.publishStatus} />
          </div>
          <div>
            新品：<Switch defaultChecked={!!record.newStatus} />
          </div>
          <div>
            推荐：<Switch defaultChecked={!!record.recommandStatus} />
          </div>
        </div>
      ),
      width: 200
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      render: text => <a href="javascript:;">{text}</a>,
      width: 80
    },
    // {
    //   title: 'SKU库存',
    //   dataIndex: 'id',
    //   key: 'stock',
    //   render: text => (
    //     <Button type="primary" shape="circle" icon="edit" onClick={() => this.toggleEditModal(text)} />
    //   ),
    //   width: 100
    // },
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

  componentWillMount() {
    const { location } = this.props;
    const defaultValues = QueryString.parse(location.search);
    const { current, pageSize, ...rest } = defaultValues;
    this.setState({
      curPageCond: rest,
      curCond: { current, pageSize }
    });
  }

  toggleEditModal = (pid) => {
    this.setState({
      showEditModal: !this.state.showEditModal,
      editModalPid: pid
    })
  }
  /**
   * 搜索
   */
  onSearch = (searchCond) => {
    const { history, match } = this.props;
    const { curPageCond } = this.state;
    const condition = {
      ...curPageCond,
      ...searchCond
    };
    this.setState({
      curCond: searchCond
    });
    history.push({
      path: match.path,
      search: `?${QueryString.stringify(condition)}`
    });
  }

  /**
   * 翻页
   */
  onChangePage = (pageCond) => {
    const { curCond } = this.state;
    this.setState({
      curPageCond: pageCond
    })
    this.onSearch({
      ...curCond,
      ...pageCond
    });
  }

  async init() {
    const { location, fetchGoodsByCondition, dispatch } = this.props;
    const defaultValues = QueryString.parse(location.search);
    const { current, goodsName, ...rest } = defaultValues;
    const action = await fetchGoodsByCondition({
      pageNum: current,
      pageSize: 5,
      goodsName,
      ...rest
    });
    dispatch(action);
  }

  componentDidMount() {
    console.log('props', this.props);
    this.init();
    //   .then(result => {
    //     if (result) {
    //       result.list = result.list.map(data => ({ key: data.id, ...data }))
    //       this.setState({
    //         result
    //       });
    //     }
    //   });
  }

  render() {
    const { location, productListInfo } = this.props;
    const defaultValues = QueryString.parse(location.search);
    const { editModalPid, showEditModal } = this.state;
    // 搜索
    // const onSearch = (searchCond) => {
    //   const condition = {
    //     ...curPageCond,
    //     ...searchCond
    //   };
    //   setCurCond(searchCond);
    //   history.push({
    //     path: match.path,
    //     search: `?${QueryString.stringify(condition)}`
    //   });
    // }
    // 换页
    // const onChangePage = (pageCond) => {
    //   setCurPageCond(pageCond)
    //   onSearch({
    //     ...curCond,
    //     ...pageCond
    //   });
    // }

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
          onSearch={this.onSearch} fields={fields} defaultValues={defaultValues} />
        <PagableTable
          scroll={{ y: 440 }}
          className="productSearchResult"
          rowKey="id"
          data={productListInfo} columns={this.columns} pagination={pagination} onChangePage={this.onChangePage}
          expandedRowRender={record => <ExpandedRow pid={record.id} productAttributeCategoryId={record.productAttributeCategoryId} />}
        />
      </div>
    );
  }
}

const store = (state) => {
  const { productListInfo } = state.pms;
  // productListInfo.list && productListInfo.list.forEach((item) => {
  //   item.key = item.id;
  // })
  return {
    productListInfo
  };
}

export default connect(store)(Goods);
