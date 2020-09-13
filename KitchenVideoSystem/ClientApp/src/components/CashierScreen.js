import React, { Component } from 'react';
import './CashierScreen.css'

export default class CashierScreen extends Component {
    render() {
        return (
            <div>
                <button class = "Button"> Burger </button>
                <button class="Button"> Fries </button>
                <button class="Button"> Drink </button>
            </div>
        );
    }
}