import React from 'react';
import { Button, Form } from 'antd';
import FormLayout from '@/components/layout/form-layout';

function ProductRelation(props) {
  const prevStep = () => {
    const {prevStep} = props;
    prevStep && prevStep();
  }

  const submitForm = (e) => {
    e.preventDefault();
    const { form, data, productInfo, onSubmit } = props;
    // const { current, tmpDatas } = this.state;
    // const currentStepComp = stepFormList[current];
    form.validateFieldsAndScroll((err, values) => {
      console.log('nextStep values', values)
      if (err) {
        return;
      }
      // const { memberPriceList } = Object.assign({}, productInfo, data);
      // console.log('nextStep memberPriceList', productInfo)
      // const result = {
      //   ...values,
      //   memberPriceList: [...memberPriceList],
      // };
      // // 去除会员价格多于部分
      // Object.keys(values).filter(key => /^memberPrice_/.test(key)).forEach((key, index) => {
      //   result.memberPriceList[index].memberPrice = (values[key]);
      //   delete result[key];
      // });
      onSubmit && onSubmit(values);
    })

  }
  const actions = [
    <Button type="primary" onClick={prevStep} key="btnPrev">上一步</Button>,
    <Button type="primary" onClick={submitForm} key="btnNext">提交</Button>
  ];
  return (
    <FormLayout actions={actions} {...props}/>
  )
}

const WrappedProductRelation = Form.create({ name: 'add.product.productAttr' })(ProductRelation)
export default WrappedProductRelation;

