import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import Steps from './Steps';
import { actions } from './actions';
import PromotionInfo from './PromotionInfo';
import ProductRelation from './ProductRelation';
import ProductInfo from './ProductInfo';
import ProductAttr from './ProductAttr';

import './style.less';

const stepFormList = [ProductInfo, PromotionInfo, ProductAttr, ProductRelation];

class AddProduct extends React.PureComponent {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      current: 0,
      steps: 4,
      tmpDatas: {},
      currentFieldsData: {}
    }
  }

  submitForm = (e) => {
    e.preventDefault();
  }

  prevStep = () => {
    const { current } = this.state;
    const to = current - 1;
    if (current > 0) {
      this.setState({
        current: to,
        currentFieldsData: this.getFormData(to)
      });
    }
  }

  getFormData = (current) => {
    const { tmpDatas } = this.state;
    // const currentStepComp = stepFormList[current];
    // const { fields = [] } = currentStepComp;
    const currentFieldsData = tmpDatas[current];
    console.log('currentFieldsData', currentFieldsData);
    return currentFieldsData;
  }

  componentDidMount() {
    const { form, fetchProductCategoryWithChildren, fetchBrandList } = this.props;
    const data = {
      brandId: 4,
      description: undefined,
      name: "eee",
      originalPrice: 0,
      price: 0,
      productSn: undefined,
      sort: 0,
      stock: 0,
      subTitle: "eee",
      type: 1,
      unit: undefined,
      weight: 0,
    }
    return;
    // form.setFieldsValue(step2Data);
  }

  nextStep = (values) => {
    const { current, tmpDatas } = this.state;
    // const currentStepComp = stepFormList[current];
    tmpDatas[current] = values;
    // 翻页
    if (current < 3) {
      this.setState({
        current: current + 1
      });
    }
  }

  onChange = (e) => {

  }

  onSubmit = (values) => {
    const { current, tmpDatas } = this.state;
    tmpDatas[current] = values;
    const formData = {};
    Object.values(tmpDatas).forEach((datas) => {
      console.log('tmpDatas.forEach', datas);
      Object.assign(formData, { ...datas });
    });

    console.log('index, onSubmit', tmpDatas, formData);
  }

  render() {
    const { productInfo } = this.props;
    const { current, currentFieldsData } = this.state;
    console.log('currentFieldsData', currentFieldsData);
    const StepComp = stepFormList[current];
    // const buttons = [];
    // if (current === 0) {
    //   buttons.push(<Button type="primary" onClick={this.nextStep} key="btnNext">下一步</Button>);
    // } else if (current >= 3) {
    //   buttons.push(<Button type="primary" onClick={this.prevStep} key="btnPrev">上一步</Button>)
    //   buttons.push(<Button type="primary" onClick={this.submitForm} key="btnSubmit">提交</Button>)
    // } else {
    //   buttons.push(<Button type="primary" onClick={this.prevStep} key="btnPrev">上一步</Button>)
    //   buttons.push(<Button type="primary" onClick={this.nextStep} key="btnNext">下一步</Button>);
    // }

    return (
      <div className="add-product">
        <Steps current={current} />
        <StepComp {...this.props}
          data={{ ...productInfo, ...currentFieldsData }}
          // actions={buttons}
          onSubmit={this.onSubmit}
          nextStep={this.nextStep} prevStep={this.prevStep} />
      </div>
    );
  }
}
const store = (state) => {
  const {
    productInfo,
    productCategorySelectList,
    brandList,
    productAttributeCategoryList,
    subjectList
  } = state.pms;
  return {
    productInfo,
    productCategorySelectList,
    brandList,
    productAttributeCategoryList,
    subjectList
  };
}
const connAddProduct = connect(store, actions)(AddProduct);
// const WrappedAddProduct = Form.create({ name: 'add.product' })(connAddProduct)
// export default WrappedAddProduct;
export default connAddProduct;

