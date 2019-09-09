import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '@/components/advance-route';

function oms({ match, ...rest }) {
  console.log('oms', match, rest)

  return (
    <div>
      <Switch>
        <PrivateRoute path={`${match.path}/order`} exact component={loadable(() => import('./order'))} routeName="订单列表" />
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default oms;
