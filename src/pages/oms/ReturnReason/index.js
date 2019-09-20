import React from 'react';
import QueryString from 'query-string';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Popconfirm, Switch } from 'antd';
import { SearchLayout } from '@/components/layout';
import AddReasonBtn from './AddReasonBtn/addReasonBtn';
import { actions } from './action';
import './index.less';

const fields = [
  // {
  //   name: 'productAttrName',
  //   label: '类型名称',
  //   required: true,
  //   placeholder: '',
  //   span: 8
  // }
]

class ReturnReason extends SearchLayout {

  extActions = [
    (
      // <Button type="primary" ghost key="btnAdd" onClick={() => { this.showAddModal }}>添加</Button>
      <AddReasonBtn handleConfirm={this.props.addReturnReason} key="btnAdd" reSearch={this.reSearch} />
    )
  ];

  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '原因类型',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 100
    },
    {
      title: '是否可用',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text, record) => {
        // console.log('开关数据', text, record);
        return (
          <Switch
            checked={!!text}
            onChange={(checked) => {
              const { updateReturnReasonUseStatus } = this.props;
              const status = checked ? 1 : 0;
              updateReturnReasonUseStatus(status, record.id);
            }}
          />
        )
      }
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      render: (text) => {
        return (
          <div>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'actions',
      width: 250,
      render: (text, record) => {
        return (
          <div>
            <AddReasonBtn
              // btnName="编辑"
              // modalTitle="修改退货原因"
              btnType={1}
              reasonId={record.id}
              reasonName={record.name}
              reasonSort={record.sort}
              reasonStatus={record.status}
              handleConfirm={this.props.updateReturnReason}
              reSearch={this.reSearch}
            />
            &nbsp;
            <Popconfirm
              title={`确认要删除退货原因[${record.name}]吗?`}
              onConfirm={() => {
                const { deleteReturnReasonById } = this.props;
                deleteReturnReasonById(record.id);
                this.reSearch();
              }}
              okText="删除"
              cancelText="取消"
            >
              <Button type="primary" ghost size="small" onClick={() => { }}>删除</Button>
            </Popconfirm>
          </div>
        );
      }
    },
  ]

  componentDidMount() {
    this.setState({
      conditionFields: fields,
      columns: this.columns,
      extActions: this.extActions
    });
    this.init();
  }

  init() {
    const { fetchReturnReason, location } = this.props;
    const { search } = location;
    const params = QueryString.parse(search);
    const { current, pageSize } = params;
    fetchReturnReason(current, pageSize);
  }
}

const store = (state) => {
  const { oms = {} } = state;
  const { returnReasonList = {}, loading, deleteReturnReasonStatus } = oms;
  const retVal = { ...returnReasonList };
  if (returnReasonList.list) {
    retVal.list = returnReasonList.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { _result: retVal, loading, deleteReturnReasonStatus };
}

export default connect(store, actions)(ReturnReason);
