import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import axios from 'axios'
import KvsIcon from '../content/KVS-Icon.png';

class Log extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LogData: []
        };
    }

    componentDidMount() {
        axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
            url: '/api/log/GetDayLog/' + '2020-11-11',
            data: 5
        }).then((response) => {
            console.log(response.data)
            this.setState({
                LogData: response.data
            });
        })


    }

    render() {
        return (
            <div>
                <h1> hello! </h1>
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