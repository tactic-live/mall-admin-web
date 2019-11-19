import 'braft-editor/dist/index.css';
import React, { Component } from 'react';
import { Radio } from 'antd';
import CommonConsts from '@/consts/CommonConsts';
import Product from './Product';
import Category from './Category';

class UseTypeComp extends Component {
  state = {};

  componentDidMount() {
    const { getCouponCategoryList } = this.props;
    getCouponCategoryList();
  }

  onChange = (e, field, type) => {
    let val = e;
    if (type) {
      val = e.target.value;
    }
    this.setState({[field]: val});
  }

  // 设置可使用的商品或类目
  relate = (list, field, setNullField) => {
    this.props.form.setFieldsValue({
      [field]: list || [],
      [setNullField]: []
    });
  }

  render() {
    const { useType1 } = this.state;
    const { form, data, match } = this.props;
    const { params } = match || {};
    const { id } = params || {};
    let initUseType = useType1;
    if (id && [0, 1, 2].indexOf(Number(useType1)) === -1) {
      initUseType = data.useType;
    };
    const { getFieldDecorator } = form;
    const { couponUseType } = CommonConsts;
    const { productRelationList = [], productCategoryRelationList = [] } = data;
    const productElem = (
      <div>
        {getFieldDecorator('productRelationList', {
          rules: {
            required: true
          }
        })(
          <Product
            initVal={productRelationList}
            relateProduct={e => this.relate(e, 'productRelationList', 'productCategoryRelationList')}
          />
        )}
      </div>
    );
    const categoryElem = (
      <div>
        {getFieldDecorator('productCategoryRelationList', {
          rules: {
            required: true
          }
        })(
          <Category
            initVal={productCategoryRelationList}
            relateCategory={e => this.relate(e, 'productCategoryRelationList', 'productRelationList')}
          />
        )}
      </div>
    );

    let extraElem = null;
    if (Number(initUseType) === 1) {
      extraElem = categoryElem;
    } else if (Number(initUseType) === 2) {
      extraElem = productElem;
    }

    return (
      <div>
        {getFieldDecorator('useType', {
          rules: {
            required: true
          }
        })(
          <Radio.Group onChange={e => this.onChange(e, 'useType1', 1)} >
            {Object.keys(couponUseType).map(val =>
              <Radio.Button value={val} key={val}>{couponUseType[val]}</Radio.Button>)
            }
          </Radio.Group>
        )}
        {extraElem}
      </div>
    );
  }
}

export default UseTypeComp;
