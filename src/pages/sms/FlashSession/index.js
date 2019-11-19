import React from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { Switch, Button, Popconfirm, Table, message } from 'antd';
import { SearchLayout } from '@/components/layout';
import { actions } from './action';
import ConditionForm from '@/components/search-condition';
import './index.less';
import moment from 'moment';
import EditModal from './editModal'
import { formatDate } from './date'
const fields = [];

class FlashSession extends React.Component {

  extActions = [
    (
      <Button type="primary" className='activitykey' ghost key="addbtn" onClick={() => this.handleAdd()}>添加活动</Button>
    )
  ];

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
    render: (record) => (
      <div>
        {this.formateDate(record)}
      </div>
    ),
    width: 100
  }, {
    title: '每日结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
    render: (record) => (
      <div>
        {this.formateDate(record)}
      </div>
    ),
    width: 100
  }, {
    title: '启用',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (text, record) => {
      return (
        <Switch checked={!!record.status} onChange={(checked) => {
          // const status = checked ? 1 : 0;
          // updateHotRecommendStatus({ ids: [record.id], recommendStatus: status })
        }
        } />
      );
    }
  }, {
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
    width: 80,
    render: (text, record, index) => {
      return (
        <div>
          <Button type="primary" ghost size="small" onClick={() => this.updateDate(record)}>编辑</Button>
          <Button type="primary" ghost size="small" >删除</Button>
          <EditModal
            {...this.state.modalData}
            editId={record.id}
            handleCancel={this.handleCancel}
            handleOk={this.handleOk}
            addIndex={index || 0}
          />
        </div>
      );
    }
  }];

  constructor(props, context) {
    super(props, context);
    this.state = {
      extActions: this.extActions,
      columns: this.columns,
      fields: this.fields,
      modalData: {
        visible: false,
        data: []
      }
    }
  }

  componentDidMount() {
    this.init();
  }

  handleCancel = () => {
    this.setState({
      modalData: {
        visible: false,
      }
    })
    console.log('cancle', this.state)
  }

  handleOk = async (data, isFrom) => {
    if (isFrom === 'add') {
      const { createFlashSession } = this.props;
      await createFlashSession(data);
      const { flasesessionChangeRes } = this.props;
      if (flasesessionChangeRes) {
        this.setState({
          modalData: {
            visible: false,
          }
        });
        message.info('添加成功');
        this.init();
      } else {
        message.info('添加失败');
      }
    } else {
      const { updateFlashSession } = this.props;
      await updateFlashSession(data);
      const { flasesessionChangeRes } = this.props;
      if (flasesessionChangeRes) {
        this.setState({
          modalData: {
            visible: false,
          }
        });
        message.info('修改成功');
        this.init();
      } else {
        message.info('修改失败');
      }
    }
  }
  async init() {
    const { fetchFlashSession } = this.props;
    await fetchFlashSession();
  }


  formateDate = (time) => {
    if (time == null || time === '') {
      return 'N/A';
    }
    let date = new Date(time);
    return formatDate(date, 'hh:mm')
  }


  handleAdd() {
    this.setState({
      modalData: {
        visible: true,
        isFrom: 'add',
        data: {
          name: null,
          startTime: null,
          endTime: null,
          status: 0
        }
      }
    })
  }

  updateDate = (data) => {
    this.setState({
      modalData: {
        visible: true,
        isFrom: 'edit',
        data
      }
    })
  }

  render() {
    const { columns, extActions, fields } = this.state;
    const { flashSessionList, loading } = this.props;
    console.log('flashSessionList---', flashSessionList)
    return (
      <div>
        <ConditionForm className="search-layout-condition-form" fields={fields}
          extActions={extActions}
        />
        {
          flashSessionList.list ? <Table columns={columns}
            className="search-layout-search-result"
            dataSource={flashSessionList.list}
            pagination={false}
            loading={loading} /> : null
        }

      </div>
    )
  }

}

const store = (state) => {
  const { sms = {} } = state;
  const { flashSessionList = {}, loading } = sms;
  console.log('flashSessionList', flashSessionList)
  if (flashSessionList.list && flashSessionList.list.length > 0) {
    flashSessionList.list = flashSessionList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { flashSessionList, loading };
}

export default connect(store, actions)(FlashSession);
