import React, { Component } from 'react';
import './KitchenScreen.css'
import axios from 'axios';

export default class KitchenScreen extends Component {
    constructor(props) {
        super(props);
        this.updateScreen = this.updateScreen.bind(this);
        this.state = {
            Orders: []
        };
    }
    
    componentDidMount() {
        this.updateScreen();
        this.interval = setInterval(() => this.updateScreen(), 1000);
    }

    updateScreen(){
        axios.get('/api/orders/getunfinishedorders')
            .then((response) => {
                console.log(response.data);
                this.setState({ Orders: response.data})

            });
    }
    finishAllOrders() {
        axios.get('/api/orders/finishallorders')

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
    
        return (
            <div>
               
                {this.state.Orders.map((Order) => (
                    <p id={Order.isComplete ? "completeOrders" : "incompleteOrders"}> {Order.name} <br/> </p>
                ))}

                <br/>

                <button id="FinishOrders" onClick={this.finishAllOrders}> Finish All Orders </button>   

            </div>
            
            
        );
    }
}