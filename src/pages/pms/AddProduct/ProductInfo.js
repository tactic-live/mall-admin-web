import React, { useEffect } from 'react';
import { Form, Input, Select, InputNumber, Button } from 'antd';
import InputNumberPlus from '@/components/input-number-plus';
import FormLayout from '@/components/layout/form-layout';

const { Option } = Select;

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};


function ProductInfo(props) {
  console.log('ProductInfo props', props)
  const { productInfo,
    fetchProductCategoryWithChildren,
    fetchBrandList,
    productCategorySelectList = [],
    brandList = { list: [] },
    data,
    ...rest
  } = props;
  useEffect(() => {
    // 初始化首页list信息
    fetchProductCategoryWithChildren();
    fetchBrandList(1, 100);
    return () => {
    };
  }, [])

  const submitForm = (e) => {
    e.preventDefault();
    const { form, data, productInfo, nextStep } = props;
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
      nextStep && nextStep(values);
    })

  }

  const actions = [
    <Button type="primary" onClick={submitForm} key="btnNext">下一步</Button>
  ];

  const fields = [
    {
      name: 'type',
      label: '商品分类',
      rules: [
        {
          required: true,
          message: '[商品分类] 不能为空',
        }
      ],
      render: (text) => {
        return (
          <Select placeholder="请选择">
            {productCategorySelectList.map(
              productCategoryItem => <Option value={productCategoryItem.id} key={productCategoryItem.id}>{productCategoryItem.name}</Option>)}
          </Select>
        );
      }
    },
    {
      name: 'name',
      label: '商品名称',
      rules: [
        {
          required: true,
          message: '[商品名称] 不能为空',
        },
        {
          min: 2,
          max: 140,
          message: '[商品名称] 长度应为 2 到 140 个字符'
        }
      ],
    },
    {
      name: 'subTitle',
      label: '副标题',
      rules: [
        {
          required: true,
          message: '[副标题] 不能为空',
        }
      ],
    },
    {
      name: 'brandId',
      label: '商品品牌',
      rules: [
        {
          required: true,
          message: '[商品品牌] 不能为空',
        }
      ],
      render: () => {
        return (
          <Select placeholder="请选择">
            {brandList.list.map((brandInfo) => <Option value={brandInfo.id} key={brandInfo.id}>{brandInfo.name}</Option>)}
          </Select>
        )
      }
    },
    {
      name: 'description',
      label: '商品介绍',
      component: Input.TextArea
    },
    {
      name: 'productSn',
      label: '商品货号',
    },
    // 商品售价
    {
      name: 'price',
      label: '商品售价',
      render: (text) =>
        <InputNumberPlus step={1} precision={2} formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} min={0} max={9999} addonAfter="元" className="price" />
    },
    // 市场价
    {
      name: 'originalPrice',
      label: '市场价',
      render: (text) =>
        <InputNumberPlus step={1} precision={2} formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} min={0} max={9999} addonAfter="元" className="originalPrice" />
    },
    // 商品库存
    {
      name: 'stock',
      label: '商品库存',
      render: (text) =>
        <InputNumberPlus step={1} min={0} max={9999} addonAfter="" className="stock" />
    },
    // 计量单位
    {
      name: 'unit',
      label: '计量单位',
    },
    // 商品重量
    {
      name: 'weight',
      label: '商品重量',
      render: (text) => <InputNumberPlus min={0} max={999} addonAfter="克" className="weight" />
    },
    // 排序
    {
      name: 'sort',
      label: '排序',
      render: (text) => <InputNumber step={1} min={0} className="sort" />
    },
  ];

  return (
    <FormLayout {...formTailLayout} defaultValues={data} fields={fields} data {...rest}
      actions={actions} onSubmit={submitForm} />
  )
}

const WrappedProductInfo = Form.create({ name: 'add.product.productInfo' })(ProductInfo)
export default WrappedProductInfo;
