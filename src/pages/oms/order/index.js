import React from 'react';
import QueryString from 'query-string';
import { Button } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { actions } from './action';
import './index.less';
import { SearchLayout } from '@/components/layout';
import LogisiticsDialog from './logisticsDialog'
// 订单状态：
const orderTypeOptions = [
  {
    label: '正常订单',
    value: 0
  },
  {
    label: '秒杀订单',
    value: 1
  }
]
// 订单分类：
const statusOptions = [
  {
    label: '待付款',
    value: 0
  },
  {
    label: '待发货',
    value: 1
  },
  {
    label: '已发货',
    value: 2
  },
  {
    label: '已完成',
    value: 3
  },
  {
    label: '已关闭',
    value: 4
  }
]
// 订单来源：
const sourceTypeOptions = [
  {
    label: 'PC订单',
    value: 0
  },
  {
    label: 'APP订单',
    value: 1
  }
]

// 支付方式
const payWay = (text) => {
  switch (text) {
    case 1:
      return '支付宝'
    case 2:
      return '微信'
    default:
      return '未支付'
  }
}

// 订单状态
const formatStatus = (text) => {
  switch (text) {
    case 1:
      return '待发货'
    case 2:
      return '已发货'
    case 3:
      return '已完成'
    case 4:
      return '已关闭'
    case 5:
      return '无效订单'
    default:
      return '待付款'
  }
}

const fields = [
  {
    name: 'orderSn',
    label: '订单编号',
  },
  {
    name: 'receiverKeyword',
    label: '收货人',
    placeholder: "收货人姓名/手机号码"
  },
  {
    name: 'productCategoryName',
    label: '商品分类'
  },
  {
    name: 'brandName',
    label: '请选择时间',
    type: 'date'
  },
  {
    name: 'status',
    label: '订单状态：',
    type: 'select',
    options: statusOptions
  },
  {
    name: 'orderType',
    label: '订单分类',
    type: 'select',
    options: orderTypeOptions
  },
  {
    name: 'sourceType',
    label: '订单来源',
    type: 'select',
    options: sourceTypeOptions
  },
];



class Order extends SearchLayout {
  extActions = [
    // <AddButton onCreate={this.reSearch} key="btnAdd" />
  ];


  // 按钮展示
  showButton = (text, record) => {
    let button = '';
    switch (text) {
      case 0:
        button = (<Button type="primary" size="small" ghost>关闭订单</Button>)
        break;
      case 1:
        button = (<Button type="primary" size="small" ghost>订单发货</Button>)
        break;
      case 2:
      case 3:
        button = (
          <div>
            <LogisiticsDialog {...this.state.modalData} onCancel={this.onCancel} />
            <Button type="primary" onClick={() => { this.handleViewLogistics(record) }} size="small" ghost>订单跟踪</Button>
          </div>
        )

        break;
      case 4:
        button = (<Button type="danger" size="small" ghost>删除订单</Button>)
        break;
      default:
        break;
    }
    return button;
  }

  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'orderId',
      width: 80
    },
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      key: 'orderOrderSn',
      width: 100
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      key: 'orderCreateTime',
      render: text => (
        <div>
          {
            moment(text).format("YYYY-MM-DD")
          }
        </div>
      ),
      width: 100
    },
    {
      title: '用户账号',
      dataIndex: 'memberUsername',
      key: 'orderMemberUsername',
      width: 100
    },
    {
      title: '订单金额',
      dataIndex: 'totalAmount',
      key: 'orderTotalAmount',
      width: 100
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      key: 'orderPayType',
      render: text => (
        <div>
          {
            payWay(text)
          }
        </div>
      ),
      width: 100
    },
    {
      title: '订单来源',
      dataIndex: 'sourceType',
      key: 'orderSourceType',
      render: text => (
        <div>
          {
            sourceTypeOptions.filter(x => x.value === Number(text))[0].label
          }
        </div>
      ),
      width: 100
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'orderStatus',
      render: text => (
        <div>
          {
            formatStatus(text)
          }
        </div>
      ),
      width: 100
    },
    {
      title: '操作',
      dataIndex: 'status',
      key: 'actions',
      render: (text, record) => (
        <div className='orderListBtn'>
          {
            <Button type="primary" size="small" ghost onClick={() => { this.goToDetail(record) }}>查看详情</Button>
          }
          {
            this.showButton(text, record)
          }

        </div>
      ),
      width: 80
    }
  ]


  goToDetail = (source) => {
    console.log('goToDetail', source)
  }

  handleViewLogistics = (record) => {
    console.log('record', LogisiticsDialog)
    const { visible } = this.state;
    const data = [
      { name: '订单已提交，等待付款', time: '2017-04-01 12:00:00 ', status: 1 },
      { name: '订单付款成功', time: '2017-04-01 12:00:00 ', status: 1 },
      { name: '在北京市进行下级地点扫描，等待付款', time: '2017-04-01 12:00:00 ', status: 1 },
      { name: '在分拨中心广东深圳公司进行卸车扫描，等待付款', time: '2017-04-01 12:00:00 ', status: 1 },
      { name: '在广东深圳公司进行发出扫描', time: '2017-04-01 12:00:00 ', status: 1 },
      { name: '到达目的地网点广东深圳公司，快件将很快进行派送', time: '2017-04-01 12:00:00 ', status: 1 },
      { name: '订单已签收，期待再次为您服务', time: '2017-04-01 12:00:00 ', status: 0 }
    ]
    this.setState({
      modalData: {
        visible: !visible || false,
        data: data
      }
    })
  }

  onSearch(searchCond) {
    const { location } = this.props;
    const defaultValues = QueryString.parse(location.search);
    const { pageSize } = defaultValues;
    this.setState({
      curCond: {
        current: 1,
        pageSize
      },
    })
    const condition = {
      ...this.state.curCond,
      ...searchCond
    };

    super.onSearch(condition);
  }

  onCancel = () => {
    this.setState({
      modalData: {
        visible: false,
      }
    })
  }

  async init() {
    const { location, fetchOrderListCondition } = this.props;
    const defaultValues = QueryString.parse(location.search);
    const { current, pageSize, ...rest } = defaultValues;
    fetchOrderListCondition({
      pageNum: current || 1,
      pageSize: pageSize || 5,
      ...rest
    })
  }



  componentDidMount() {
    console.log('props', this.props);
    const { location } = this.props;
    const defaultValues = QueryString.parse(location.search);
    const { current, pageSize, ...rest } = defaultValues;
    this.setState({
      conditionFields: fields,
      columns: this.columns,
      extActions: this.extActions,
      curPageCond: rest,
      curCond: { current, pageSize }
    });
    this.init();
  }


}



const store = (state) => {
  const { orderList, loading } = state.oms;
  console.log('state', state.oms);
  if (orderList.list) {
    orderList.list = orderList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { _result: orderList, loading };
}

export default connect(store, actions)(Order);
