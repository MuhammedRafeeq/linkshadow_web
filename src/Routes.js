import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter,  Route,  Switch, Redirect} from "react-router-dom";

import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import Dashboard from './containers/Dashboard/Dashboard';

const Routes = () => (
  <BrowserRouter >
      <Switch>
        <Route exact path="/signup">
            <Signup />
        </Route>
        <Route exact path="/login">
            <Login />
        </Route>
        <Route exact path="/">
            <Dashboard />
        </Route>
      </Switch>
  </BrowserRouter>
);

export default Routes;