import React from 'react';

function SearchResult({ list }) {
  return (
    <div>
      SearchResult
      {list.map(item => <div key={item.key}>f</div>)}
    </div>
  );
}

export default SearchResult;
