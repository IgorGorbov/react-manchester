import React from 'react';
import { Switch } from 'react-router-dom';

import Layout from './hoc/Layout';
import Home from './components/home';
import SignIn from './components/signin';
import Team from './components/team';
import MatchesList from './components/matches';
import Page404 from './components/ui/Page404';

import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches';
import EditMatch from './components/admin/matches/EditMatch';
import AdminPlayers from './components/admin/players';
import EditPlayer from './components/admin/players/EditPlayer';

import PrivateRoute from './components/authRoutes/privateRoute';
import PublicRoute from './components/authRoutes/publicRoute';

const Routes = props => (
  <Layout>
    <Switch>
      <PrivateRoute
        {...props}
        exact
        path="/admin-players/edit"
        component={EditPlayer}
      />
      <PrivateRoute
        {...props}
        exact
        path="/admin-players/edit/:id"
        component={EditPlayer}
      />
      <PrivateRoute
        {...props}
        exact
        path="/admin-players"
        component={AdminPlayers}
      />
      <PrivateRoute
        {...props}
        exact
        path="/admin-matches/edit"
        component={EditMatch}
      />
      <PrivateRoute
        {...props}
        exact
        path="/admin-matches/edit/:id"
        component={EditMatch}
      />
      <PrivateRoute
        {...props}
        exact
        path="/admin-matches"
        component={AdminMatches}
      />
      <PrivateRoute {...props} exact path="/dashboard" component={Dashboard} />
      <PublicRoute
        {...props}
        restricted
        exact
        path="/sign-in"
        component={SignIn}
      />
      <PublicRoute
        {...props}
        restricted={false}
        exact
        path="/"
        component={Home}
      />
      <PublicRoute
        {...props}
        restricted={false}
        exact
        path="/team"
        component={Team}
      />
      <PublicRoute
        {...props}
        restricted={false}
        exact
        path="/matches"
        component={MatchesList}
      />
      <PublicRoute
        {...props}
        restricted={false}
        exact
        component={Page404}
      />
    </Switch>
  </Layout>
);

export default Routes;
