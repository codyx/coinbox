import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../components/screens/landing/Landing';
import Login from '../components/screens/login/Login';
import NoRouteMatch from '../components/NoRouteMatch';

const routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/login" component={Login} />
    <Route path="*" component={NoRouteMatch} />
  </Switch>
);

export default routes;
