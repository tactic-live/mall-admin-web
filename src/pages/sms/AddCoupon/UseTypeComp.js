import 'braft-editor/dist/index.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio } from 'antd';
import CommonConsts from '@/consts/CommonConsts';
import { actions } from './action';
import Product from './Product';


class UseTypeComp extends Component {
  state = {};

  onChange = (e, field, type) => {
    let val = e;
    if (type) {
      val = e.target.value;
    }
    this.setState({[field]: val});
  }

  relateProduct = (list) => {
    this.props.form.setFieldsValue({
      productRelationList: list || []
    });
  }

  render() {
    const { useType } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { couponUseType } = CommonConsts;
    // productCategoryRelationList   productRelationList
    const productElem = (
      <div>
        {getFieldDecorator('productRelationList', {
          required: true
        })(
          <Product initVal={[]} relateProduct={e => this.relateProduct(e)} />
        )}
      </div>
    );
    const categoryElem = (
      <div>
        {getFieldDecorator('productCategoryRelationList', {
          required: true
        })(
          <Product />
        )}
      </div>
    );

    let extraElem = null;
    if (Number(useType) === 1) {
      extraElem = categoryElem;
    } else if (Number(useType) === 2) {
      extraElem = productElem;
    }

    return (
      <div>
        {getFieldDecorator('useType', {
          required: true
        })(
          <Radio.Group onChange={e => this.onChange(e, 'useType', 1)} >
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
