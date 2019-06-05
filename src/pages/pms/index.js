import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

function pms({ match }) {
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/addGoods`} exact component={loadable(() => import('./AddGoods'))} />
        <Route path={`${match.path}/goods`} exact component={loadable(() => import('./Goods'))} />
      </Switch>
    </div>
  )
}

export default pms;
