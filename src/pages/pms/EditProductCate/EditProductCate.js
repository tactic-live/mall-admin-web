import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Spin, Radio, InputNumber, message, Select, Cascader } from 'antd';
import FormUpload from '@/components/form-upload';
import CascaderList from './CascaderList';
import { actions } from './action';
import { INIT_STATE } from '../reducer';

import './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

/**
 * 品牌编辑/添加
 */
class EditProductCate extends React.PureComponent {

  state = {
    productAttributeIdList: [
      {
        key: 'key1',
        attributeCategoryId: -1,
        attributeId: -1
      },
    ]
  }

  componentDidMount() {
    const { id, productCateInfo, fetchProductCategoryById, fetchCategoryListWithAttr, fetchProductCategoryByParentId } = this.props;
    // 筛选属性
    fetchCategoryListWithAttr();
    // 上级分类
    fetchProductCategoryByParentId(productCateInfo.parentId, 1, 100);
    if (id) {
      fetchProductCategoryById(id);
    }
  }

  componentWillUnmount() {
    const { clearState } = this.props;
    clearState('productCateInfo', INIT_STATE.productCateInfo);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      const { id, mode, addBrand, updateProductCate } = this.props;
      if (err) {
        return;
      }
      console.log('onSubmit productCateInfo', values);
      let { iconItem, productAttributeIdList, ...rest } = values;
      if (typeof (iconItem) === 'string') {
        iconItem = { url: iconItem };
      } else if (iconItem && iconItem.length > 0) {
        iconItem = { url: iconItem[0].url || iconItem[0].originFileObj.url }
      }
      iconItem = iconItem || {};
      // 整合筛选属性
      const tmpProductAttributeIdList = productAttributeIdList.map((item) => {
        return item.pop();
      });
      // const productAttributeIdListKeys = Object.keys(rest).filter(key => /productAttributeIdList_/.test(key));
      // const otherProps = { ...rest };
      // productAttributeIdListKeys.forEach(key => {
      //   console.log(otherProps[key])
      //   const val = [...otherProps[key]].pop();
      //   otherProps.productAttributeIdList.push(val);
      // });
      // productAttributeIdListKeys.forEach(key => {
      //   delete otherProps[key];
      // });
      const productCateInfo = { id, ...rest, productAttributeIdList: tmpProductAttributeIdList, icon: iconItem.url || '' };
      console.log('onSubmit productCateInfo', productCateInfo, values);

      if (id && mode === 'update') {
        await updateProductCate(productCateInfo);
        message.success(`商品分类 [${productCateInfo.name}] 更新成功.`);
        const { history } = this.props;
        history.goBack();
      } else {
        addBrand(productCateInfo);
        message.success(`商品分类 [${productCateInfo.name}] 添加成功.`);
      }
    })
  }

  /**
   * 增加属性筛选项
   */
  addProductAttributeSelect = () => {
    console.log('click')
    this.setState({
      productAttributeIdList: [
        ...this.state.productAttributeIdList,
        {
          attributeCategoryId: -1, attributeId: -1
        }
      ]
    });
  }


  /**
   * 删除属性筛选项
   */
  delProductAttributeSelect = (index) => {
    const productAttributeIdList = [...this.state.productAttributeIdList];
    productAttributeIdList.splice(index, 1);
    console.log('productAttributeIdList', productAttributeIdList)
    this.setState({
      productAttributeIdList
    });
  }

  /**
   * 创建筛选属性
   */
  createProductAttrInfoList() {
    const { id, form, productCateInfo, productAttributeList } = this.props;
    // const { productAttributeIdList } = this.state;
    const { productAttributeIdList: productAttributeIdListInitialValue } = productCateInfo;
    const { getFieldDecorator, setFieldsValue } = form;
    // 级联选择
    const cascaderOptions = productAttributeList.map(productAttribute => {
      return {
        value: productAttribute.id,
        label: productAttribute.name,
        disabled: productAttribute.productAttributeList.length === 0,
        children: productAttribute.productAttributeList.map(
          productAttributeChild => ({
            value: productAttributeChild.id,
            label: productAttributeChild.name
          }))
      }
    });
    // if (productAttributeIdList.length === 0) {
    //   // TODO: 添加
    //   return (
    //     <Fragment>
    //       <Form.Item {...formItemLayout} label="筛选属性">
    //         {getFieldDecorator('productAttributeIdList')(
    //           <Cascader options={cascaderOptions} placeholder="请选择" key={`productAttributeIdList_${index}`} />
    //         )}
    //       </Form.Item>
    //     </Fragment>
    //   );
    // }
    const retElem = (
      <Fragment>
        <Form.Item {...formItemLayout} label="筛选属性">
          {/* {productAttributeIdList.map((attrInfo, index) => {
            console.log('productAttributeIdList', attrInfo, productAttributeIdList);
            const { attributeCategoryId, attributeId } = attrInfo;
            const initialValue = [attributeCategoryId, attributeId];
            console.log('initialValue', `productAttributeIdList_${index}`, initialValue);
            return (
              <div className="fliter-attr">
                {getFieldDecorator(`productAttributeIdList_${index}`, {
                  initialValue
                })(
                  <Cascader options={cascaderOptions} placeholder="请选择" key={`productAttributeIdList_${index}`} />
                )}
                {index > 0 ? <Button type="ghost" onClick={() => this.delProductAttributeSelect(index)}>删除</Button> : null}
              </div>
            )
          })} */}
          {getFieldDecorator(`productAttributeIdList`, {
            valuePropName: 'valueList',
            initialValue: productAttributeIdListInitialValue.map((productAttributeIdInfo => ([
              productAttributeIdInfo.attributeCategoryId,
              productAttributeIdInfo.attributeId,
            ])))
          })(
            <CascaderList
              options={cascaderOptions}
              max={3}
            // render={(attrInfo, index) => (
            //   <div className="fliter-attr">
            //     <Cascader options={cascaderOptions} placeholder="请选择" key={`productAttributeIdList_${index}`} />
            //     {index > 0 ? <Button type="ghost" onClick={() => this.delProductAttributeSelect(index)}>删除</Button> : null}
            //   </div>
            // )}
            />
          )}
        </Form.Item>
      </Fragment>
    );
    return retElem;
  }

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  /**
   * 创建表单输入元素
   */
  createInputFormItem = () => {
    const { id, form, productCateInfo, productCateList } = this.props;
    const { list: productCateListDatas } = productCateList;
    const {
      name, parentId, productUnit, description, icon, keywords, navStatus = 0,
      sort = 0, showStatus = 0
    } = productCateInfo;
    const { getFieldDecorator } = form;
    const iconDefaultFileList = [];
    if (icon) {
      iconDefaultFileList.push({
        uid: id,
        name: (icon || '').split('/').pop(),
        status: 'done',
        url: icon,
        thumbUrl: icon
      })
    }
    return (
      <Fragment>
        <Form.Item {...formItemLayout} label="分类名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '[分类名称]不能为空',
              },
            ],
            initialValue: name
          })(<Input placeholder="分类名称" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="上级分类">
          {getFieldDecorator('parentId', {
            rules: [],
            initialValue: parentId
          })(
            <Select placeholder="上级分类" >
              <Option value={0}>无上级分类</Option>
              {productCateListDatas.map(productCateListInfo => <Option value={productCateListInfo.id} key={productCateListInfo.id}>{productCateListInfo.name}</Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="数量单位">
          {getFieldDecorator('productUnit', {
            initialValue: productUnit
          })(<Input placeholder="上级分类" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="排序">
          {getFieldDecorator('sort', {
            rules: [],
            initialValue: sort
          })(<InputNumber placeholder="排序" min={0} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="是否显示">
          {getFieldDecorator('showStatus', {
            rules: [],
            initialValue: showStatus
          })(
            <Radio.Group placeholder="是否显示" >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="是否显示在导航栏">
          {getFieldDecorator('navStatus', {
            rules: [],
            initialValue: navStatus
          })(
            <Radio.Group placeholder="是否显示在导航栏" >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="分类图标">
          {getFieldDecorator('iconItem', {
            rules: [],
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            initialValue: iconDefaultFileList
          })(<FormUpload onChange={this.uploadOnChange} maxLength={1} multiple={false} />)}
        </Form.Item>
        {this.createProductAttrInfoList()}
        <Form.Item {...formItemLayout} label="关键词">
          {getFieldDecorator('keywords', {
            initialValue: keywords
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="分类描述">
          {getFieldDecorator('description', {
            initialValue: description
          })(<Input.TextArea />)}
        </Form.Item>
      </Fragment>
    )
  }

  render() {
    const { mode, id, loading } = this.props;
    console.log('mode', mode)
    if (mode === 'update' && loading) {
      return null;
    }
    return (
      <Form onSubmit={this.onSubmit}>
        {this.createInputFormItem()}
        <Form.Item {...formTailLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

const store = (state) => {
  const { productCateInfo, loading, productAttributeList, productCateList } = state.pms;
  return { productCateInfo, loading, productAttributeList, productCateList };
}

const connEditProductCate = connect(store, actions)(EditProductCate);
const WrappedFormEditProductCate = Form.create({ name: 'editProductCate' })(connEditProductCate);
export default WrappedFormEditProductCate;
