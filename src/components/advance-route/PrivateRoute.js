import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => (
  <Route
    {...rest}
    // render={props => <RouteComponent {...props} id={id} />}
    render={(props) => {
      if (true) {
        return <RouteComponent {...props} />;
      }
      return <div>请登录后使用</div>;
    }}
  />
);

export { PrivateRoute };
