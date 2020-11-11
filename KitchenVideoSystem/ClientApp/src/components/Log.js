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
        axios.get('/api/log/GetAllLog', {
            //headers: {
            //    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            //}
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
                        <p>{data.name}</p>

                    ))
                }

            </div>
        );
    }
}
export default Log;