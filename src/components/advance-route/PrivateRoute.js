import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';


const BreadcrumbRoute = ({ children, parentRoute, ...rest }) => {
  const { path, routeName } = rest;
  const [route, setRoutes] = useState({ path, routeName, parentRoute });
  console.log('BreadcrumbRoute', route, rest)
  return React.cloneElement(children, { parentRoute: route });
}

const PrivateRoute = ({ component: RouteComponent, actions, ...rest }) => {

  return (
    <Route
      match
      {...rest}
      // render={props => <RouteComponent {...props} id={id} />}
      render={(props) => {
        console.log('match', rest, props)
        if (true) {
          return (
            <BreadcrumbRoute {...rest} >
              <RouteComponent {...actions} {...props} />
            </BreadcrumbRoute>
          );
        }
        return <div>请登录后使用</div>;
      }}
    />
  )
};

export { PrivateRoute };
