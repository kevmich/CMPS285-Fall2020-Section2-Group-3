import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';


export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
            <NavLink tag={Link} to="/cashierscreen">Cashier</NavLink>
            <br></br>
            <NavLink tag={Link} to="/kitchenscreen">Kitchen</NavLink>
      </div>
      );
      
    }
}
