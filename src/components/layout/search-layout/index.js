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
    conditionFields: [],
    loading: true
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
    // 从props获取数据
    const { location, _result, loading } = props;
    const defaultValues = QueryString.parse(location.search);
    const { current, pageSize, ...rest } = defaultValues;
    const retVal = {
      ...state,
      curPagination: { current, pageSize },
      curCond: rest
    }
    if (_result) {
      retVal.result = _result;
    }
    if (loading !== undefined && loading !== null) {
      retVal.loading = loading;
    }
    return retVal;
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
    const { history, match, changeLoading } = this.props;
    const { curPagination } = this.state;
    const condition = {
      ...curPagination,
      ...searchCond
    };
    changeLoading && changeLoading(true);
    this.setState({
      curCond: searchCond
    });
    // 设置路由
    history.push({
      path: match.path,
      search: `?${QueryString.stringify(condition)}`
    });
  }

  /**
   * 不改变当前条件更新数据
   */
  reSearch = () => {
    const { history, location, match } = this.props;
    // 设置路由
    history.replace({
      path: match.path,
      search: location.search
    });
  }

  render() {
    // 从state获取数据
    const { curCond, curPagination, columns, result, conditionFields, loading, extActions } = this.state;
    const pagination = {
      ...curPagination
    }
    console.log('render state result', result);
    return (
      <div className="search-layout">
        <ConditionForm className="search-layout-condition-form" fields={conditionFields}
          defaultValues={curCond}
          onSearch={this.onSearch}
          extActions={extActions}
        />
        <PagableTable
          // scroll={{ y: 640 }}
          className="search-layout-search-result"
          data={result}
          columns={columns}
          pagination={pagination}
          onChangePage={this.onChangePage}
          loading={loading}
        />
      </div>
    );
  }
}

export default SearchLayout;
