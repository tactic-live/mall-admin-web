import React from 'react';
// import
import FormLayout from '@/components/layout/form-layout';

class AddAdvertise extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.fields = [
      // {
      //   name: 'productAttributeCategoryId',
      //   label: '属性类型',
      //   render: (text) => {
      //     return (
      //       <Select placeholder="请选择">
      //         {productAttributeCategoryList.map(
      //           productAttributeCategoryItem => <Option value={productAttributeCategoryItem.id} key={productAttributeCategoryItem.id}>{productAttributeCategoryItem.name}</Option>)}
      //       </Select>
      //     );
      //   }
      // },
      {
        name: 'skuStockList',
        label: '商品规格',
      },
      {
        name: 'attrPic',
        label: '属性图片',
      },
      {
        name: 'productAttributeValueList',
        label: '商品参数'
      },
      // {
      //   name: 'productAlbumPics',
      //   label: '商品相册',
      //   render: (text) => <ProductAlbumPics {...props} />
      // },
      // {
      //   name: 'detailBothHtml',
      //   label: '详情参数',
      //   span: 18,
      //   render: (text) => <DetailHtml {...props} />
      // },
    ];
  }

  render() {
    return (
      <div>
        添加广告
      </div>
    )
  }
}

// const WrappedProductAttr = Form.create({ name: 'add.product.productAttr' })(AddAdvertise)
export default AddAdvertise;
