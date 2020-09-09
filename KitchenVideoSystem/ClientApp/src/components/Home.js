import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = { orders: []};
    }



  render () {
      console.log(this.state.orders[0])
    return (
      <div>
            <h1>Hello, world!</h1>
            <h2>{this.state.orders.timeOrdered}</h2>
            
      </div>
      );
      
    }


    async componentDidMount() {
        const response = await fetch('order');
        const data = await response.json();
        this.setState({ orders: data[0]});
    }
}
