import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Admin.css";
export default class Admin extends Component {

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

            </div>
        );
    }
}