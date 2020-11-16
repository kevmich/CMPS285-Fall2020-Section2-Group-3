import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import './KitchenScreen.css'
import axios from 'axios';
import hamburgerIcon from '../content/hamburger-solid.png';
import cheeseburgerIcon from '../content/cheeseburger-solid.png';
import nuggiesIcon from '../content/nuggets.png';
import corndogIcon from '../content/corn-dog.png';
import pretzelIcon from '../content/pretzel.png';
import smalldrinkIcon from '../content/drink-small.png';
import mediumdrinkIcon from '../content/drink-medium.png';
import largedrinkIcon from '../content/drink-large.png';
import hotdogIcon from '../content/hotdog-solid.png'
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
            RecallGuidArray: [],
            RecallOrder: [],
            RecallTime: null,
            visible: false,
            user: (JSON.parse(sessionStorage.getItem("user")))
        };
    }

    componentDidMount() {
        this.updateScreen();
        this.interval = setInterval(() => this.updateScreen(), 500);
        document.title = "Kitchen Screen";

    }

    updateScreen() {
        axios.get('api/kitchen/getunfinishedorders', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response.data);
                this.setState({ Orders: response.data})
            });
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
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
                url: 'api/kitchen/FinishOrder',
                data: "\"" + guid + "\""
            })
            this.state.RecallGuidArray.push(guid);
            this.setState({ RecallGuid: guid });
        }
        this.updateScreen();
    }

    CountSame(itemName, itemSize, guid, deleted) {
        var number = 0;
        this.state.Orders.forEach((Order) => {
            if (Order.name == itemName && Order.size == itemSize && Order.orderNumber == guid && Order.isDeleted == deleted)
                number++;
        });
        if (number > 1)
            return number;
        else
            return null;
    }

    CountSameRecall(itemName, itemSize, guid, deleted) {
        var number = 0;
        this.state.RecallOrder.forEach((Order) => {
            if (Order.name == itemName && Order.size == itemSize && Order.orderNumber == guid && Order.isDeleted == deleted)
                number++;
        });
        if (number > 1)
            return number;
        else
            return null;
    }

    GetSecondsFrom(date) {
        if (date != -1) {
            var d = new Date(date);
            var currentDate = new Date();
            var time = Math.floor((currentDate - d) / 1000);
            if (time < 999)
                return time;
            else
                return 999;
        } else {
            return;
        }
        
    }


    renderObject() {
        let uniqueNames = new Set();
        
        return Object.entries(_.groupBy(this.state.Orders, 'orderNumber')).map(([key, value], i) => {
            return (
                <div class="AllGroupOrder" onClick={() => this.serveOrder(key, value[0].isComplete)}>
                    <div class="GroupOrder" id={value[0].isComplete ? "completeOrders" : "incompleteOrders"} key={key}>
                        {value.filter((x) => {
                            //console.log(x.name + x.size + (x.isDeleted ? 1 : 0) + x.orderNumber);
                            if (uniqueNames.has(x.name + x.size + (x.isDeleted ? 1 : 0) + x.orderNumber))
                                return false;
                            else {
                                uniqueNames.add(x.name + x.size + (x.isDeleted ? 1 : 0) + x.orderNumber);
                                return true;
                            }
                        })
                            .map((Order) => (
                                <p class={Order.isDeleted ? "kitchenDeletedOrder" : null}>&nbsp;{this.iconSwitch(Order.orderItemId)}{this.iconSwitchDrink(Order.size)}&nbsp;
                                    {this.CountSame(Order.name, Order.size, Order.orderNumber, Order.isDeleted)}&nbsp;{this.sizeSwitch(Order.size)}{Order.name}<br /></p>       
                            ))}
                    </div>
                    <div class={value[0].isComplete ? "CompleteText" : "IncompleteText"}>
                        <p class="BottomText"> {value[0].isComplete ? "COMPLETE" : "INCOMPLETE"}</p>
                        <p>{(this.GetSecondsFrom(value[0].dateStarted))}</p>
                    </div>
                </div>
            )
        })
    }

    render() {
        let uniqueRecall = new Set();

        if (!(this.state.user.permissionsArray.includes(2))) {
            return <Redirect to="/Home" />;
        }

        return (

            <div>
                <div id="KitchenScreenList">
                    <p>{this.renderObject()}</p>
                </div>
                <br />
                <br />
                <br />
                <div id="Clock">
                    <Clock />
                    &nbsp;<p class="clockUser">&nbsp;{this.state.user.username}</p>
                </div>
                <Link to="./">
                    <button class="BackButton">Back</button>
                </Link>
                {this.state.visible ? <div><div id="RecallDiv"> {this.state.RecallOrder.filter((x) => {
                    if (uniqueRecall.has(x.name + x.size + (x.isDeleted ? 1 : 0) + x.orderNumber))
                        return false;
                    else {
                        uniqueRecall.add(x.name + x.size + (x.isDeleted ? 1 : 0) + x.orderNumber);
                        return true;
                    }
                })
                    .map((Order) => (
                        <p class={Order.isDeleted ? "RecallDelete" : null} id={Order.isDeleted ? "RecallDelete" : null}>{this.iconSwitch(Order.orderItemId)}{this.iconSwitchDrink(Order.size)}&nbsp;{this.CountSameRecall(Order.name, Order.size, Order.orderNumber, Order.isDeleted)}&nbsp;{ this.sizeSwitch(Order.size)}{Order.name} < br /></p>
                    ))
                }
                    <div class="RecallNav">
                        <div class="RecallNavLeft">{(this.state.RecallGuidArray.indexOf(this.state.RecallGuid) != 0 && this.state.RecallGuidArray.length != 0) ?
                            <button class="RecallPreviousButton" onClick={() => {
                                this.state.RecallGuid = this.state.RecallGuidArray[this.state.RecallGuidArray.indexOf(this.state.RecallGuid) - 1];
                                axios.get('api/kitchen/getorder/' + this.state.RecallGuid, {
                                    headers: {
                                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                                    }
                                }).then((response) => {
                                    this.setState({
                                        RecallOrder: response.data,
                                        RecallTime: response.data[0].dateStarted
                                    })
                                }).catch((err) => {
                                    if (err.response.status == 400)
                                        this.setState({
                                            RecallTime: -1
                                        })
                                });
                            }}><FontAwesomeIcon icon={faCaretLeft} style={{ width: '100px' }} /></button> :
                            <button class="RecallPreviousNullButton"><FontAwesomeIcon icon={faCaretLeft} style={{ width: '100px' }} /></button>}</div>
                        <div class="RecallNavRight">{this.state.RecallGuidArray.indexOf(this.state.RecallGuid) != this.state.RecallGuidArray.length - 1 ?
                            <button class="RecallNextButton" onClick={() => {
                                this.state.RecallGuid = this.state.RecallGuidArray[this.state.RecallGuidArray.indexOf(this.state.RecallGuid) + 1];
                                axios.get('api/kitchen/getorder/' + this.state.RecallGuid, {
                                    headers: {
                                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                                    }
                                }).then((response) => {
                                    this.setState({
                                        RecallOrder: response.data,
                                        RecallTime: response.data[0].dateStarted
                                    })
                                }).catch((err) => {
                                    if (err.response.status == 400)
                                        this.setState({
                                            RecallTime: -1
                                        })
                                });
                            }}><FontAwesomeIcon icon={faCaretRight} style={{ width: '100px' }} /></button> :
                            <button class="RecallNextNullButton"><FontAwesomeIcon icon={faCaretRight} style={{ width: '100px' }} /></button>}</div>
                    </div>
                </div>
                    
                    <div class="RecallText">
                        <p>RECALL </p> <p class = "RecallSec">{this.GetSecondsFrom(this.state.RecallTime)} </p>
                    </div></div> : <div></div>}
                <button class="Recall" onClick={() => {
                    this.state.RecallGuid = this.state.RecallGuidArray[this.state.RecallGuidArray.length - 1];
                    axios.get('api/kitchen/getorder/' + this.state.RecallGuid, {
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then((response) => {
                        this.setState({
                            RecallOrder: response.data,
                            RecallTime: response.data[0].dateStarted
                        })
                    }).catch((err) => {
                        if (err.response.status == 400)
                        this.setState({
                            RecallTime: -1
                        })
                    });
                    this.setState({ visible: !this.state.visible });
                }} > Recall </button>
            </div>
        );
    }
}