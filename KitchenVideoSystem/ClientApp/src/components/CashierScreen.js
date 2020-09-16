import React, { Component } from 'react';
import './CashierScreen.css'

export default class CashierScreen extends Component {
    render() {
        return (
            <div>

                <div class="FoodItems">
                    <b class="food"> Food </b>
                    <button class="Button"> Hamburger </button>
                    <button class="Button"> Cheeseburger </button>
                    <button class="Button"> Chicken Nuggets </button>
                    <button class="Button"> Hot dog </button>
                    <button class="Button"> Pretzel </button>
                    <button class="Button"> French Fries </button>
                </div>

                <div class="MenuItems">
                    <table>
                        <tr>
                            <th> Drinks </th>
                            <th> S </th>
                            <th> M </th>
                            <th> L </th>
                        </tr>
                        <tr>
                            <td class="Drinks"> Sprite </td>
                        </tr>
                        <tr>
                            <td class="Drinks"> Coca-Cola </td>
                            <td class="Drinks"> Fanta Orange </td>
                            <td class="Drinks"> Dr Pepper </td>
                            <td class="Drinks"> Lemonade </td>
                            <td class="Drinks"> Water </td>
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