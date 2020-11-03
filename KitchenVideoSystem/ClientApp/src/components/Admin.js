import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Admin.css";
export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Users: [],
        };
    }

    GetAllUsers() {
        axios.get('api/user/GetAllUsers')
            .then((response) => {
                this.setState({
                    Users: response.data
                })
            })
    }

    componentDidMount() {
        this.GetAllUsers();
        document.title = "Admin"
    }

    render() {
        return (
            <div>
                <h1 className="title"> Manage Users </h1>

                <Link to="./admin/adduser">
                    <button class="addButton">Add User</button>
                </Link>

                <Link to="./">
                    <button class="backButton">back</button>
                </Link>
                {this.state.Users.map((user) => (
                    <div>
                        <p> {user} </p>
                    </div>
                ))}

            </div>
        );
    }
}