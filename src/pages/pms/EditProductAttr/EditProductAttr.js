import React from 'react';
import { Form, Input, Select, Radio, Spin, InputNumber, Button } from 'antd';
import { connect } from 'react-redux';
import { actions } from './action';

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

class EditProductAttr extends React.PureComponent {

  state = {
    submiting: false
  }

  componentDidMount() {
    const { changeLoading, fetchProductAttribute, fetchAllAttributeCategory, mode, match } = this.props;
    fetchAllAttributeCategory();
    // 更新模式
    if (mode === 'update') {
      changeLoading(true);
      fetchProductAttribute(match.params.id);
    }
  }

  createProductAttributeCategoryList() {
    const { productAttributeCategoryList } = this.props;
    return productAttributeCategoryList.map(productAttributeCategory =>
      <Option key={productAttributeCategory.id} value={productAttributeCategory.id}>{productAttributeCategory.name}</Option>)
  };

  createFormInput(form) {
    const { productAttrInfo } = this.props;
    const { getFieldDecorator } = form;
    const {
      name, productAttributeCategoryId,
      filterType, searchType, relatedStatus, selectType, inputType, inputList,
      handAddStatus, sort
    } = productAttrInfo;
    return (
      <div>
        <Form.Item {...formItemLayout} label="属性名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '[属性名称]不能为空',
              },
            ],
            initialValue: name
          })(<Input placeholder="属性名称" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="商品类型">
          {getFieldDecorator('productAttributeCategoryId', {
            initialValue: productAttributeCategoryId
          })(
            <Select placeholder="商品类型" style={{ width: '100%' }}>
              {this.createProductAttributeCategoryList()}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="分类筛选样式">
          {getFieldDecorator('filterType', {
            initialValue: filterType
          })(
            <Radio.Group>
              <Radio value={0}>普通</Radio>
              <Radio value={1}>颜色</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="能否进行检索">
          {getFieldDecorator('searchType', {
            initialValue: searchType
          })(
            <Radio.Group>
              <Radio value={0}>不需要检索</Radio>
              <Radio value={1}>关键字检索</Radio>
              <Radio value={2}>范围检索</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="商品属性关联">
          {getFieldDecorator('relatedStatus', {
            initialValue: relatedStatus
          })(
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="属性是否可选">
          {getFieldDecorator('selectType', {
            initialValue: selectType
          })(
            <Radio.Group>
              <Radio value={0}>唯一</Radio>
              <Radio value={1}>单选</Radio>
              <Radio value={2}>复选</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="属性值的录入方式">
          {getFieldDecorator('inputType', {
            initialValue: inputType
          })(
            <Radio.Group>
              <Radio value={0}>手工录入</Radio>
              <Radio value={1}>从下面列表中选择</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="属性值可选值列表">
          {getFieldDecorator('inputList', {
            initialValue: inputList
          })(
            <TextArea autosize />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="是否支持手动新增">
          {getFieldDecorator('handAddStatus', {
            initialValue: handAddStatus
          })(
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="排序属性">
          {getFieldDecorator('sort', {
            initialValue: sort
          })(
            <InputNumber min={0} />
          )}
        </Form.Item>
      </div>
    );
  }

  componentWillUnmount() {
    const { clearState } = this.props;
    clearState('productAttrInfo', {});
  }

  submitForm = (e) => {
    const { createProductAttribute, updateProductAttribute, mode, productAttrInfo, history } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      this.setState({
        submiting: true
      });
      try {
        if (!err) {
          const val = { ...values };
          const inputList = values.inputList.replace(/\n/g, ',');
          val.inputList = inputList;
          // 更新
          if (mode === 'update') {
            await updateProductAttribute({ ...productAttrInfo, ...val });
            history.goBack();
          } else {
            // 新增
            await createProductAttribute({ ...val });
          }
        }
      } finally {
        this.setState({
          submiting: false
        });
      }
    });
  }

  render() {
    const { submiting } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={loading}>
        <Form onSubmit={this.submitForm}>
          {this.createFormInput(this.props.form)}
          <Form.Item {...formTailLayout}>
            <Button htmlType="submit" type="primary" loading={submiting}>提交</Button>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}

const store = (state) => {
  const { loading, productAttrInfo: inProductAttrInfo, productAttributeCategoryList } = state.pms;
  let inputList = inProductAttrInfo.inputList;
  if (inProductAttrInfo.inputList) {
    inputList = inputList.replace(/,/g, '\n')
  }
  const productAttrInfo = {
    ...inProductAttrInfo,
    inputList
  };
  return { loading, productAttrInfo, productAttributeCategoryList };
}

const connectedEditProductAttr = connect(store, actions)(EditProductAttr);
const WrappedEditProductAttr = Form.create({ name: 'editproductattr' })(connectedEditProductAttr);
export default WrappedEditProductAttr;
