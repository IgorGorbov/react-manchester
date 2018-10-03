import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ user, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      user ? <Component {...props} /> : <Redirect to="/sign-in" />
    }
  />
);
export default PrivateRoute;
