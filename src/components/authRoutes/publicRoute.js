import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ user, component: Component, restricted, ...rest }) => (
  <Route
    {...rest}
    component={props => {
      if (restricted) {
        return user ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} user={user} />
        );
      }
      return <Component {...props} user={user} />;
    }}
  />
);

export default PublicRoute;
