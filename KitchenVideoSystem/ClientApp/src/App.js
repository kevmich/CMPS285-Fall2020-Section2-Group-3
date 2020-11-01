import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import  Login  from './components/Login';
import CashierScreen from './components/CashierScreen';
import KitchenScreen from './components/KitchenScreen';
import Admin from './components/Admin';
import AddUser from './components/AddUser';
import './custom.css'
import ProtectedRoute from "./ProtectedRoute";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div>
            <Switch>
                <Route exact path='/Admin' component={Admin} />
                <Route exact path='/admin/AddUser' component={AddUser} />
            <ProtectedRoute path='/home'>
                <Route exact path='/home' component={Home} />
            </ProtectedRoute>

            <Route exact path='/' component={Login} />
            <ProtectedRoute path= "/CashierScreen">
                <Route exact path='/CashierScreen' component={CashierScreen} />
            </ProtectedRoute>
            <ProtectedRoute path="/KitchenScreen">
                <Route exact path='/KitchenScreen' component={KitchenScreen} />
            </ProtectedRoute>

                <Route render={() => <Redirect to="/" />} />
                </Switch>

      </div>
    );
  }
}
