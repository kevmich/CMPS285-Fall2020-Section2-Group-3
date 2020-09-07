import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = { orders: []};
    }

    componentDidMount() {
        this.populateOrderData();
    }


  render () {
    return (
      <div>
            <h1>Hello, world!</h1>
      </div>
      );
      
    }


    async populateOrderData() {
        const response = await fetch('order');
        const data = await response.json();
        this.setState({ orders: data});
    }
}
