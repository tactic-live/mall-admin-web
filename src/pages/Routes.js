import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '../components/advance-route';


function Routes({ authKey }) {
  return (
    <div>
      <Router>
        <Switch>
          <Redirect path="/" exact to="/login" />
          <Route path="/login" exact component={loadable(() => import('./Login'))} />
          <PrivateRoute path="/main" exact component={loadable(() => import('./Main'))} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
