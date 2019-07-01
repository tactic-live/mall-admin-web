import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '@/components/advance-route';
import actions from './action';

function pms({ match, ...rest }) {
  console.log('pms', match, rest)

  return (
    <div>
      <Switch>
        <PrivateRoute path={`${match.path}/addGoods`} exact component={loadable(() => import('./AddGoods'))} routeName="添加商品"/>
        <PrivateRoute path={`${match.path}/goods`} exact component={loadable(() => import('./Goods'))} actions={actions} routeName="商品列表"/>
        <PrivateRoute path={`${match.path}/productAttr`} exact component={loadable(() => import('./ProductAttr'))} routeName="商品类型列表"/>
        <PrivateRoute path={`${match.path}/productAttrList`} exact component={loadable(() => import('./ProductAttrList'))} routeName="商品类型属性列表"/>
        <PrivateRoute path={`${match.path}/updateProductAttr/:id`} exact component={loadable(() => import('./EditProductAttr'))} routeName="商品类型属性编辑"/>
        <PrivateRoute path={`${match.path}/addProductAttr/:id/:type`} exact component={loadable(() => import('./EditProductAttr'))} routeName="商品类型属性添加"/>
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default pms;
