import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';


export class Home extends Component {
  static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = { orders: []};
    }



  render () {
    return (
      <div>
            <NavLink tag={Link} to="/cashierscreen">Cashier</NavLink>
            <br></br>
            <NavLink tag={Link} to="/kitchenscreen">Kitchen</NavLink>
            <h2>{this.state.orders.timeOrdered}</h2>
            <ul>
                {this.state.orders.map(orders => <li>{orders.dateAdded}</li>)}
            </ul>


      </div>
      );
      
    }


    //async componentDidMount() {
    //    const response = await fetch('order');
    //    const data = await response.json();
    //    this.setState({ orders: data[0]});
    //}
    componentDidMount() {
        axios.get('order').then(res => {
            const orders = res.data;
            this.setState({ orders });
            })
        
    }
}
