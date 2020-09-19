import React, { Component } from 'react';
import axios from 'axios';
import './CashierScreen.css'

export default class CashierScreen extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            OrderNumber: "9cdc7364-90d8-4a1f-a7ae-bb3e85681ec0",
        };
    }

    onClick() {
        axios({
            method: 'post',
            url: '/api/orders/sendorder',
            data: {
                "OrderNumber": this.state.OrderNumber,
                "OrderItemId": 1,
                "DateStarted": "1999-01-06T17:16:40",
                "Size": 0,
                "IsComplete": false
            }
        });

    }
    

    render() {
        return (
            <div>

                <div class="FoodItems">
                    <b class="food"> Food </b>
                    <button onClick={this.onClick} class="Button"> Hamburger </button>
                    <button class="Button"> Cheeseburger </button>
                    <button class="Button"> Chicken Nuggets </button>
                    <button class="Button"> Corn Dog </button>
                    <button class="Button"> Hot Dog </button>
                    <button class="Button"> Pretzel </button>
                </div>


                <div class="MenuItems">
                    <table id="DrinkTable">
                        <tr>
                            <th> Drinks </th>
                            <th class="DrinkSizeLabel"> S </th>
                            <th class="DrinkSizeLabel"> M </th>
                            <th class="DrinkSizeLabel"> L </th>
                        </tr>
                        <tr>
                            <td class="Drinks"> Sprite </td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                        </tr>
                        <tr>
                            <td class="Drinks"> Coca-Cola </td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                        </tr>
                        <tr>
                            <td class="Drinks"> Fanta Orange </td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                        </tr>
                        <tr>
                            <td class="Drinks"> Dr Pepper </td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                        </tr>
                        <tr>
                            <td class="Drinks"> Lemonade </td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                        </tr>
                        <tr>
                            <td class="Drinks"> Water </td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                            <td>< button class="DButton"> </ button></td>
                        </tr>




                    </table>
                </div>
                <div class="CurrentOrder MenuItems">
                    <p>CURRENT ORDER</p>
                </div>
            </div>
        );
    }

  

}