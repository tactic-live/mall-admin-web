import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { InputNumber, Form, Input, Button, message } from 'antd';
import { actions } from './action';

import './index.less';

class ProductionInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    }

  }


  async componentDidMount() {
    const { selectList, flashPromotionSessionId, flashPromotionId } = this.props;
    let dataInfo = [];
    for (let i = 0; i < selectList.length; i++) {
      let data = {};
      data.flashPromotionPrice = 0;
      data.flashPromotionLimit = 0; // 限购数量
      data.flashPromotionCount = 0; // 秒杀数量
      data.sort = 0;
      data.flashPromotionSessionId = Number(flashPromotionSessionId);
      data.productId = selectList[i].id;
      data.flashPromotionId = Number(flashPromotionId);
      dataInfo.push(data);
    }
    this.setState({
      dataSource: dataInfo
    });
  }

  changeData = (e, index, type) => {
    // const { value } = e.target;
    const { dataSource } = this.state;
    console.log('eee', e)
    dataSource[index][type] = (e && e.target) ? e.target : e;
    this.setState({
      dataSource
    }, () => {
      console.log('dataSource', dataSource)
    })
  }


  handleSubmit = e => {
    e.preventDefault();
    const { dataSource } = this.state;
    const { selectList, addProduction } = this.props;
    let isSuccess = true;
    console.log('selectList', selectList)
    for (let i = 0; i < dataSource.length; i++) {
      if (!(dataSource[i].flashPromotionPrice > 0)) {
        message.info(`请填写${selectList[i].name}秒杀价格`);
        isSuccess = false
        break;
      }
      if (!(dataSource[i].flashPromotionLimit > 0)) {
        message.info(`请填写${selectList[i].name}限购数量`);
        isSuccess = false
        break;
      }
      if (!(dataSource[i].flashPromotionCount > 0)) {
        message.info(`请填写${selectList[i].name}秒杀数量`);
        isSuccess = false
        break;
      }
    }
    if (isSuccess) {
      addProduction(dataSource)
    }
  };

  render() {
    const { dataSource } = this.state;
    const { selectList } = this.props;
    console.log('props', this.props, selectList, dataSource);
    return (
      <div className='infoAddMain' >
        <Form onSubmit={this.handleSubmit}>
          {
            dataSource.length > 0 ? dataSource.map((res, index) => (
              <div className='infoAddContain' key={res.productId} >
                <Form.Item label="商品图片">
                  <img className="pic" src={selectList[index].pic} alt={selectList[index].name} />
                </Form.Item>
                <Form.Item label="商品名称">
                  <Input value={selectList[index].name} disabled />
                </Form.Item>
                <div className='productionInfoForm'>
                  <Form.Item label="商品原价">
                    <InputNumber value={selectList[index].price} disabled />
                  </Form.Item>
                  <Form.Item label="秒杀价格">
                    <InputNumber value={res.flashPromotionPrice} onChange={(e) => {
                      this.changeData(e, index, 'flashPromotionPrice')
                    }} />
                  </Form.Item>
                  <Form.Item label="限购数量">
                    <InputNumber value={res.flashPromotionLimit} onChange={(e) => {
                      this.changeData(e, index, 'flashPromotionLimit')
                    }} />
                  </Form.Item>
                  <Form.Item label="秒杀数量">
                    <InputNumber value={res.flashPromotionCount} onChange={(e) => {
                      this.changeData(e, index, 'flashPromotionCount')
                    }} />
                  </Form.Item>
                  <Form.Item label="排序">
                    <InputNumber value={res.sort} onChange={(e) => {
                      this.changeData(e, index, 'sort')
                    }} />
                  </Form.Item>
                </div>
              </div>
            )) : null
          }
          {
            <div className='addBtn'>
              <Button type="primary" htmlType="submit">提交</Button>
            </div>
          }
        </Form>
      </div>
    );
  }
}

const store = (state) => {

  return {};
}

export default connect(store, actions)(Form.create()(ProductionInfo));
