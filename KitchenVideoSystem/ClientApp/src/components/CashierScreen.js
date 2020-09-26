import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './CashierScreen.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import { faHotdog } from '@fortawesome/free-solid-svg-icons'
import cheeseburgerIcon from '../content/cheeseburger-solid.svg';
import nuggies from '../content/nuggets.svg';
import corndogIcon from '../content/corn-dog.svg';
import pretzelIcon from '../content/pretzel.svg';
import smalldrinkIcon from '../content/drink-small.svg';
import mediumdrinkIcon from '../content/drink-medium.svg';
import largedrinkIcon from '../content/drink-large.svg';
const hamburgerIcon = <FontAwesomeIcon icon={faHamburger} />
const hotdogIcon = <FontAwesomeIcon icon={faHotdog} />

var date = new Date();


export default class CashierScreen extends Component {

    constructor(props) {
        super(props);
        //this.onClick = this.onClick.bind(this);
        this.CompleteOrder = this.CompleteOrder.bind(this);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.state = {
            OrderNumber: uuidv4(),
            currentDateTime: date.toISOString(),
            Orders: []
        };
    }

    updateCurrent() {
        axios.get('/api/orders/GetOrder/' + this.state.OrderNumber)
            .then((response) => {
                console.log(response.data);
                this.setState({ Orders: response.data })

            });
    }

    onClick(id, size) {
        axios({
            method: 'post',
            url: '/api/orders/sendorder',
            data: {
                "OrderNumber": this.state.OrderNumber,
                "OrderItemId": id,
                "DateStarted": this.state.currentDateTime,
                "Size": size,
                "IsComplete": false,
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
            OrderNumber: uuidv4()
        });
        console.log(uuidv4());
        console.log("Complete Order Click!!!");
    }
    

    render() {
        return (
            <div>
                <div class="FoodItems">
                    <b class="food"> Food </b>
                    <button onClick={() => this.onClick(1, 0)} class="Button">{hamburgerIcon}&nbsp;Hamburger</button>
                    <button onClick={() => this.onClick(2, 0)} class="Button"><img src={cheeseburgerIcon} height="47px"/>&nbsp;Cheeseburger </button>
                    <button onClick={() => this.onClick(3, 0)} class="Button"><img src={nuggies} height="47px"/>&nbsp;Chicken Nuggets </button>
                    <button onClick={() => this.onClick(4, 0)} class="Button"><img src={corndogIcon} height="47px"/>&nbsp;Corn Dog </button>
                    <button onClick={() => this.onClick(5, 0)} class="Button"> {hotdogIcon}&nbsp;Hot Dog </button>
                    <button onClick={() => this.onClick(6, 0)} class="Button"><img src={pretzelIcon} height="47px"/>&nbsp;Pretzel </button>
                </div>


                <div class="MenuItems">
                    <table id="DrinkTable">
                        <tr>
                            <th> Drinks </th>
                            <th class="DrinkSizeLabel"><img src={smalldrinkIcon} height="68px"/>&nbsp; </th>
                            <th class="DrinkSizeLabel"><img src={mediumdrinkIcon} height="68px" />&nbsp; </th>
                            <th class="DrinkSizeLabel"><img src={largedrinkIcon} height="68px" />&nbsp; </th>
                        </tr>
                        <tr>
                            <td class="Drinks"> Sprite </td>
                            <td>< button onClick={() => this.onClick(7, 1)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(7, 2)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(7, 3)} class="DButton"> </ button></td>
                        </tr>
                        <tr>
                            <td class="Drinks"> Coca-Cola </td>
                            <td>< button onClick={() => this.onClick(8, 1)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(8, 2)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(8, 3)} class="DButton"> </ button></td>
                        </tr>
                        <tr>
                            <td class="Drinks"> Fanta Orange </td>
                            <td>< button onClick={() => this.onClick(9, 1)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(9, 2)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(9, 3)} class="DButton"> </ button></td>
                        </tr>
                        <tr>
                            <td class="Drinks"> Dr Pepper </td>
                            <td>< button onClick={() => this.onClick(10, 1)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(10, 2)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(10, 3)} class="DButton"> </ button></td>
                        </tr>
                        <tr>
                            <td class="Drinks"> Lemonade </td>
                            <td>< button onClick={() => this.onClick(11, 1)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(11, 2)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(11, 3)} class="DButton"> </ button></td>
                        </tr>
                        <tr>
                            <td class="Drinks"> Water </td>
                            <td>< button onClick={() => this.onClick(11, 1)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(11, 2)} class="DButton"> </ button></td>
                            <td>< button onClick={() => this.onClick(11, 3)} class="DButton"> </ button></td>
                        </tr>




                    </table>
                </div>
                <div class="CurrentOrder MenuItems">
                    <p>CURRENT ORDER</p>
                        {this.state.Orders.map((Order) => (
                            <p>{Order.orderItemId}</p>
                        ))}
                    <button onClick={this.CompleteOrder} class = "FButton" > Complete Order </button>   
                </div>
            </div>
        );
    }

  

}