import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '@/components/advance-route';

function oms({ match, ...rest }) {
  console.log('oms', match, rest)

  return (
    <div>
      <Switch>
        <PrivateRoute path={`${match.path}/order`} exact component={loadable(() => import('./Order'))} routeName="订单列表" />
        <PrivateRoute path={`${match.path}/orderSetting`} exact component={loadable(() => import('./OrderSetting'))} routeName="订单设置" />
        <PrivateRoute path={`${match.path}/returnReason`} exact component={loadable(() => import('./ReturnReason'))} routeName="退货原因设置" />
        <PrivateRoute path={`${match.path}/returnApplyDetail`} exact component={loadable(()=> import('./ReturnApplyDetail'))} routeName='退货原因详情' />
        <PrivateRoute path={`${match.path}/orderDetail/:id`} exact component={loadable(() => import('./OrderDetail'))} routeName="订单详情" />
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default oms;
