import React from 'react';
import { Form, InputNumber, Switch, Checkbox, Button } from 'antd';
import moment from 'moment';
import InputNumberPlus from '@/components/input-number-plus';
import FormLayout from '@/components/layout/form-layout';
import PromotionType from './PromotionType';


const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

class PromotionInfo extends React.PureComponent {
  componentDidMount() {
    // this.onLoad();
  }

  onLoad = () => {
    // setTimeout(()=>{
    const { form } = this.props;
    console.log('PromotionInfo, onload form', form)
    const step2Data = {
      promotionType: "2",
      promotionStartTime: moment()
    }

    form.setFieldsValue(step2Data);
    // }, 3000)
  }

  fields = (props) => [
    {
      name: 'giftPoint',
      label: '赠送积分',
      rules: [],
      render: (text) => <InputNumber step={1} min={0} className="giftPoint" />
    },
    {
      name: 'giftGrowth',
      label: '赠送成长值',
      rules: [],
      render: (text) => <InputNumber step={1} min={0} className="giftGrowth" />
    },
    {
      name: 'usePointLimit',
      label: '积分购买限制',
      rules: [],
      render: (text) => <InputNumber step={1} min={0} className="usePointLimit" />
    },
    {
      name: 'previewStatus',
      label: '预告商品',
      valuePropName: 'checked',
      component: Switch
    },
    {
      name: 'publishStatus',
      label: '商品上架',
      valuePropName: 'checked',
      component: Switch
    },
    {
      name: 'recommandStatus',
      label: '商品推荐',
      valuePropName: 'checked',
      component: Switch
    },
    {
      name: 'newStatus',
      label: '新品推荐',
      valuePropName: 'checked',
      component: Switch
    },
    {
      name: 'serviceList',
      label: '服务保证',
      render: () => {
        return (
          <Checkbox.Group>
            <Checkbox value="1">无忧退货</Checkbox>
            <Checkbox value="2">快速退款</Checkbox>
            <Checkbox value="3">免费包邮</Checkbox>
          </Checkbox.Group>
        )
      }
    },
    {
      name: 'detailTitle',
      label: '详细页标题'
    },
    {
      name: 'detailDesc',
      label: '详细页描述'
    },
    {
      name: 'keywords',
      label: '商品关键字',
      placeholder: '商品关键字'
    },
    {
      name: 'note',
      label: '商品备注',
      placeholder: '商品备注',
      render: (text) => <InputNumberPlus min={0} max={999} addonAfter="克" className="weight" />
    },
    {
      name: 'promotionType',
      label: '选择优惠方式',
      span: 14,
      valuePropName: 'activeKey',
      render: () => {
        return <PromotionType {...props} />;
      }
    },
  ]


  submitForm = (e) => {
    e.preventDefault();
    const { form, data, productInfo, nextStep } = this.props;
    // const { current, tmpDatas } = this.state;
    // const currentStepComp = stepFormList[current];
    form.validateFieldsAndScroll((err, values) => {
      console.log('nextStep values', values)
      if (err) {
        return;
      }


      const { memberPriceList } = Object.assign({}, productInfo, data);
      console.log('nextStep memberPriceList', productInfo)
      const result = {
        ...values,
        memberPriceList: [...memberPriceList],
      };
      result.serviceIds = result.serviceList.join(',');
      // 去除会员价格多于部分
      Object.keys(values).filter(key => /^memberPrice_/.test(key)).forEach((key, index) => {
        result.memberPriceList[index].memberPrice = (values[key]);
        delete result[key];
      });
      console.log('before next step', result);
      nextStep && nextStep(result);
    })
  }

  prevStep = (e) => {
    const { prevStep } = this.props;
    prevStep && prevStep();
  }

  render() {
    const { productInfo, data: propData = {}, ...rest } = this.props;
    const actions = [
      <Button type="primary" onClick={this.prevStep} key="btnPrev">上一步</Button>,
      <Button type="primary" onClick={this.submitForm} key="btnNext">下一步</Button>
    ];
    const data = { ...productInfo, ...propData }

    const fields = this.fields({ data, ...rest });
    // .map(field => {
    //   field.initialValue = data[field.name];
    //   return field;
    // });

    return (
      <FormLayout {...formTailLayout} defaultValues={data} fields={fields} {...rest}
        onLoad={this.onLoad} actions={actions} onSubmit={this.submitForm} />
    )
  }
}

const WrappedPromotionInfo = Form.create({ name: 'add.product.promotionInfo' })(PromotionInfo)
export default WrappedPromotionInfo;
