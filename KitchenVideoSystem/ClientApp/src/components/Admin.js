import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Admin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Clock from 'react-digital-clock'

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.DeleteUser = this.DeleteUser.bind(this);
        this.state = {
            Users: [],
        };
    }

    GetAllUsers() {
        axios.get('api/user/GetAllUsers', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then((response) => {
                this.setState({
                    Users: response.data
                })
            })
    }

    DeleteUser(e) {
        console.log(e.user);
        axios.get('api/user/DeleteUser/' + e.user, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then((response) => {
                this.GetAllUsers();
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
                    <button class="BackButton">Back</button>
                </Link>
                <div id="Clock">
                    <Clock />
                </div>
                {this.state.Users.map((user) => (
                    <div>
                        <p> {user} <button className="DeleteButton" onClick={() => this.DeleteUser({ user })}> <FontAwesomeIcon icon={faTrash} /> </button> </p>
                    </div>
                ))}

            </div>
        );
    }
}