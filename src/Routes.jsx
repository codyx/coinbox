import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/screens/landing/Landing';
import Login from './components/screens/login/Login';

const routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/login" component={Login} />
    {/* Todo: add 404 component */}
  </Switch>
);

export default routes;
