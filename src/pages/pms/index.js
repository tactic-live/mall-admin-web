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
        <PrivateRoute path={`${match.path}/brand`} exact component={loadable(() => import('./Brand'))} routeName="品牌管理" />
        <PrivateRoute path={`${match.path}/addBrand`} exact component={loadable(() => import('./EditBrand'))} routeName="添加品牌" />
        <PrivateRoute path={`${match.path}/updateBrand/:id`} exact component={loadable(() => import('./EditBrand'))} routeName="编辑管理" />
        <PrivateRoute path={`${match.path}/addProduct`} exact component={loadable(() => import('./AddProduct'))} routeName="添加商品" />
        <PrivateRoute path={`${match.path}/goods`} exact component={loadable(() => import('./Goods'))} actions={actions} routeName="商品列表" />
        <PrivateRoute path={`${match.path}/productAttr`} exact component={loadable(() => import('./ProductAttr'))} routeName="商品类型列表" />
        <PrivateRoute path={`${match.path}/productAttrList`} exact component={loadable(() => import('./ProductAttrList'))} routeName="商品类型属性列表" />
        <PrivateRoute path={`${match.path}/updateProductAttr/:id`} exact component={loadable(() => import('./EditProductAttr'))} routeName="修改商品类型属性" />
        <PrivateRoute path={`${match.path}/addProductAttr/:id/:type`} exact component={loadable(() => import('./EditProductAttr'))} routeName="添加商品类型属性" />
        <PrivateRoute path={`${match.path}/productCate`} exact component={loadable(() => import('./ProductCate'))} routeName="商品分类" />
        <PrivateRoute path={`${match.path}/updateProductCate/:id`} exact component={loadable(() => import('./EditProductCate'))} routeName="修改商品分类" />
        <PrivateRoute path={`${match.path}/addProductCate`} exact component={loadable(() => import('./EditProductCate'))} routeName="添加商品分类" />
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default pms;
