import React, { useEffect } from 'react';
import EditBrand from './EditBrand';


function route(props) {
  const { match } = props;
  const id = match.params.id;
  const mode = /updateBrand/.test(match.path) ? 'update' : 'add';
  if (mode === 'update' && id) {
    // 更新
    // useEffect(() => {

    // }, [id])
    return <EditBrand {...props} mode={mode} id={match.params.id} key={Math.random()}/>;
  }
  return <EditBrand {...props} mode={mode} id={match.params.id} key="add"/>;
}

export default route;
