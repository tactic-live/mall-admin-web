import React, { useEffect } from 'react';
import EditProductCate from './EditProductCate';


function route(props) {
  const { match } = props;
  const id = match.params.id;
  const mode = /updateProductCate/.test(match.path) ? 'update' : 'add';
  if (mode === 'update' && id) {
    // 更新
    // useEffect(() => {

    // }, [id])
    return <EditProductCate {...props} mode={mode} id={match.params.id}/>;
  }
  return <EditProductCate {...props} mode={mode} id={match.params.id} key="add"/>;
}

export default route;
