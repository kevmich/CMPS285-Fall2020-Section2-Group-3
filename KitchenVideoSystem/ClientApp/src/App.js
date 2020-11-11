import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import  Login  from './components/Login';
import CashierScreen from './components/CashierScreen';
import KitchenScreen from './components/KitchenScreen';
import Admin from './components/ManageUsers';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import './custom.css'
import ProtectedRoute from "./ProtectedRoute";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div>
            <Switch>
                <Route exact path='/ManageUsers' component={Admin} />
                <Route exact path='/ManageUsers/AddUser' component={AddUser} />
                <Route exact path='/ManageUsers/EditUser' component={EditUser} />
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
