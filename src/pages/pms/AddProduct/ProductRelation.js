import React from 'react';
import { Button, Form, Transfer } from 'antd';
import FormLayout from '@/components/layout/form-layout';

class ProductRelation extends React.PureComponent {
  state = {
    targetKeys: []
  };

  componentDidMount() {
    this.onInit();
  }

  onInit = () => {
    const { fetchSubjectList } = this.props;
    fetchSubjectList();
  }

  prevStep = (e) => {
    const { prevStep } = this.props;
    prevStep && prevStep();
  }

  fields = (props) => [{
    name: 'subjectProductRelationList',
    label: '关联专题',
    rules: [],
    span: 16,
    render: (text) => {
      const { subjectList } = props;
      const { targetKeys } = this.state;
      const dataSource = [];
      subjectList.forEach((subject) => {
        const { id, title } = subject;
        dataSource.push({
          key: id,
          title,
          description: { subject: id }
        });
      })
      return (
        <Transfer
          showSearch
          dataSource={dataSource}
          titles={['待选择', '已选择']}
          targetKeys={targetKeys}
          // selectedKeys={selectedKeys}
          onChange={this.handleChange}
          // onSelectChange={this.handleSelectChange}
          // onScroll={this.handleScroll}
          render={item => item.title}
        />
      );
    }
  }];

  // 关联专题发生变化
  handleChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('handleChange', nextTargetKeys, direction, moveKeys);
    this.setState({ targetKeys: nextTargetKeys });
  }

  submitForm = (e) => {
    e.preventDefault();
    const { form, data, productInfo, onSubmit } = this.props;
    // const { current, tmpDatas } = this.state;

    // console.log('beforeSubmit', current, tmpDatas);
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }

      const subjects = [];
      const { subjectProductRelationList = [] } = values;
      subjectProductRelationList.forEach((subject) => {
        subjects.push({ subjectId: subject });
      });
      values.subjectProductRelationList = subjects;

      onSubmit && onSubmit(values);
    });
  }

  actions = [
    <Button type="primary" onClick={this.prevStep} key="btnPrev">上一步</Button>,
    <Button type="primary" onClick={this.submitForm} key="btnNext">提交</Button>
  ];

  render() {
    const fields = this.fields(this.props);
    return (
      <FormLayout actions={this.actions} fields={fields} {...this.props} />
    )
  }
}

const WrappedProductRelation = Form.create({ name: 'add.product.productAttr' })(ProductRelation)
export default WrappedProductRelation;

