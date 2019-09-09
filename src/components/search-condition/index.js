import React from 'react';
import { Form, Button, Input, Row, Col, Icon, Radio, Select, DatePicker } from 'antd';
import classnames from 'classnames';
import moment from 'moment';

import './index.less';

const { RangePicker } = DatePicker;
const { Group: RadioGroup } = Radio;
const { Option } = Select;


// function getFields(form, fields, defaultValues = {}) {
//   const { getFieldDecorator } = form;
//   let children = [];
//   function createField(field) {
//     const { label, name, placeholder, type } = field;
//     return (
//       <Col span={8} key={name}>
//         <Form.Item label={label}>
//           {getFieldDecorator(`${name}`, {
//             initialValue: defaultValues[name]
//           })(<Input placeholder={(placeholder || label)} />)}
//         </Form.Item>
//       </Col>
//     );
//   }

//   if (fields) {
//     children = fields.map((field) => {
//       return createField(field);
//     })
//   }
//   return children;
// }


class SearchCondition extends React.PureComponent {

  colCount = 0;
  state = {
    hideExtCond: true
  }

  onSubmit = (e) => {
    const { onSearch, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const { current } = values;
      if (!current) {
        values.current = 1;
      }
      onSearch && onSearch(values);
    });
  }

  getFields = (form, fields, defaultValues = {}) => {
    const { hideExtCond } = this.state;
    const children = [];
    const { getFieldDecorator } = form;
    this.colCount = 0;
    fields && fields.forEach((fieldDefine) => {
      // format是moment的format格式
      const {
        name, placeholder, label, type, options, span = 6, initialValue, params, showTime,
        format = 'YYYY-MM-DD', helper, render
      } = fieldDefine;
      this.colCount += span;
      let FormItem = null;
      let formItemType = 'normal';
      // 超过两行
      let hideExtCondClassName = '';
      if (hideExtCond && this.colCount > 48) {
        hideExtCondClassName = 'hiddenExtCond';
      }
      // 存在render方法, 直接使用render方法, 并注入form, 与字段定义
      if (render && typeof (render) === 'function') {
        children.push(
          <Col span={span} key={name} className={hideExtCondClassName}>
            {render(getFieldDecorator, fieldDefine, form)}
          </Col>
        );
        return;
      }
      switch (type) {
        case 'radio':
          FormItem = (
            <RadioGroup>
              {options.map(({ label: optionsLabel, value }) => <Radio key={value} value={value}>{optionsLabel}</Radio>)}
            </RadioGroup>
          );
          break;
        case 'select':
          FormItem = (
            <Select placeholder="全部" getPopupContainer={triggerNode => triggerNode.parentNode} >
              {options.map(({ label: optionsLabel, value }) =>
                <Option key={value} value={value}>{optionsLabel}</Option>)}
            </Select>
          );
          break;
        case 'range-picker':
          FormItem = (
            <RangePicker format={format} />
          );
          formItemType = 'date-picker';
          break;
        case 'range-time-picker':
          FormItem = (
            <RangePicker showTime={showTime} format={format} />
          );
          formItemType = 'date-picker';
          break;
        case 'date-picker':
          FormItem = (
            <DatePicker format={format} />
          );
          formItemType = 'date-picker';
          break;
        // case 'GOODS_INPUT':
        //   FormItem = <GoodsInput placeholder={label} />;
        //   break;
        // case 'SKU_INPUT':
        //   FormItem = <SkuInput placeholder={label} />;
        //   break;
        // case 'INPUTCODE_INPUT':
        //   FormItem = <InputCode params={params} placeholder={label} />;
        //   break;
        // case 'SIGNER_INPUT':
        //   FormItem = <SignerInput placeholder={label} />;
        //   break;
        // case 'WAREHOUSE_INPUT':
        //   FormItem = <WarehouseInput placeholder={label} />;
        //   break;
        // case 'OUTPUTCODE_INPUT':
        //   FormItem = <OutputCode placeholder={label} />;
        //   break;
        case 'CHANGE_SELECT':
          FormItem = (
            <Select
              placeholder="全部"
              getPopupContainer={triggerNode => triggerNode.parentNode}
              onChange={e => this.handleOuputChange(e, 'outputType')}
            >
              {options.map(({ label: optionsLabel, value }) =>
                <Option key={value} value={value}>{optionsLabel}</Option>)}
            </Select>
          );
          break;
        case 'CHANGE_SELECT_PURCHASE':
          FormItem = (
            <Select
              placeholder="全部"
              getPopupContainer={triggerNode => triggerNode.parentNode}
              onChange={e => this.handleOuputChange(e, 'purchaseType')}
            >
              {options.map(({ label: optionsLabel, value }) =>
                <Option key={value} value={value}>{optionsLabel}</Option>)}
            </Select>
          );
          break;
        case 'CHANGE_SELECT_INPUTTYPE':
          FormItem = (
            <Select
              placeholder="全部"
              getPopupContainer={triggerNode => triggerNode.parentNode}
              onChange={e => this.handleInputChange(e, 'inputType')}
            >
              {options.map(({ label: optionsLabel, value }) =>
                <Option key={value} value={value}>{optionsLabel}</Option>)}
            </Select>
          );
          break;
        default:
          FormItem = <Input placeholder={placeholder || label} allowClear />;
          // helper
          if (helper) {
            // FormItem = <BizAutoComplete helper={helper}><Input placeholder={label} /></BizAutoComplete>;
          }
          break;
      }
      if (!FormItem) {
        return;
      }
      children.push(
        <Col span={(span || 6)} key={name} className={hideExtCondClassName}>
          <Form.Item label={label}>
            {getFieldDecorator(name, {
              initialValue: (initialValue || defaultValues[name]),
              normalize(value) {
                if (formItemType === 'date-picker') {
                  if (Array.isArray(value)) {
                    return value.map(item => moment(item));
                  }
                  if (value) {
                    return moment(value);
                  }
                }
                return value;
              }
            })(FormItem)}
          </Form.Item>
        </Col>
      );
    });
    return children;
  }

  handleReset = () => {
    const { onSearch} = this.props;
    this.props.form.resetFields();
    onSearch && onSearch({});
  }



  render() {
    const { fields, form, defaultValues, className, extActions } = this.props;
    const conditionActionsElem = fields.length ? (
      <div>
        {extActions}
        <Button type="default" className="action-item" onClick={this.handleReset}>重置</Button>
        <Button htmlType="submit" type="primary" className="action-item">查询</Button>
      </div>
    ) : extActions;
    // const extActionsElem = extActions;
    // if (extActions) {
    //   extActionsElem = extActions;
    // }
    return (
      <Form onSubmit={this.onSubmit} className={classnames('conditionForm', className)}>
        <Row gutter={24} className="conditionActionsRow">
          <Col span={12}><Icon type="search" /> 筛选搜索</Col>
          <Col span={12} className="conditionActions">
            {conditionActionsElem}
            {/* {extActionsElem} */}
          </Col>
        </Row>
        <Row gutter={24}>{this.getFields(form, fields, defaultValues)}</Row>
      </Form >
    );
  }
}

const WrappedConditionForm = Form.create({ name: 'condition_search' })(SearchCondition);
export default WrappedConditionForm;
