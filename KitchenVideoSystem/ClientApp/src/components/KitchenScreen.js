import React, { Component } from 'react';
import './KitchenScreen.css'


export default class KitchenScreen extends Component {

    render() {
        return (
            <div>
                <div>
                    <div class="OrderDiv" id="Completed">
                        <ul>
                            <li>1 Cheeseburger</li>
                            <li>2 Hamburger</li>
                            <li>300 Hot Dog</li>
                        </ul>
                    </div>
                    <div class="OrderDiv">
                        <ul>
                            <li>1 Cheeseburger</li>

                        </ul>
                    </div>
                   
                </div>
            </div>
        );
    }
}