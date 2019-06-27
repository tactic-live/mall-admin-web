import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '@/components/advance-route';
import actions from './action';

function pms({ match }) {
  return (
    <div>
      <Switch>
        <PrivateRoute path={`${match.path}/addGoods`} exact component={loadable(() => import('./AddGoods'))} />
        <PrivateRoute path={`${match.path}/goods`} exact component={loadable(() => import('./Goods'))} actions={actions} />
        <PrivateRoute path={`${match.path}/productAttr`} exact component={loadable(() => import('./ProductAttr'))} />
        <PrivateRoute path={`${match.path}/ProductAttrList`} exact component={loadable(() => import('./ProductAttrList'))} />
        <PrivateRoute path={`${match.path}/updateProductAttr/:id`} exact component={loadable(() => import('./EditProductAttr'))} />
        <PrivateRoute path={`${match.path}/addProductAttr`} exact component={loadable(() => import('./EditProductAttr'))} />
        <Route path="/" component={loadable(() => import('@/pages/404'))} />
      </Switch>
    </div>
  )
}

export default pms;
