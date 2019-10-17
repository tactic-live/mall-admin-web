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

        <PrivateRoute
          exact
          path={`${match.path}/flash`}
          component={loadable(() => import('./Flash'))}
          routeName="秒杀活动列表"
        />
        <PrivateRoute
          exact
          path={`${match.path}/selectSession`}
          component={loadable(() => import('./SelectSession'))}
          routeName="秒杀时间段选择"
        />

        <PrivateRoute exact path={`${match.path}/hot`} component={loadable(() => import('./Hot'))} routeName="人气推荐" />
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default oms;
