import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '@/components/advance-route';

function pms({ match }) {
  return (
    <div>
      <Switch>
        <PrivateRoute path={`${match.path}/addGoods`} exact component={loadable(() => import('./AddGoods'))} />
        <PrivateRoute path={`${match.path}/goods`} exact component={loadable(() => import('./Goods'))} />
        <PrivateRoute path={`${match.path}/productAttr`} exact component={loadable(() => import('./ProductAttr'))} />
        <Route path="/" component={loadable(() => import('@/pages/404'))} />
      </Switch>
    </div>
  )
}

export default pms;
