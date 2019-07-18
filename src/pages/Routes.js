import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '../components/advance-route';


function Routes({ authKey }) {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" exact component={loadable(() => import('./Login'))} />
          <Redirect path="/" exact to="/home" />
          <PrivateRoute path="/:subPath/:subPath2?" component={loadable(() => import('./Main'))} />
          <Route path="/404" exact component={loadable(() => import('@/pages/404'))} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
