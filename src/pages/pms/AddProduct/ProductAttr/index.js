import React, { useEffect } from 'react';
import { Form, Button, Select } from 'antd';
import FormLayout from '@/components/layout/form-layout';
import DetailHtml from './DetailHtml';
import ProductAlbumPics from './ProductAlbumPics';


const { Option } = Select;

function ProductAttr(props) {
  console.log('ProductAttr props', props);
  const { productAttributeCategoryList = [], fetchAllAttributeCategory } = props;
  useEffect(() => {
    fetchAllAttributeCategory();
  }, [fetchAllAttributeCategory])
  const prevStep = () => {
    const { prevStep } = props;
    prevStep && prevStep();
  }

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
      const { albumPicList, detailHtmlEditor, detailMobileHtmlEditor, ...rest } = values;
      const detailHtml = detailHtmlEditor.toRAW();
      const detailMobileHtml = detailMobileHtmlEditor.toRAW();
      console.log('before-detailHtml', detailHtml);
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

      console.log('albumPicList', albumPicList);
      // [注]: 主图为商品相册里的第一个
      let pic = '';
      let albumPics = '';
      const picLength = albumPicList.length;
      if (picLength) {
        pic = albumPicList[0].url;
        if (picLength > 1) {
          const picList = [];
          for (let i = 1; i < picLength; i += 1) {
            picList.push(albumPicList[i].url);
          }
          albumPics = picList.join(',');
        }
      }
      const result = Object.assign(rest, {
        pic, albumPics,
        detailHtml, detailMobileHtml
      });
      console.log('before next', result);
      nextStep && nextStep(result);
    });
  }

  const actions = [
    <Button type="primary" onClick={prevStep} key="btnPrev">上一步</Button>,
    <Button type="primary" onClick={submitForm} key="btnNext">下一步</Button>
  ];

  const fields = [
    {
      name: 'productAttributeCategoryId',
      label: '属性类型',
      render: () => {
        return (
          <Select placeholder="请选择">
            {productAttributeCategoryList.map(
              productAttributeCategoryItem => <Option value={productAttributeCategoryItem.id} key={productAttributeCategoryItem.id}>{productAttributeCategoryItem.name}</Option>)}
          </Select>
        );
      }
    },
    // {
    //   name: 'skuStockList',
    //   label: '商品规格',
    // },
    // {
    //   name: 'attrPic',
    //   label: '属性图片',
    // },
    // {
    //   name: 'productAttributeValueList',
    //   label: '商品参数'
    // },
    {
      name: 'productAlbumPics',
      label: '商品相册',
      render: (text) => <ProductAlbumPics {...props} />
    },
    {
      name: 'detailBothHtml',
      label: '详情参数',
      span: 18,
      render: (text) => <DetailHtml {...props} />
    },
  ];

  return (
    <FormLayout actions={actions} {...props} defaultValues={props.data} fields={fields} />
  )
}


const WrappedProductAttr = Form.create({ name: 'add.product.productAttr' })(ProductAttr);
export default WrappedProductAttr;
