import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './CashierScreen.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import { faHotdog } from '@fortawesome/free-solid-svg-icons'
import cheeseburgerIcon from '../content/cheeseburger-solid.svg';
const hamburgerIcon = <FontAwesomeIcon icon={faHamburger} />
const hotdogIcon = <FontAwesomeIcon icon={faHotdog} />

export default class CashierScreen extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            OrderNumber: uuidv4()
        };
    }
    componentDidMount() {
        console.log(uuidv4());
    }



    onClick(id, size) {
        axios({
            method: 'post',
            url: '/api/orders/sendorder',
            data: {
                "OrderNumber": this.state.OrderNumber,
                "OrderItemId": id,
                "DateStarted": "1999-01-06T17:16:40",
                "Size": size,
                "IsComplete": false
            }
        });
    }
    

    render() {
        return (
            <div>
                <div class="FoodItems">
                    <b class="food"> Food </b>
                    <button onClick={() => this.onClick(1, 0)} class="Button">{hamburgerIcon}&nbsp;Hamburger</button>
                    <button onClick={() => this.onClick(2, 0)} class="Button"><img src={cheeseburgerIcon} height="47px"/>&nbsp;Cheeseburger </button>
                    <button onClick={() => this.onClick(3, 0)} class="Button"> Chicken Nuggets </button>
                    <button onClick={() => this.onClick(4, 0)} class="Button"> Corn Dog </button>
                    <button onClick={() => this.onClick(5, 0)} class="Button"> {hotdogIcon}&nbsp;Hot Dog </button>
                    <button onClick={() => this.onClick(6, 0)} class="Button"> Pretzel </button>
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
                </div>
            </div>
        );
    }

  

}