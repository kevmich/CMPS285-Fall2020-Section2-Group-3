import React, { Component } from 'react';
import './KitchenScreen.css'
import axios from 'axios';
import Clock from 'react-digital-clock'
import { size } from 'lodash';
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
//                        { ordersArray = (_.groupBy(this.state.Orders, 'orderNumber')) }
//{ console.log(this.state.Orders) }
    //


    renderObject() {
        
        return Object.entries(_.groupBy(this.state.Orders, 'orderNumber')).map(([key, value], i) => {
            return (
                <div id="GroupOrder" key={key}>


                    {value.map((Order) => (
                        <div>{Order.name} </div>
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
        const Testing = _.groupBy(this.state.Orders, 'orderNumber');
        return (
            <div>

                <div id="kitchenClock">
                    <Clock />
                </div>

                <div id="KitchenScreenList">
                    <br />


                    <p>{this.renderObject()}</p>
  

                    <br/>
                    <button id="FinishOrders" onClick={this.finishAllOrders}> Serve Orders </button>
                </div>

            </div>
            
            
        );
    }
}