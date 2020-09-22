import React, { Component } from 'react';
import './KitchenScreen.css'
import axios from 'axios';


export default class KitchenScreen extends Component {

    state = {
        Number: []
    };
    

    componentDidMount(){
        axios.get('/api/orders/GetAllOrders')
            .then((response) => {
                console.log(response.data);
                this.setState({ Number: response.data})
              

        });
    }




    render() {
    
        return (
            <div>
               
                <div>
                    <div class ="OrderDiv" id="Completed">
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
                {this.state.Number.map((Number) => (
                <p> Number: {Number.id} </p>
                ))}
                    
            </div>

            
        );
    }
}