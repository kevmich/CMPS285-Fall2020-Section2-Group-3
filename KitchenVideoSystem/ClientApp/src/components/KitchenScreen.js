import React, { Component } from 'react';
import './KitchenScreen.css'
import axios from 'axios';


export default class KitchenScreen extends Component {

    state = {
        Orders: []
    };
    

    componentDidMount(){
        axios.get('/api/orders/getunfinishedorders')
            .then((response) => {
                console.log(response.data);
                this.setState({ Orders: response.data})
              

        });
    }




    render() {
    
        return (
            <div>
               
                {this.state.Orders.map((Number) => (
                    <p> Number: {Number.orderItemId} </p>
                ))}
                    
            </div>
            
            
        );
    }
}