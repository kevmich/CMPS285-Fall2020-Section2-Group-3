import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './CashierScreen.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'

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

const checksquareIcon = <FontAwesomeIcon icon={faCheckSquare} />


export default class CashierScreen extends Component {
    constructor(props) {
        super(props);
        this.CompleteOrder = this.CompleteOrder.bind(this);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.setUnfinishedGuid = this.setUnfinishedGuid.bind(this);
        this.UpdateSelected = this.UpdateSelected.bind(this);
        this.DeleteOrder = this.DeleteOrder.bind(this);
        this.state = {
            OrderNumber: uuidv4(),
            Orders: [],
            time: new Date(),
            selectedOrder: null,

        };
    }
    componentDidMount() {
        this.setUnfinishedGuid();
        setTimeout(() => { this.updateCurrent(); }, 2000);
        document.title = "Cashier Screen";
    }

    updateCurrent() {
        axios.get('/api/orders/GetOrder/' + this.state.OrderNumber)
            .then((response) => {
                console.log(response.data);
                this.setState({ Orders: response.data })
            });
    }

    setUnfinishedGuid() {
        axios.get('/api/orders/GetUnfinishedGuid/')
            .then((response) => {
                if (response.data == "00000000-0000-0000-0000-000000000000") {
                    this.setState({
                        OrderNumber: uuidv4()
                    })
                } else {
                    this.setState({ OrderNumber: response.data })
                }
            });
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

    iconSwitch(param, param2) {
        switch (param) {
            case 1:
                return <img src={hamburgerIcon} class="CurrentIcon" height="47px"/>
            case 2:
                return <img src={cheeseburgerIcon} class="CurrentIcon" height="47px" />;
            case 3:
                return <img src={nuggiesIcon} class="CurrentIcon" height="47px" />;
            case 4:
                return <img src={corndogIcon} class="CurrentIcon" height = "47px" />;
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
                return <img src={smalldrinkIcon} class="CurrentIcon" width="40px"  />;
            case 2:
                return <img src={mediumdrinkIcon} class="CurrentIcon" width="40px" />;
            case 3:
                return <img src={largedrinkIcon} class="CurrentIcon" width="40px" />;
            default:
                return;
        }
    }

    onClick(id, size) {
        this.setState({ time: new Date() });
        axios({
            method: 'post',
            url: '/api/orders/sendorder',
            data: {
                "OrderNumber": this.state.OrderNumber,
                "OrderItemId": id,
                "DateStarted": this.state.time,
                "Size": size,
                "IsComplete": false,
                "IsDeleted": false,
            }
        }).then(response => this.updateCurrent());
        console.log("OrderItem Click!!!");
    }

    CompleteOrder() {
        axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: '/api/orders/CompleteOrder',
            data: "\"" + this.state.OrderNumber + "\""
        }).then(response => this.updateCurrent());
        this.setState({
            OrderNumber: uuidv4(),
            selectedOrder: null
        });
        console.log("Complete Order Click!!!");
    }
    
    UpdateSelected(id) {
        this.setState({
            selectedOrder: id
        });
        this.updateCurrent();
    }

    DeleteOrder(id) {
        axios.get('/api/orders/DeleteOrder/' + id)
            .then((response) => {
                this.updateCurrent();
            });
    }

    UnDeleteOrder(id) {
        axios.get('/api/orders/UnDeleteOrder/' + id)
            .then((response) => {
                this.updateCurrent();
            });
    }

    render() {
        return (
            <div>
                <div id="cashierClock">
                    <Clock />
                </div>
                <div class="FoodItems">
                    <b> Food </b>
                    <button onClick={() => this.onClick(1, 0)} class="Button"><img src={hamburgerIcon} height="47px"/>&nbsp;Hamburger</button>
                    <button onClick={() => this.onClick(2, 0)} class="Button"><img src={cheeseburgerIcon} height="47px"/>&nbsp;Cheeseburger </button>
                    <button onClick={() => this.onClick(3, 0)} class="Button"><img src={nuggiesIcon} height="47px"/>&nbsp;Chicken Nuggets </button>
                    <button onClick={() => this.onClick(4, 0)} class="Button"><img src={corndogIcon} height="47px"/>&nbsp;Corn Dog </button>
                    <button onClick={() => this.onClick(5, 0)} class="Button"><img src={hotdogIcon} height="47px"/>&nbsp;Hot Dog </button>
                    <button onClick={() => this.onClick(6, 0)} class="Button"><img src={pretzelIcon} height="47px" />&nbsp;Pretzel </button>
                </div>              
                <div id="container">
                    <div class="MenuItems">
                        <table id="DrinkTable">
                            <colgroup>
                                <col />
                                <col class="Small" />
                                <col class="Medium" />
                                <col class="Large" />
                            </colgroup>
                            <tr>
                                <th> Drinks </th>
                                <th class="DrinkSizeLabel">S </th>
                                <th class="DrinkSizeLabel">M </th>
                                <th class="DrinkSizeLabel" id="largeDrinkId">L </th>
                            </tr>
                            <tr>
                                <td class="Drinks"> Sprite </td>
                                <td>< button onClick={() => this.onClick(7, 1)} class="SmallButton"><img src={smalldrinkIcon} width="40px" /></ button></td>
                                <td>< button onClick={() => this.onClick(7, 2)} class="MediumButton"><img src={mediumdrinkIcon} width="40px" /></ button></td>
                                <td>< button onClick={() => this.onClick(7, 3)} class="LargeButton"><img src={largedrinkIcon} width="40px" /></ button></td>
                            </tr>
                            <tr>
                                <td class="Drinks"> Coca-Cola </td>
                                <td>< button onClick={() => this.onClick(8, 1)} class="SmallButton"><img src={smalldrinkIcon} width="40px" /> </ button></td>
                                <td>< button onClick={() => this.onClick(8, 2)} class="MediumButton"><img src={mediumdrinkIcon} width="40px" /> </ button></td>
                                <td>< button onClick={() => this.onClick(8, 3)} class="LargeButton"><img src={largedrinkIcon} width="40px" /> </ button></td>
                            </tr>
                            <tr>
                                <td class="Drinks"> Fanta Orange </td>
                                <td>< button onClick={() => this.onClick(9, 1)} class="SmallButton"><img src={smalldrinkIcon} width="40px" /> </ button></td>
                                <td>< button onClick={() => this.onClick(9, 2)} class="MediumButton"><img src={mediumdrinkIcon} width="40px" /> </ button></td>
                                <td>< button onClick={() => this.onClick(9, 3)} class="LargeButton"><img src={largedrinkIcon} width="40px" /> </ button></td>
                            </tr>
                            <tr>
                                <td class="Drinks"> Dr Pepper </td>
                                <td>< button onClick={() => this.onClick(10, 1)} class="SmallButton"><img src={smalldrinkIcon} width="40px" /> </ button></td>
                                <td>< button onClick={() => this.onClick(10, 2)} class="MediumButton"><img src={mediumdrinkIcon} width="40px" /> </ button></td>
                                <td>< button onClick={() => this.onClick(10, 3)} class="LargeButton"><img src={largedrinkIcon} width="40px" /> </ button></td>
                            </tr>
                            <tr>
                                <td class="Drinks"> Lemonade </td>
                                <td>< button onClick={() => this.onClick(11, 1)} class="SmallButton"><img src={smalldrinkIcon} width="40px" /> </ button></td>
                                <td>< button onClick={() => this.onClick(11, 2)} class="MediumButton"><img src={mediumdrinkIcon} width="40px" /> </ button></td>
                                <td>< button onClick={() => this.onClick(11, 3)} class="LargeButton"><img src={largedrinkIcon} width="40px" /> </ button></td>
                            </tr>
                            <tr>
                                <td class="Drinks"> Water </td>
                                <td>< button onClick={() => this.onClick(12, 1)} class="SmallButton"><img src={smalldrinkIcon} width="40px" /> </ button></td>
                                <td>< button onClick={() => this.onClick(12, 2)} class="MediumButton"><img src={mediumdrinkIcon} width="40px" /> </ button></td>
                                <td>< button onClick={() => this.onClick(12, 3)} class="LargeButton"><img src={largedrinkIcon} width="40px" /> </ button></td>
                            </tr>
                        </table>
                    </div>
                        <div id="CurrentOrder">
                            <div id="CurrentOrderList">
                                <b>CURRENT ORDER</b>
                            {this.state.Orders.map((Order) => (
                                <p onClick={() => this.UpdateSelected(Order.id)} class=
                                    {(Order.id == this.state.selectedOrder && Order.isDeleted) ? "selectedDeletedOrder" : Order.id == this.state.selectedOrder ? "selectedOrder" : Order.isDeleted ? "deletedOrder" : null}>
                                    {this.iconSwitch(Order.orderItemId)}{this.iconSwitchDrink(Order.size)}{this.sizeSwitch(Order.size)} {Order.name}
                                </p>
                                ))}
                        </div>
                        {this.state.Orders.map((Order) => (
                            <button onClick={() => { (Order.id == this.state.selectedOrder && Order.isDeleted) ? this.UnDeleteOrder(this.state.selectedOrder) : this.DeleteOrder(this.state.selectedOrder) }}
                                class={(Order.id == this.state.selectedOrder && Order.isDeleted) ? "UnDeleteButton" : "DeleteButton"}>
                                {(Order.id == this.state.selectedOrder && Order.isDeleted) ? "UNDELETE" : "DELETE"}
                            </button>
                            ))}
                        <button onClick={this.CompleteOrder} class="CompleteButton">{checksquareIcon} COMPLETE</button>
                        </div>
                </div>
            </div>
        );
    }

  

}