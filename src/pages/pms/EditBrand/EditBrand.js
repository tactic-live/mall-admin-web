import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Spin, Radio, InputNumber, message } from 'antd';
import FormUpload from '@/components/form-upload';
import { actions } from './action';

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
class EditBrand extends React.PureComponent {

  componentDidMount() {
    const { id, fetchBrandById } = this.props;
    console.log('EditBrand componentDidMount');
    if (id) {
      fetchBrandById(id);
    }
  }

  componentWillUnmount() {
    const { clearState } = this.props;
    clearState('brandInfo', {});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { id, mode, addBrand, updateBrand } = this.props;
      if (err) {
        return;
      }
      let { logoItem, bigPicItem, ...rest } = values;
      if (typeof (logoItem) === 'string') {
        logoItem = { url: logoItem };
      }
      logoItem = logoItem || {};
      if (typeof (bigPicItem) === 'string') {
        bigPicItem = { url: bigPicItem };
      }
      bigPicItem = bigPicItem || {};
      const brandInfo = { id, ...rest, logo: logoItem.url, bigPic: bigPicItem.url };
      console.log('onSubmit brandInfo', brandInfo, values)
      if (id && mode === 'update') {
        updateBrand(brandInfo);
        message.success(`品牌[${brandInfo.name}] 更新成功.`);
      } else {
        addBrand(brandInfo);
        message.success(`品牌[${brandInfo.name}] 添加成功.`);
      }
    })
  }
  /**
   * 创建表单输入元素
   */
  createInputFormItem = () => {
    const { id, form, brandInfo } = this.props;
    const {
      name, firstLetter, logo, bigPic, brandStory, factoryStatus = 0,
      sort = 0, showStatus = 0
    } = brandInfo;
    const { getFieldDecorator } = form;
    const logoDefaultFileList = [];
    if (logo) {
      logoDefaultFileList.push({
        uid: id,
        name: (logo || '').split('/').pop(),
        status: 'done',
        url: logo,
        thumbUrl: logo
      })
    }
    const bigPicDefaultFileList = [];
    if (bigPic) {
      bigPicDefaultFileList.push({
        uid: id,
        name: (bigPic || '').split('/').pop(),
        status: 'done',
        url: bigPic,
        thumbUrl: bigPic
      })
    }
    return (
      <div>
        <Form.Item {...formItemLayout} label="品牌名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '[品牌名称]不能为空',
              },
            ],
            initialValue: name
          })(<Input placeholder="品牌名称" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="品牌首字母">
          {getFieldDecorator('firstLetter', {
            rules: [],
            initialValue: firstLetter
          })(<Input placeholder="品牌首字母" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="品牌LOGO">
          {getFieldDecorator('logoItem', {
            rules: [
              {
                required: true,
                message: '[品牌LOGO]不能为空',
              },
            ],
            initialValue: logo
          })(<FormUpload defaultFileList={logoDefaultFileList} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="品牌专区大图">
          {getFieldDecorator('bigPicItem', {
            rules: [],
            initialValue: bigPic
          })(<FormUpload defaultFileList={bigPicDefaultFileList} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="品牌故事">
          {getFieldDecorator('brandStory', {
            rules: [],
            initialValue: brandStory
          })(<Input.TextArea placeholder="品牌故事" />)}
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
        <Form.Item {...formItemLayout} label="品牌制造商">
          {getFieldDecorator('factoryStatus', {
            rules: [],
            initialValue: factoryStatus
          })(
            <Radio.Group placeholder="品牌制造商" >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
      </div>
    )
  }

  componentDidUpdate(){
    console.log('EditBrand componentDidUpdate');
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
  const { brandInfo, loading } = state.pms;
  return { brandInfo, loading };
}

const connEditBrand = connect(store, actions)(EditBrand);
const WrappedFormEditBrand = Form.create({ name: 'editBrand' })(connEditBrand);
export default WrappedFormEditBrand;
