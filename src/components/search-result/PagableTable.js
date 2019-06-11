import React from 'react';
import { Table, Divider, Tag } from 'antd';
import classnames from 'classnames';
import Pagination from '../pagination';

function PagableTable({ data = {}, columns = [], className, pagination: inPagination, onChangePage }) {
  let dataSource = [];
  const pagination = { total: 0, current: 1, pageSize: 10 };
  if (data) {
    const { list } = data;
    Object.assign(pagination, {
      total: data.total,
      pageSize: data.pageSize,
      current: data.current,
    });
    dataSource = list;
  }
  if (inPagination) {
    Object.assign(pagination, inPagination);
  }
  return (
    <div className={classnames('searchResult', className)}>
      <Table
        columns={columns} dataSource={dataSource}
        pagination={false}></Table>
      <Pagination {...pagination} onChange={onChangePage} />
    </div>
  );
}

export { PagableTable };
