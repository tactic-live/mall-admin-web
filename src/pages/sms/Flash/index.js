import React from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { Switch, Button, message } from 'antd';
import moment from 'moment';

import { SearchLayout } from '@/components/layout';
import EditModal from './editModal';
import { actions } from './action';
import './index.less';

const formatActiveStatus = (record) => {
  let nowTime = new Date().getTime();
  if (record) {
    if (nowTime >= record.startDate && nowTime <= record.endDate) {
      return '活动进行中';
    } else if (nowTime > record.endDate) {
      return '活动已结束';
    } else {
      return '活动未开始';
    }
  }
  return '---';

}
const formatDate = (time) => {
  if (time == null || time === '') {
    return 'N/A';
  }
  let date = moment(time).format('YYYY-MM-DD')
  return date
}


class Flash extends SearchLayout {
  fields = [{
    name: 'keyword',
    label: '活动名称：',
  }];

  extActions = [
    (
      <div key="flashAction">
        <Button type="primary" ghost key="timekey" onClick={() => this.handleShowSessionList()}>秒杀时间段列表</Button>
        <Button type="primary" className='activitykey' ghost key="activitykey" onClick={() => this.handleAdd()}>添加活动</Button>
      </div>
    )
  ];

  columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 80
  }, {
    title: '活动标题',
    dataIndex: 'title',
    key: 'title',
    width: 100
  }, {
    title: '活动状态',
    dataIndex: 'actions-status',
    key: 'actions-status',
    render: (text, record) => (
      <div>
        {
          formatActiveStatus(record)
        }
      </div>
    ),
    width: 100
  }, {
    title: '开始时间',
    dataIndex: 'startDate',
    key: 'startDate',
    render: (text) => (
      <div>
        {
          formatDate(text)
        }
      </div>
    ),
    width: 100
  }, {
    title: '上线/下线',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (text, record) => {
      // TODO: 是否推荐switch
      return (
        <div>
          <Switch defaultChecked={!!text}
            onChange={(e) => { this.checkUpOrDown(record, e) }}
          />
        </div>

      )
    }
  }, {
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
    render: (text, record, index) => {
      return (
        <div className='btnflex'>
          <Button type="primary" size="small" ghost onClick={() => this.addGood(record)} >设置商品</Button>
          <Button type="primary" size="small" ghost onClick={() => this.editActivity(record)}>编辑</Button>
          {/* <Button type="primary" size="small" ghost >删除</Button> */}
          {
            <EditModal
              {...this.state.modalData}
              editId={record.id}
              handleCancel={this.handleCancel}
              handleOk={this.handleOk}
              addIndex={index || 0}
            />
          }
        </div>
      )
    },
    width: 200
  }];

  constructor(props, context) {
    super(props, context);
    this.state.conditionFields = this.fields;
    this.state.extActions = this.extActions;
    this.state.columns = this.columns;

    // 排序modal数据
    this.state.modalData = {
      visible: false,
    }
  }

  componentDidMount() {
    this.init();
  }

  editActivity = (record) => {
    const { visible } = this.state;
    this.setState({
      modalData: {
        data: record,
        visible: !visible || false,
        isFrom: 'edit'
      }
    })
  }

  handleAdd = () => {
    const record = {
      id: null,
      title: null,
      startDate: null,
      endDate: null,
      status: 0
    };
    this.setState({
      modalData: {
        data: record,
        visible: true,
        isFrom: 'add'
      }
    })
  }

  handleCancel = () => {
    this.setState({
      modalData: {
        visible: false,
      }
    })
  }

  handleOk = async (data, isFrom) => {
    let res;
    if (isFrom === 'edit') {
      const { updateFlash } = this.props;
      res = await updateFlash({
        id: data.id,
        status: data
      });
    } else {
      const { createFlash } = this.props;
      res = await createFlash({
        status: data
      });
      console.log('res', this.props);
    }
    const { flashChangeResult } = this.props
    if (!flashChangeResult) {
      message.error('请求失败')
    } else {
      this.setState({
        modalData: {
          visible: false,
        }
      })
      this.init();
    }
  }

  // 添加秒杀时段
  handleShowSessionList = () => {

  }
  // 设置商品
  addGood = (source) => {

    const { history } = this.props;
    history.push(`/sms/selectSession?flashPromotionId=${source.id}`);
  }
  async init() {
    const { location, fetchFlashList } = this.props;
    const { search } = location;
    const params = QueryString.parse(search);
    const { current = 1, pageSize = 5, ...rest } = params;
    console.log('init', current, pageSize, rest);
    fetchFlashList({
      pageNum: current,
      pageSize: pageSize,
      ...rest
    });
  }

  checkUpOrDown = async (data) => {
    const { fetchFlashStatust } = this.props;
    console.log('checkUpOrDown', data)
    const source = await fetchFlashStatust({
      id: data.id,
      status: !data.status
    });
    const { flashChangeResult } = this.props
    if (!flashChangeResult) {
      message.error('请求失败')
    } else {
      this.init();
    }
    console.log('source', source)
  }

}



const store = (state) => {
  const { loading, flashList = {}, flashChangeResult } = state.sms;
  const retVal = { ...flashList };
  if (flashList.list) {
    retVal.list = flashList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { loading, _result: retVal, flashChangeResult };
}

export default connect(store, actions)(Flash);
