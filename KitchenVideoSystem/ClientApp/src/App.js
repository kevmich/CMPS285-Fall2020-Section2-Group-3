import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import  Login  from './components/Login';
import CashierScreen from './components/CashierScreen';
import KitchenScreen from './components/KitchenScreen';



import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/CashierScreen' component={CashierScreen} />
        <Route exact path='/KitchenScreen' component={KitchenScreen} />
      </div>
    );
  }
}
