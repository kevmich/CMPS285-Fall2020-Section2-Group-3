import React, { Component } from 'react';
import './KitchenScreen.css'
import axios from 'axios';

export default class KitchenScreen extends Component {
    constructor(props) {
        super(props);
        this.updateScreen = this.updateScreen.bind(this);
        this.state = {
            Orders: []
        };
    }
    
    componentDidMount() {
        this.updateScreen();
        this.interval = setInterval(() => this.updateScreen(), 1000);
    }

    updateScreen(){
        axios.get('/api/orders/getunfinishedorders')
            .then((response) => {
                console.log(response.data);
                this.setState({ Orders: response.data})

            });
    }
    finishAllOrders() {
        axios.get('/api/orders/finishallorders')

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /*pId(index) {
        var [] p = this.state.Orders;
        if (this.state.Orders.get(index).isComplete) {
            p = "completeOrders";
        }
        else {
            p = "incompleteOrders";
        }
        return p;
    }*/

    render() {
    
        return (
            <div>
               
                {this.state.Orders.map((Order) => (
                    <p id="completeOrders"> ID: {Order.orderItemId}  | GUID: {Order.orderNumber} | DATE: {Order.dateStarted} | COMPLETE: {String(Order.isComplete)} </p>
                ))}

                <button id="FinishOrders" onClick={this.finishAllOrders}> Finish All Orders </button>   

            </div>
            
            
        );
    }
}