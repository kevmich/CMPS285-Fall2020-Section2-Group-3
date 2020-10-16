import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';


export class Home extends Component {
    static displayName = Home.name;

    componentDidMount() {
        document.title = "Home";
    }

  render () {
    return (
      <div>
            <NavLink tag={Link} to="/cashierscreen">Cashier</NavLink>
            <br />
            <NavLink tag={Link} to="/kitchenscreen">Kitchen</NavLink>
            <br />
            <NavLink tag={Link} to="/login">Login</NavLink>
      </div>
      );
      
    }
}
