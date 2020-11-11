import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import axios from 'axios'
import KvsIcon from '../content/KVS-Icon.png';

class Log extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LogData: [],
            date: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.GetLog = this.GetLog.bind(this);
        this.formatTime = this.formatTime.bind(this);
    }

    GetLog() {
        axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
            url: '/api/log/GetDayLog/' + this.state.date,
            data: 5
        }).then((response) => {
            console.log(response.data)

            //response.data.map((data) => (
            //    data.dateStarted = "1"
            //))

            this.setState({
                LogData: response.data
            });
        })
    }

    handleChange(event) {
        this.setState({ date: event.target.value });
    }

    handleSubmit(event) {
        this.GetLog();
        event.preventDefault();
    }

    formatTime(time) {
        console.log(time);
        var newTime = new Date(time).toLocaleTimeString();
        console.log(newTime);
        return newTime;
    }

    render() {
        return (
            <div>
                <h1> Order Log </h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Select Date:
                    <input type="date" id="date" name="senddate" value={this.state.date} onChange={this.handleChange}></input>
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <table>
                    <tr>
                        <th>Time Started</th>
                        <th>Time Finished</th>
                        <th>Order Number</th>
                        <th>Size</th>
                        <th>Order Item</th>
                        <th>Quantity</th>
                    </tr>
                    {this.state.LogData.map((data) => (
                        <tr>
                            <th>{this.formatTime(data.dateStarted)}</th>
                            <th>{this.formatTime(data.dateFinished)}</th>
                            <th>{data.orderNumber}</th>
                            <th>{data.size}</th>
                            <th>{data.name}</th>

                            <th>PLACEHOLDER</th>
                        </tr>
                    ))}
                </table>

            </div>
        );
    }
}
export default Log;