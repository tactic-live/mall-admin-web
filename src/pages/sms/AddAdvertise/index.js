import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Select, DatePicker, Radio } from 'antd';
import FormLayout from '@/components/layout/form-layout';
import FormUpload from '@/components/form-upload';
import { actions } from './action';
import './index.less';

const { Option } = Select;

class AddAdvertise extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      picList: []
    };
  }
  fields = [
    {
      name: 'name',
      label: '广告名称',
      rules: [
        {
          required: true,
          message: '请输入广告名称',
        }
      ]
    },
    {
      name: 'type',
      label: '广告位置',
      render: () => {
        return (
          <Select>
            <Option value={0} key={0}>PC首页轮播</Option>
            <Option value={1} key={1}>app首页轮播</Option>
          </Select>
        )
      }
    },
    {
      name: 'startTime',
      label: '开始时间',
      rules: [
        {
          required: true,
          message: '请选择开始时间',
        }
      ],
      render: () => {
        return (
          <DatePicker />
        )
      }
    },
    {
      name: 'endTime',
      label: '到期时间',
      rules: [
        {
          required: true,
          message: '请选择到期时间',
        }
      ],
      render: (text) => {
        return (
          <DatePicker />
        )
      }
    },
    {
      name: 'status',
      label: '上线/下线',
      render: () => {
        return (
          <Radio.Group>
            <Radio value={0}>下线</Radio>
            <Radio value={1}>上线</Radio>
          </Radio.Group>
        )
      }
    },
    {
      name: 'picFile',
      label: '广告图片',
      render: () => {
        const { picList } = this.state;
        return (
          <FormUpload
            listType="picture-card"
            fileList={picList}
            maxLength={1}
            onChange={({ file, fileList }) => {
              this.setState({ picList: fileList });
            }}
          />
        )
      }
    },
    {
      name: 'sort',
      label: '排序'
    },
    {
      name: 'url',
      label: '广告链接',
      rules: [
        {
          required: true,
          message: '请输入广告链接',
        }
      ]
    },
    {
      name: 'note',
      label: '广告备注',
      placeholder: '请输入内容'
    }
  ];
  actions = [
    <Button className='btn-submit-wrap' type="primary" onClick={(e) => { this.submitForm(e) }} key="btnSubmit">提交</Button>,
    <Button type="primary" onClick={(e) => { this.resetForm(e) }} key="btnReset">重置</Button>
  ];
  defaultValues = {
    name: '',
    type: 0,
    status: 0,
    sort: 0,
    url: ''
  }

  componentDidMount() {

  }

  submitForm = (e) => {
    e.preventDefault();
    const { form, addAdvertise } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      // console.log('submit values', values)
      if (err) {
        return;
      }
      const { picFile, note, endTime, type, name, sort, startTime, status, url } = values;
      addAdvertise({
        name,
        type,
        pic: (picFile && picFile.file && picFile.file.url) || '',
        startTime,
        endTime,
        status,
        url,
        note,
        sort
      });
    })
  }

  resetForm = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.resetFields();
  }

  render() {
    // console.log('this.fields', this.fields)
    return (
      <FormLayout
        actions={this.actions}
        {...this.props}
        defaultValues={this.defaultValues}
        fields={this.fields}
      />
    )
  }
}

const store = () => { }
const WrappedAddAdvertise = Form.create({ name: 'add.advertise' })(AddAdvertise)
export default connect(store, actions)(WrappedAddAdvertise);
