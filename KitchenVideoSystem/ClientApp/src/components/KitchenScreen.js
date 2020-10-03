import React, { Component } from 'react';
import './KitchenScreen.css'
import axios from 'axios';
import Clock from 'react-digital-clock'
var _ = require('lodash');

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

    sizeSwitch(param) {
        switch (param) {
            case 1:
                return 'S. ';
            case 2:
                return 'M. ';
            case 3:
                return 'L. ';
            default:
                return;
        }
    }

    //{ ordersArray = (_.groupBy(this.state.Orders, 'orderNumber')) }
    //{ console.log(this.state.Orders) }

    renderObject() {
        
        return Object.entries(_.groupBy(this.state.Orders, 'orderNumber')).map(([key, value], i) => {
            return (
                <div class="GroupOrder" id={value[0].isComplete ? "completeOrders" : "incompleteOrders"} key={key}>
                    {value.map((Order) => (
                        <p>{this.sizeSwitch(Order.size)}{Order.name} <br /> </p>
                    ))}
                </div>
            )
        })
    }
    //                        {
    //    this.state.Orders.map((Order) => (
    //        <p id={Order.isComplete ? "completeOrders" : "incompleteOrders"}>{this.sizeSwitch(Order.size)}{Order.name} <br /> </p>
    //    ))
    //}


    render() {
        return (
            <div>
                <div id="KitchenScreenList">
                    <p>{this.renderObject()}</p>
                    <button id="FinishOrders" onClick={this.finishAllOrders}> Serve Orders </button>
                </div>
                <div id="kitchenClock">
                    <Clock />
                </div>
            </div>
        );
    }
}