import React from 'react';
import { Cascader, Button, message } from 'antd';

import './CascaderList.less';

class CascaderList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      valueList: props.valueList || props.defaultValueList || []
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('valueList' in nextProps) {
      return {
        valueList: nextProps.valueList || [],
      };
    }
    return null;
  }

  onChange = (value, selectedOptions, index) => {
    console.log('CascaderList onChange', value, selectedOptions)
    const { onChange, valueList } = this.props;
    const tmpValueList = valueList.concat();

    tmpValueList[index] = value;

    onChange([...tmpValueList], selectedOptions, index)
  }

  delCascader = (index) => {
    const { onChange, valueList } = this.props;
    if (valueList.length === 1) {
      message.warn('[筛选属性] 不能少于一个')
      return;
    }
    const tmpValueList = valueList.concat();
    tmpValueList.splice(index, 1);
    onChange([...tmpValueList], {}, index)
  }

  addCascader = () => {
    const { onChange, valueList } = this.props;
    const tmpValueList = valueList.concat();
    onChange([...tmpValueList, []], {}, valueList.length)
  }

  render() {
    const { options, onChange, valueList = [], ...rest } = this.props;
    console.log('CascaderList data', valueList, this.props);
    if (valueList.length === 0) {
      valueList.push([])
    }
    const listElem = valueList.map((item, index, data) => {
      const perInitValue = valueList.length > index ? valueList[index] : [];
      console.log('CascaderList perInitValue', perInitValue)
      return (
        <div className="cascader-list-item" key={`cascaderList_${index}`}>
          <Cascader
            onChange={(...args) => {
              this.onChange(...args, index)
            }}
            options={options}
            placeholder="请选择"
            defaultValue={perInitValue}
            value={perInitValue}
          // {...rest}
          />
          <Button type="ghost" onClick={() => this.delCascader(index)}>删除</Button>
        </div>
      );
    });
    return (
      <div className="cascader-list">
        {listElem}
        <Button type="primary" onClick={this.addCascader}>增加</Button>
      </div>
    )
  }
}

export default CascaderList;
