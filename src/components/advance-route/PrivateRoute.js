import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, actions, ...rest }) => (
  <Route
    {...rest}
    // render={props => <RouteComponent {...props} id={id} />}
    render={(props) => {
      if (true) {
        return <RouteComponent {...actions} {...props} />;
      }
      return <div>请登录后使用</div>;
    }}
  />
);

export { PrivateRoute };
