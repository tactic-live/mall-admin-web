import React, { useEffect } from 'react';
import { Form, Input, Select, InputNumber, Button, Cascader } from 'antd';
import InputNumberPlus from '@/components/input-number-plus';
import FormLayout from '@/components/layout/form-layout';

const { Option } = Select;

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};


function ProductInfo(props) {
  const {
    productInfo,
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
  }, []);


  // 下一步
  const submitForm = (e) => {
    e.preventDefault();
    const { form, nextStep } = props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      console.log('next step', values);
      nextStep && nextStep(values);
    })

  }

  const actions = [
    <Button type="primary" onClick={submitForm} key="btnNext">下一步</Button>
  ];

  const fields = [
    {
      name: 'productCategoryId',
      label: '商品分类',
      rules: [
        {
          required: true,
          message: '[商品分类] 不能为空',
        }
      ],
      render: (text) => {
        const options = [];
        productCategorySelectList.forEach((category) => {
          const { id, name, children } = category;
          const categoryOption = {
            value: `${id}@${name}`,
            label: name,
            children: []
          };
          children.forEach((child) => {
            const { id: childId, name: childName } = child;
            categoryOption.children.push({
              value: `${childId}@${childName}`,
              label: childName
            });
          });
          options.push(categoryOption);
        });
        return (
          // <Select placeholder="请选择">
          //   {productCategorySelectList.map(
          //     productCategoryItem => <Option value={productCategoryItem.id} key={productCategoryItem.id}>{productCategoryItem.name}</Option>)}
          // </Select>
          <Cascader options={options} placeholder="请选择" />
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
            {
              brandList.list.map((brandInfo) =>
                <Option value={`${brandInfo.id}@${brandInfo.name}`} key={brandInfo.id}>{brandInfo.name}</Option>
              )
            }
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
    <FormLayout {...formTailLayout} defaultValues={data} fields={fields} {...rest}
      actions={actions} onSubmit={submitForm} />
  )
}

const WrappedProductInfo = Form.create({ name: 'add.product.productInfo' })(ProductInfo)
export default WrappedProductInfo;
