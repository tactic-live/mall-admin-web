import React, { createRef } from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { Form, Button, Steps, message } from 'antd';
import { actions } from './action';
import './index.less';
import ShowProductions from './showProductions'
import ProductionInfo from './productionInfo'

const { Step } = Steps;

let sourceData = {};
class AddFlashProductRelation extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      selectList: [],
      flashPromotionId: '',
      flashPromotionSessionId: ''
    };
  }

  steps = [
    {
      title: '第一步',
      content: () => {
        return (
          <ShowProductions
            getSelectData={this.getSelectData} />
        )
      },
    },
    {
      title: '第二步',
      content: () => {
        return (
          <ProductionInfo
            {...this.state}
            addProduction={this.addProduction}
          />
        )
      },
    }
  ];


  componentDidMount() {
    this.init();
  }

  init() {
    const { location } = this.props;
    const { search } = location;
    const params = QueryString.parse(search);
    const { flashPromotionId, flashPromotionSessionId } = params;
    this.setState({
      flashPromotionId,
      flashPromotionSessionId
    })
  }

  next() {
    const current = this.state.current + 1;
    let data = [];
    for (const key in sourceData) {
      if (sourceData.hasOwnProperty(key)) {
        for (let i = 0; i < sourceData[key].length; i++) {
          data.push(sourceData[key][i])
        }
      }
    }
    console.log('sourceData', data);
    if (data.length === 0) {
      message.info('请选择商品');
      return false;
    }
    this.setState({
      current,
      selectList: data
    });

  }



  getSelectData(data) {
    sourceData[data.pageNum] = data.selectedRows;
    console.log('sourceData', data.pageNum, sourceData)
  }


  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  addProduction = async (data) => {
    const { addProductList } = this.props;
    const source = await addProductList(data);
    const { payload } = source;
    if (payload) {
      const { history } = this.props;
      const { flashPromotionId, flashPromotionSessionId } = this.state;
      history.push(`/sms/flashProductRelation?flashPromotionId=${flashPromotionId}&flashPromotionSessionId=${flashPromotionSessionId}`)
    }
    console.log('addProduction', source)
  }


  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {this.steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{this.steps[current].content()}</div>
        <div className="steps-action">
          {current < this.steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const store = () => {
  return {}
}
export default connect(store, actions)(AddFlashProductRelation);
