import React, { Component } from 'react';
import './CashierScreen.css'

export default class CashierScreen extends Component {
    render() {
        return (
            <div>

                <div class="MenuItems">
                    <h1 class="food"> Food </h1>
                    <button class="Button"> Hamburger </button>
                    <button class="Button"> Cheeseburger </button>
                    <button class="Button"> Chicken Nuggets </button>
                    <button class="Button"> Hot dog </button>
                    <button class="Button"> Pretzel </button>
                    <button class="Button"> French Fries </button>
                </div>
                <div class="MenuItems">
                    <h1 class="food"> Drinks </h1>
                    <button class="Button"> Sprite </button>
                    <button class="Button"> Coca-Cola </button>
                    <button class="Button"> Fanta Orange </button>
                    <button class="Button"> Dr Pepper </button>
                    <button class="Button"> Lemonade </button>
                    <button class="Button"> Water </button>
                </div>
                <div class="CurrentOrder MenuItems">
                    <p>CURRENT ORDER</p>
                </div>

            </div>
        );
    }
}