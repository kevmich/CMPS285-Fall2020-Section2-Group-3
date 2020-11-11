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

    }

    GetLog() {
        axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
            url: '/api/log/GetDayLog/' + this.state.date,
            data: 5
        }).then((response) => {
            console.log(response.data)
            this.setState({
                LogData: response.data
            });
        })


    }

    handleChange(event) {
        this.setState({ date: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.date);
        this.GetLog();
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1> hello! </h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Get orders from day:
                    <input type="date" id="birthday" name="senddate" value={this.state.date} onChange={this.handleChange}></input>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {
                    this.state.LogData.map((data) => (
                        <p>{data.name}, {data.size}, {data.dateStarted}</p>

                    ))
                }
            </div>
        );
    }
}
export default Log;