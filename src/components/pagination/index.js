import React from 'react';
import { Pagination as AntdPagination } from 'antd';
import './style.less';

function Pagination({ onChange, total = 0, current = 1, pageSize = 10, children, ...rest }) {
  if (typeof (pageSize) === 'string') {
    pageSize = parseInt(pageSize, 10);
  }
  if (typeof (current) === 'string') {
    current = parseInt(current, 10);
  }
  function onPageChange(page, pageSize) {
    onChange && onChange({
      current: page,
      pageSize
    });
  }

  function onShowSizeChange(current, size) {
    onPageChange(current, size)
  }

  const pagination = {
    total,
    current,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize,
    pageSizeOptions: ['5', '8', '10', '20', '30'],
    ...rest
  };

  if (children) {
    return React.cloneElement(children, {
      pagination,
      onChange: onPageChange
    });
  }
  console.log('pagination', pagination)

  return (
    <div className="pagination">
      <AntdPagination {...pagination} onChange={onPageChange} onShowSizeChange={onShowSizeChange} />
    </div>
  );
}

export default Pagination;
