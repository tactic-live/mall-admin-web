import React, { Fragment, useState } from 'react';
import { InputNumber, Table, Button } from 'antd';
import { uniqueId } from 'lodash'

/**
 * 阶梯价格
 */
const ProductFullReductionList = (props, ref) => {
  console.log('ProductFullReductionList props', props);
  const { productFullReductionList = [] } = props;
  const [extData, setExtData] = useState(() => {
    const val = productFullReductionList.map((productFullReductionInfo) => {
      const uid = uniqueId('i_');
      return {
        key: uid,
        ...productFullReductionInfo
      }
    })
    return val;
  });

  function addRow(idx) {
    const { onChange } = props;
    const uid = uniqueId('t_');
    const datas = extData.slice(0, idx + 1).concat([{
      key: uid,
      reducePrice: 0.00,
      fullPrice: 0.00
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
      title: '满',
      dataIndex: 'fullPrice',
      render: (text, record, index) => {
        return <InputNumber defaultValue={text} precision={2} min={0} max={999} onChange={(val) => onChange('fullPrice', val, index)} />
      }
    },
    {
      title: '立减',
      dataIndex: 'reducePrice',
      render: (text, record, index) => {
        return <InputNumber defaultValue={text} precision={2} min={0} max={999} onChange={(val) => onChange('reducePrice', val, index)} />
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

export default React.forwardRef(ProductFullReductionList);
