import React from 'react';
import { Icon, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const routes = [
  {
    path: 'home',
    breadcrumbName: '首页',
  },
  {
    path: 'goods',
    breadcrumbName: '商品列表',
  },
];

function itemRender(route, params, routes, paths) {
  console.log('paths', paths, params)
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
      <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
    );
}

function BreadcrumbComp({ route }) {
  return (
    <div>
      <Breadcrumb itemRender={itemRender} routes={routes} route={route}></Breadcrumb>
    </div>
  )
}

export default BreadcrumbComp;
