import React, { Component } from 'react';
import './KitchenScreen.css'
import axios from 'axios';
import Clock from 'react-digital-clock'

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

    currentTime() {
        var date = new Date();
        var h = date.setHours();
        var m = date.setMinutes();
        var s = date.setSeconds();
        h = this.updateTime(h);
        m = this.updateTime(m);
        s = this.updateTime(s);
        return h + " : " + m + " : " + s;
    }

    updateTime(k) {
        if (k < 10)
            return "0" + k;
        else
            return k;
    }

    render() {
    
        return (
            <div>

                <div id="kitchenClock">
                    <Clock />
                </div>

                <div>
                    <br />
                    {this.state.Orders.map((Order) => (
                        <p id={Order.isComplete ? "completeOrders" : "incompleteOrders"}>{this.sizeSwitch(Order.size)}{Order.name} <br/> </p>
                    ))}
                    <br/>
                    <button id="FinishOrders" onClick={this.finishAllOrders}> Serve Complete Orders </button>
                </div>

            </div>
            
            
        );
    }
}