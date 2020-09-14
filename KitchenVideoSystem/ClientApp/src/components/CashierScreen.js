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
                    <button class="Button"> Pretzel </button>
                    <button class="Button"> French Fries </button>
                    <button class="Button"> French Fries </button>
                </div>
                <div class="MenuItems">
                    <h1 class="food"> Drinks </h1>
                    <button class="Button"> Hamburger </button>
                    <button class="Button"> Cheeseburger </button>
                    <button class="Button"> Chicken Nuggets </button>
                    <button class="Button"> Pretzel </button>
                    <button class="Button"> French Fries </button>
                    <button class="Button"> French Fries </button>
                </div>
                <div class="CurrentOrder MenuItems">
                    <p>CURRENT ORDER</p>
                </div>

            </div>
        );
    }
}