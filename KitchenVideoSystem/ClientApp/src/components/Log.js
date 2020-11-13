import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios'
import { CSVLink, CSVDownload } from "react-csv";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import './Log.css'


class Log extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LogData: [],
            date: '',
            csvData: []
            
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
        })
    }

    componentDidMount() {
        document.title = "Order Log";
    }

    handleChange(event) {
        this.setState({ date: event.target.value });
    }

    handleSubmit(event) {
        this.GetLog();
        this.PrepareCsvData();
        event.preventDefault();
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
        console.log(this.state.LogData);
    }

    render() {
        let uniqueNames = new Set();

        return (
            <div>
                <h1 className = "title"> Order Log </h1>
                {this.state.csvData.length ? <CSVLink data={this.state.csvData} filename={"OrderLog_" + this.state.date + ".csv"} className="exportButton"><FontAwesomeIcon icon={faFileDownload} />&nbsp;Export</CSVLink> : null}

                <form onSubmit={this.handleSubmit}>
                    <label className= "Date">
                        Select Date:
                    <input type="date" id="date" name="senddate" value={this.state.date} onChange={this.handleChange}></input>
                    </label>
                    <input type="submit" value="Submit" />

                </form>

                {this.state.date ?
                    <table>
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
                    </table>
                : null}
            </div>
        );
    }
}
export default Log;