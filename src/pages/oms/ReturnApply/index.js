import React from 'react';
import QueryString from 'query-string';
import { Button, message } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { actions } from './action';
import './index.less';
import { SearchLayout } from '@/components/layout';


const formatStatus = (status) => {
  switch (status) {
    case 0:
      return '待处理';
    case 1:
      return '退货中';
    case 2:
      return '已完成';
    case 3:
      return '已拒绝';
    default:
      return '暂无'
  }
}

const defaultStatusOptions = [
  {
    label: '待处理',
    value: 0
  },
  {
    label: '退货中',
    value: 1
  },
  {
    label: '已完成',
    value: 2
  },
  {
    label: '已拒绝',
    value: 3
  }
];

const fields = [
  {
    name: 'id',
    label: '服务单号:',
  },
  {
    name: 'status',
    label: '处理状态:',
    type: 'select',
    options: defaultStatusOptions
  },
  {
    name: 'createTime',
    label: '申请时间：',
    type: 'date-picker'
  },
  {
    name: 'handleMan',
    label: '操作人员:',
  },
  {
    name: 'handleTime',
    label: '处理时间:',
    type: 'date-picker'
  }
];



class ReturnApply extends SearchLayout {

  /**
   * 取消发货操作
   */
  cancelDelivery = () => {
    this.setState({
      deliveryDatas: {
        id: null,
        visible: false
      }
    });
  }

  columns = [
    {
      title: '服务单号',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '申请时间',
      dataIndex: 'createTime ',
      key: 'time',
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
      key: 'memberUsername',
      width: 100
    },
    {
      title: '退款金额',
      dataIndex: 'productRealPrice',
      key: 'productRealPrice',
      render: text => (
        <div>
          {
            `￥${text}`
          }
        </div>
      ),
      width: 100
    },
    {
      title: '申请状态',
      dataIndex: 'status',
      key: 'status',
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
      title: '处理时间',
      dataIndex: 'handleTime',
      key: 'handleTime',
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
      title: '操作',
      dataIndex: 'status',
      key: 'actions',
      render: (text, record) => (
        <div className='returnApplyListBtn'>
          {
            <Button type="primary" size="small" ghost onClick={() => { this.goToDetail(record) }}>查看详情</Button>
          }
        </div>
      ),
      width: 80
    }
  ]


  goToDetail = (source) => {
    console.log('goToDetail', source)
    const { history } = this.props;
    // history.push({
    //   path: 'oms/returnApplyDetail',
    //   id: source.id
    // })
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
    const { location, fetchReturnApplyList } = this.props;
    console.log('this.props', this.props)
    const defaultValues = QueryString.parse(location.search);
    const { current, pageSize, ...rest } = defaultValues;
    fetchReturnApplyList({
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
  const { returnApplyList, loading } = state.oms;
  console.log('returnApplyList', returnApplyList);
  if (returnApplyList.list) {
    returnApplyList.list = returnApplyList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { _result: returnApplyList, loading };
}

export default connect(store, actions)(ReturnApply);
