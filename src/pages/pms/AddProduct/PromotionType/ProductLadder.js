import React, { Fragment, useState, useEffect } from 'react';
import { Form, InputNumber, Table, Button } from 'antd';
import { uniqueId } from 'lodash'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};


/**
 * 阶梯价格
 */
const ProductLadder = (props, ref) => {
  console.log('DifferentialPrice props', props);
  const { productLadderList = [] } = props;
  // const { form, data = {} } = props;
  // const { getFieldDecorator } = form;
  const [extData, setExtData] = useState(() => {
    const val = productLadderList.map((productLadderInfo) => {
      const uid = uniqueId('i_');
      return {
        key: uid,
        ...productLadderInfo
      }
    })
    console.log('init state extData', val)
    return val;
  });
  console.log('DifferentialPrice extData', extData, productLadderList);
  // const defaultValues = {};
  // productLadderList.forEach(productLadderInfo => {
  //   defaultValues[productLadderInfo.memberLevelId] = productLadderInfo.memberPrice;
  // })

  function addRow(idx) {
    const { onChange } = props;
    const uid = uniqueId('t_');
    const datas = extData.slice(0, idx + 1).concat([{
      key: uid,
      count: 0,
      discount: 0.00,
      price: 0.00
    }]).concat(extData.slice(idx + 1, extData.length));
    setExtData(datas);
    onChange && onChange(datas);
  }

  function deleteRow(idx) {
    const { onChange } = props;
    const datas = [...extData];
    datas.splice(idx, 1);
    setExtData(datas);
    onChange && onChange(datas);
  }


  function onChange(key, value, index) {
    const { onChange } = props;
    const retVal = [...extData];
    retVal[index][key] = value;
    onChange && onChange(retVal);
  }

  const columns = [
    {
      title: '数量',
      dataIndex: 'count',
      render: (text, record, index) => {
        return <InputNumber defaultValue={text} precision={0} min={0} max={999} onChange={(val) => onChange('count', val, index)} />
      }
    },
    {
      title: '折扣',
      dataIndex: 'discount',
      render: (text, record, index) => {
        return <InputNumber defaultValue={text} precision={0} min={0} max={999} onChange={(val) => onChange('discount', val, index)} />
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      width: 100,
      render: (text, record, index) => {
        return (
          <span>
            <Button icon="minus" size="small" onClick={() => deleteRow(index)} />&nbsp;
            <Button icon="plus" size="small" onClick={() => addRow(index)} />
          </span>
        )
      }
    },
  ];
  const tableData = extData;

  return (
    <Fragment>
      <Table
        ref={ref}
        size="small"
        columns={columns}
        dataSource={tableData}
        pagination={false}
      ></Table>
    </Fragment>
  )
};

export default React.forwardRef(ProductLadder);
