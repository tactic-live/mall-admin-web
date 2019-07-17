import React, { Fragment } from 'react';
import { Form, Input, Select, InputNumber } from 'antd';
import InputNumberPlus from '@/components/input-number-plus';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};
function ProductInfo({ form, productInfo,
  productCategorySelectList = [],
  brandList = { list: [] }
}) {
  const { getFieldDecorator } = form;

  console.log('brandList', brandList)
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
      placeholder: '商品分类',
      render: (text) => {
        return (
          <Select>
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
      placeholder: '商品名称'
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
      placeholder: '副标题'
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
      placeholder: '商品品牌',
      render: () => {
        return (
          <Select>
            {brandList.list.map((brandInfo) => <Option value={brandInfo.id} key={brandInfo.id}>{brandInfo.name}</Option>)}
          </Select>
        )
      }
    },
    {
      name: 'description',
      label: '商品介绍',
      placeholder: '商品介绍',
      component: Input.TextArea
    },
    {
      name: 'productSn',
      label: '商品货号',
      placeholder: '商品货号'
    },
    // 商品售价
    {
      name: 'price',
      label: '商品售价',
      placeholder: '商品售价',
      render: (text) =>
        <InputNumberPlus step={1} precision={2} formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} min={0} max={9999} addonAfter="元" className="price" />
    },
    // 市场价
    {
      name: 'originalPrice',
      label: '市场价',
      placeholder: '市场价',
      render: (text) =>
        <InputNumberPlus step={1} precision={2} formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} min={0} max={9999} addonAfter="元" className="originalPrice" />
    },
    // 商品库存
    {
      name: 'stock',
      label: '商品库存',
      placeholder: '商品库存',
      render: (text) =>
        <InputNumberPlus step={1} min={0} max={9999} addonAfter="" className="stock" />
    },
    // 计量单位
    {
      name: 'unit',
      label: '计量单位',
      placeholder: '计量单位'
    },
    // 商品重量
    {
      name: 'weight',
      label: '商品重量',
      placeholder: '商品重量',
      render: (text) => <InputNumberPlus min={0} max={999} addonAfter="克" className="weight"/>
    },
    // 排序
    {
      name: 'sort',
      label: '排序',
      placeholder: '排序',
      render: (text) => <InputNumber step={1} min={0} className="sort" />
    },
  ]

  return (
    <Fragment>
      {fields.map(field => {
        // const {} = productInfo;
        const { label,
          initialValue = productInfo[field.name],
          placeholder, name, render, component
        } = field;
        const rules = field.rules || [];
        let itemComp = null;
        if (render) {
          itemComp = render(initialValue, field);
        } else if (component) {
          itemComp = React.createElement(component, {
            placeholder: placeholder || label,
            id: name
          });
        } else {
          itemComp = <Input placeholder={placeholder || label} />;
        }
        return (
          <Form.Item {...formItemLayout} label={label} key={name}>
            {getFieldDecorator(name, {
              rules: rules.concat([]),
              initialValue
            })(itemComp)}
          </Form.Item>
        );
      })}
      {/* <Form.Item {...formItemLayout} label="商品分类">
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '[商品分类] 不能为空',
            },
          ],
          // initialValue: name
        })(<Input placeholder="商品分类" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="商品名称">
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '[商品名称] 不能为空',
            },
          ],
          // initialValue: name
        })(<Input placeholder="商品名称" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="副标题">
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '[副标题] 不能为空',
            },
          ],
          // initialValue: name
        })(<Input placeholder="副标题" />)}
      </Form.Item> */}
    </Fragment>
  )
}

export default ProductInfo;
