﻿import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { CSVLink, CSVDownload } from "react-csv";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import './Log.css'
import Clock from 'react-digital-clock'


class Log extends Component {
    constructor(props) {
        super(props);

        var today = new Date(),

            currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        this.state = {
            LogData: [],
            date: currentDate,
            csvData: [],
            user: (JSON.parse(sessionStorage.getItem("user"))),
            currentDate: currentDate
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.GetLog = this.GetLog.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.PrepareCsvData = this.PrepareCsvData.bind(this);
    }

    GetLog() {
        axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
            url: '/api/log/GetDayLog/' + this.state.date,
            data: 5
        }).then((response) => {
            //console.log(response.data)

            //response.data.map((data) => (
            //    data.dateStarted = "1"
            //))

            this.setState({
                LogData: response.data
            });
            this.PrepareCsvData();
        })
    }

    componentDidMount() {
        document.title = "Order Log";
        this.GetLog();
        this.PrepareCsvData();
    }

    handleChange(event) {
        this.setState({ date: event.target.value }, this.handleSubmit);
        
    }

    handleSubmit(event) {
        this.GetLog();
        this.PrepareCsvData();
        //event.preventDefault();
    }

    formatTime(time) {
        var newTime = new Date(time).toLocaleTimeString();
        return newTime;
    }

    CountSame(itemName, itemSize, orderNumber) {
        var number = 0;
        this.state.LogData.forEach((Order) => {
            if (Order.name == itemName && Order.size == itemSize && Order.orderNumber == orderNumber)
                number++;
        });
            return number;
    }

    SizeSwitch(size) {
        switch (size) {
            case 1:
                return "S"
            case 2:
                return "M";
            case 3:
                return "L";
            default:
                return "-";
        }
    }


    PrepareCsvData() {
        let uniqueNames = new Set();
        let logData = [];

        this.state.LogData.filter((x) => {
            if (uniqueNames.has(x.name + x.size + x.orderNumber))
                return false;
            else {
                uniqueNames.add(x.name + x.size + x.orderNumber);
                return true;
            }
        }).map((data) => (
            logData.push(
                { TimeStarted: this.formatTime(data.dateStarted), TimeFinished: this.formatTime(data.dateFinished) , OrderNumber: data.orderNumber, Size: this.SizeSwitch(data.size), OrderItem: data.name, Quantity: this.CountSame(data.name, data.size, data.orderNumber) }
            )
        ))
        console.log("LOGDATA");

        
        this.setState({ csvData: logData })
        this.setState((csvData) => {
            return {csvData: logData}
        })
        console.log(this.state.LogData);
    }

    //<input type="submit" value="Submit" />

    render() {
        let uniqueNames = new Set();

        return (
            <div>

                <div id="Clock">
                    <Clock />
                    &nbsp;<p class="clockUser">&nbsp;{this.state.user.username}</p>
                </div>
                <Link to="./">
                    <button class="BackButton"> Back</button>
                </Link>
                

                <h1 className = "title"> Order Log </h1>
                <CSVLink data={this.state.csvData} filename={"OrderLog_" + this.state.date + ".csv"} className="exportButton"><FontAwesomeIcon icon={faFileDownload} />&nbsp;Export</CSVLink>

                <form onSubmit={this.handleSubmit}>
                    <label className= "Date">
                        Select Date:
                    <input type="date" id="date" name="senddate" defaultValue={this.state.currentDate} onChange={this.handleChange}></input>
                    </label>
                    

                </form>

                {this.state.date ?
                    <table className= "logTable">
                        <tr>
                            <th>Time Started</th>
                            <th>Time Finished</th>
                            <th>Order Number</th>
                            <th>Size</th>
                            <th>Order Item</th>
                            <th>Quantity</th>
                        </tr>
                        {this.state.LogData.filter((x) => {
                            if (uniqueNames.has(x.name + x.size + x.orderNumber))
                                return false;
                            else {
                                uniqueNames.add(x.name + x.size + x.orderNumber);
                                return true;
                            }
                        }).map((data) => (
                            <tr>
                                <th>{this.formatTime(data.dateStarted)}</th>
                                <th>{this.formatTime(data.dateFinished)}</th>
                                <th>{data.orderNumber}</th>
                                <th>{this.SizeSwitch(data.size)}</th>
                                <th>{data.name}</th>

                                <th>{this.CountSame(data.name, data.size, data.orderNumber)}</th>
                            </tr>
                        ))}
                        <br />
                        <br />
                        <br />
                        <br />
                    </table>
                    
                : null}
            </div>
        );
    }
}
export default Log;