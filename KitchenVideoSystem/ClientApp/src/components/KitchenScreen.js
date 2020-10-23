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
            Orders: [],
            RecallGuid: null,
            RecallOrder: [],
            visible: false
        };
    }

    componentDidMount() {
        this.updateScreen();
        this.interval = setInterval(() => this.updateScreen(), 1000);
        document.title = "Kitchen Screen";
    }

    updateScreen() {
        axios.get('/api/orders/getunfinishedorders')
            .then((response) => {
                console.log(response.data);
                this.setState({ Orders: response.data })
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
            this.setState({ RecallGuid: guid });
        }
        this.updateScreen();
    }

    renderObject() {
        return Object.entries(_.groupBy(this.state.Orders, 'orderNumber')).map(([key, value], i) => {
            return (
                <div class="AllGroupOrder" onClick={() => this.serveOrder(key, value[0].isComplete)}>
                    <div class="GroupOrder" id={value[0].isComplete ? "completeOrders" : "incompleteOrders"} key={key}>
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

                {this.state.visible ? <div><div id="RecallDiv"> {this.state.RecallOrder.map((Order) => (
                    <p>{this.iconSwitch(Order.orderItemId)}{this.iconSwitchDrink(Order.size)}{this.sizeSwitch(Order.size)} {Order.name} <br /> </p>
                ))}
                </div><div class="RecallText">
                        <p>RECALL</p>
                    </div></div> : <div></div>}

                <button class="Recall" onClick={() => {
                    axios.get('api/orders/getorder/' + this.state.RecallGuid, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then((response) => {
                        console.log(response.data);
                        this.setState({
                            RecallOrder: response.data
                        })
                    });
                    this.setState({ visible: !this.state.visible });
                }} > Recall </button>

            </div>
        );
    }
}