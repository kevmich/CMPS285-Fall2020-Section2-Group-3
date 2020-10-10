import React, { Component } from 'react';
import './KitchenScreen.css'
import axios from 'axios';
import hamburgerIcon from '../content/hamburger-solid.svg';
import cheeseburgerIcon from '../content/cheeseburger-solid.svg';
import nuggiesIcon from '../content/nuggets.svg';
import corndogIcon from '../content/corn-dog.svg';
import pretzelIcon from '../content/pretzel.svg';
import smalldrinkIcon from '../content/drink-small.svg';
import mediumdrinkIcon from '../content/drink-medium.svg';
import largedrinkIcon from '../content/drink-large.svg';
import hotdogIcon from '../content/hotdog-solid.svg'
import Clock from 'react-digital-clock'
var _ = require('lodash');

export default class KitchenScreen extends Component {

    constructor(props) {
        super(props);
        this.updateScreen = this.updateScreen.bind(this);
        this.serveOrder = this.serveOrder.bind(this);
        this.state = {
            Orders: []
        };
    }
    
    componentDidMount() {
        this.updateScreen();
        this.interval = setInterval(() => this.updateScreen(), 1000);
        document.title = "Kitchen Screen";
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

    iconSwitch(param, param2) {
        switch (param) {
            case 1:
                return <img src={hamburgerIcon} class="CurrentIcon" height="47px" />
            case 2:
                return <img src={cheeseburgerIcon} class="CurrentIcon" height="47px" />;
            case 3:
                return <img src={nuggiesIcon} class="CurrentIcon" height="47px" />;
            case 4:
                return <img src={corndogIcon} class="CurrentIcon" height="47px" />;
            case 5:
                return <img src={hotdogIcon} class="CurrentIcon" height="47px" />;
            case 6:
                return <img src={pretzelIcon} class="CurrentIcon" height="47px" />;
            case 7:
                this.iconSwitchDrink(param2);
            default:
                return;
        }
    }

    iconSwitchDrink(param) {
        switch (param) {
            case 1:
                return <img src={smalldrinkIcon} class="CurrentIcon" width="40px" />;
            case 2:
                return <img src={mediumdrinkIcon} class="CurrentIcon" width="40px" />;
            case 3:
                return <img src={largedrinkIcon} class="CurrentIcon" width="40px" />;
            default:
                return;
        }
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

    serveOrder(guid, isComplete) {
        if (isComplete) {
            axios({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/api/orders/FinishOrder',
                data: "\"" + guid + "\""
            })
        }
        this.updateScreen();

    }
    //{ ordersArray = (_.groupBy(this.state.Orders, 'orderNumber')) }
    //{ console.log(this.state.Orders) }

    renderObject() {
        
        return Object.entries(_.groupBy(this.state.Orders, 'orderNumber')).map(([key, value], i) => {
            return (
                <div class="AllGroupOrder">
                    <div class="GroupOrder" id={value[0].isComplete ? "completeOrders" : "incompleteOrders"} key={key} onClick={() => this.serveOrder(key, value[0].isComplete)}>
                        {value.map((Order) => (
                            <p>{this.iconSwitch(Order.orderItemId)}{this.iconSwitchDrink(Order.size)}{this.sizeSwitch(Order.size)} {Order.name} <br /> </p>       
                        ))}

                    </div>
                    <div class={value[0].isComplete ? "CompleteText" : "IncompleteText"}>
                        <p> {value[0].isComplete ? "COMPLETE" : "INCOMPLETE"} </p>
                    </div>
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
                </div>
                <br />
                <br />
                <br />
                <div id="kitchenClock">
                    <Clock />
                </div>
            </div>
        );
    }
}