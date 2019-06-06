import React, { useState, useEffect } from 'react';
import QueryString from 'query-string';
import Condition from './Condition';
import SearchResult from './SearchResult';

function Goods({ location, history, match }) {
  let params = new URLSearchParams(location.search);
  console.log(match, params.get('page'))
  // 搜索
  const onSearch = (searchCond) => {
    history.push({
      path: match.path,
      search: `?${QueryString.stringify(searchCond)}`
    });
  }

  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult([{
      key: 1
    }]);
  }, [])

  return (
    <div>
      <Condition onSearch={onSearch} />
      <SearchResult list={result} />
    </div>
  );
}

export default Goods;
