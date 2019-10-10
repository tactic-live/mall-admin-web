import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '@/components/advance-route';

function oms({ match, ...rest }) {
  console.log('oms', match, rest)

  return (
    <div>
      <Switch>
        <PrivateRoute
          exact
          path={`${match.path}/new`}
          component={loadable(() => import('./New'))}
          routeName="新品推荐"
        />
        <PrivateRoute exact path={`${match.path}/hot`} component={loadable(() => import('./Hot'))} routeName="人气推荐" />
        <PrivateRoute exact path={`${match.path}/advertise`} component={loadable(() => import('./Advertise'))} routeName="广告列表" />
        <PrivateRoute exact path={`${match.path}/addAdvertise`} component={loadable(() => import('./AddAdvertise'))} routeName="添加广告" />
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default oms;
