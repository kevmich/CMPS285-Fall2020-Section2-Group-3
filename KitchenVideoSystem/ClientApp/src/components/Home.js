import React, { Component } from 'react';
import axios from 'axios';


export class Home extends Component {
  static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = { orders: []};
    }



  render () {
    return (
      <div>
            <h1>Hello, world!</h1>
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
