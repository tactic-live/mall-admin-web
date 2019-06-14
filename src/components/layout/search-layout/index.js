import React from 'react';
import QueryString from 'query-string';
import ConditionForm from '@/components/search-condition';
import { PagableTable } from '@/components/search-result';

import './index.less';

class SearchLayout extends React.Component {
  state = {
    // 当前查询条件对象
    curCond: {},
    // 当前分页对象
    curPagination: {},
    // 查询结果(数组)
    result: [],
    conditionFields: []
  }

  // componentWillMount() {
  //   const { location } = this.props;
  //   const defaultValues = QueryString.parse(location.search);
  //   const { current, pageSize, ...rest } = defaultValues;
  //   this.setState({
  //     curPagination: { current, pageSize },
  //     curCond: rest
  //   });
  // }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps', props);
    const { location } = props;
    const defaultValues = QueryString.parse(location.search);
    const { current, pageSize, ...rest } = defaultValues;
    return {
      ...state,
      curPagination: { current, pageSize },
      curCond: rest
    }
  }

  /**
   * 翻页
   *
   */
  onChangePage = (pageCond) => {
    const { curCond } = this.state;
    this.setState({
      curPagination: pageCond
    });
    this.onSearch({
      ...curCond,
      ...pageCond
    });
  }

  /**
   * 搜索
   */
  onSearch = (searchCond) => {
    const { history, match } = this.props;
    const { curPagination } = this.state;
    const condition = {
      ...curPagination,
      ...searchCond
    };
    this.setState({
      curCond: searchCond
    });
    // 设置路由
    history.push({
      path: match.path,
      search: `?${QueryString.stringify(condition)}`
    });
  }

  render() {
    const { curCond, curPagination, columns, result, conditionFields } = this.state;
    const pagination = {
      ...curPagination
    }
    return (
      <div className="search-layout">
        <ConditionForm className="search-layout-condition-form" fields={conditionFields}
          defaultValues={curCond}
          onSearch={this.onSearch}
        />
        <PagableTable
          // scroll={{ y: 640 }}
          className="search-layout-search-result"
          data={result}
          columns={columns}
          pagination={pagination}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

export default SearchLayout;
