import React from 'react';
import EditProductAttr from './EditProductAttr';


function route(props) {
  const { match } = props;
  const mode = /updateProductAttr/.test(match.path) ? 'update' : 'add';
  return <EditProductAttr {...props} mode={mode} />;
}

export default route;
