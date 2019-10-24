import React from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { Button, message } from 'antd';
import { SearchLayout } from '@/components/layout';
import { actions } from './action';
import EditModal from './editModal';
import DelectConfirmModal from './delectConfirmModal'
import './index.less';


class FlashProductRelation extends SearchLayout {
  fields = [];
  extActions = [
    (
      <div>
        <Button type="primary" className='activitykey' ghost key="activitykey" onClick={() => this.handleAdd()}>添加</Button>
      </div>
    )
  ];


  columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 80
  }, {
    title: '商品名称',
    dataIndex: 'product.name',
    key: 'name',
    width: 100
  }, {
    title: '货号',
    dataIndex: 'product.productSn',
    key: 'productSn',
    width: 100
  }, {
    title: 'product.商品价格',
    dataIndex: 'product.price',
    key: 'price',
    width: 100
  }, {
    title: '剩余数量',
    dataIndex: 'product.stock',
    key: 'stock',
    width: 100
  }, {
    title: '秒杀价格',
    dataIndex: 'flashPromotionPrice',
    key: 'flashPromotionPrice',
    width: 100
  }, {
    title: '限购数量',
    dataIndex: 'flashPromotionLimit',
    key: 'flashPromotionLimit',
    width: 100
  }, {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 100
  }, {
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
    width: 80,
    render: (text, record) => {
      return (
        <div >
          <Button type="primary" ghost size="small" onClick={() => this.updateProduct(record)} >编辑</Button>
          <Button type="primary" ghost size="small" onClick={() => this.delectProductionConfirm(record)} >删除</Button>
          <DelectConfirmModal
            {...this.state.delectModalData}
            delectId={record.id}
            delectCancel={this.delectCancel}
            delectOk={this.delectOk}
          />
          <EditModal
            {...this.state.modalData}
            editId={record.id}
            handleCancel={this.handleCancel}
            handleOk={this.handleOk}
          />
        </div>
      );
    }
  }];

  constructor(props, context) {
    super(props, context);
    this.state.conditionFields = this.fields;
    this.state.extActions = this.extActions;
    this.state.columns = this.columns;
    // 排序modal数据
    this.state.modalData = {
      visible: false
    };
    this.state.delectModalData = {
      canVisible: false
    }
  }

  handleCancel = () => {
    this.setState({
      modalData: {
        visible: false,
        data: []
      }
    })
  }

  handleOk = async (data) => {
    const { updateFlashProductionRelation, } = this.props;
    await updateFlashProductionRelation({
      ...data
    });
    const { flashProductRelationChangeResult } = this.props;
    console.log('flashProductRelationChangeResult', flashProductRelationChangeResult)
    if (Number(flashProductRelationChangeResult) == 1) {
      message.info('修改成功')
    } else {
      message.info('修改失败');
      this.setState({
        modalData: {
          visible: false
        }
      })
      this.init()
    }
  }


  delectProductionConfirm(data) {
    this.setState({
      delectModalData: {
        cancelVisible: true,
        data: data
      }
    })
  }

  delectCancel = () => {
    this.setState({
      delectModalData: {
        cancelVisible: false,
      }
    })
  }

  delectOk = async (data) => {
    this.delectProduction(data.id)
  }

  delectProduction = async (id) => {
    const { delectFlashProductionRelation } = this.props;
    console.log('deldect', id)
    const res = await delectFlashProductionRelation(id);
    const { flashProductRelationChangeResult } = this.props;
    if (Number(flashProductRelationChangeResult) === 1) {
      message.info('删除成功')
      this.init();
    } else {
      message.info('删除失败')
    }
    console.log('delectProduction', res)
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    const { location, fetchFlashProductionRelationList } = this.props;
    const { search } = location;
    const params = QueryString.parse(search);
    const { current = 1, pageSize = 5, flashPromotionId, flashPromotionSessionId } = params;
    fetchFlashProductionRelationList({
      pageNum: current,
      pageSize: pageSize,
      flashPromotionId,
      flashPromotionSessionId
    });
  }

  updateProduct = (data) => {
    console.log('updateProduct', data)
    this.setState({
      modalData: {
        visible: true,
        data: data
      }
    })
  }
}


const store = (state) => {
  const { sms = {} } = state;
  const { flashProductRelation = {}, loading, flashProductRelationChangeResult } = sms;
  const retVal = { ...flashProductRelation };
  if (flashProductRelation.list) {
    console.log('flashProductRelation', flashProductRelation.list)
    retVal.list = flashProductRelation.list.map(item => {
      item.key = item.id
      return item;
    });
  }
  return { _result: retVal, loading, flashProductRelationChangeResult };
}

export default connect(store, actions)(FlashProductRelation);
