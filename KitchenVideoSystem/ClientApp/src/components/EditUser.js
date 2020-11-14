﻿import React, { Component } from 'react';
import "./AddUser.css";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios'
import CheckBox from './CheckBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import Clock from 'react-digital-clock'

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        const queryString = require('query-string');
        let params = queryString.parse(this.props.location.search)

        this.login = this.login.bind(this);
        this.state = {
            loginParams: {
                user_id: "",
                user_password: ""
            },
            user: (JSON.parse(sessionStorage.getItem("user"))),
            editUser: [this.getUserInfo(params.name)],
            userFail: true,
            SameUser: false,
            noUser: false,
            permissions: [
                { id: 0, value: "Manage Users", isChecked: false },
                { id: 1, value: "Cashier", isChecked: false },
                { id: 2, value: "Kitchen", isChecked: false },
                { id: 3, value: "View Log", isChecked: false }
            ]
        };
    }

    componentDidMount() {
        document.title = "Edit User";
    }

    handleFormChange = event => {
        let loginParamsNew = { ...this.state.loginParams };
        let val = event.target.value;
        loginParamsNew[event.target.name] = val;
        this.setState({
            loginParams: loginParamsNew,
            SameUser: false,
            Submit: false
        });
    };

    getUserInfo(username) {
        axios.get('/api/user/getuserinfo/' + username)
            .then((response) => {
                if (!(response.data.username == null)) {
                    this.setState({
                        editUser: response.data,
                        permissions: [{ id: 0, value: "Manage Users", isChecked: response.data.permissionsArray.includes(0) },
                        { id: 1, value: "Cashier", isChecked: response.data.permissionsArray.includes(1) },
                        { id: 2, value: "Kitchen", isChecked: response.data.permissionsArray.includes(2) },
                        { id: 3, value: "View Log", isChecked: response.data.permissionsArray.includes(3) }]
                    })
                } else {
                    this.setState({ noUser: true })
                }
            }
            )
    }

    login = event => {
        let user_id = null;
        let user_password = null;

        if (this.state.loginParams.user_id == "") {
            user_id = null;
        } else {
            user_id = this.state.loginParams.user_id
        }

        if (this.state.loginParams.user_password == "") {
            user_password = null;
        }
        else {
            user_password = this.state.loginParams.user_password
        }

        var checkBox = [];
        var perms = this.state.permissions
        for (var i = 0; i < perms.length; i++) {
            if (perms[i].isChecked) {
                checkBox.push(perms[i].id);
            }
        }
        console.log(checkBox);

        axios({
            method: 'post',
            url: '/api/user/edituser',
            data: {
                "id": this.state.editUser.id,
                "username": this.state.editUser.username,
                "newusername": user_id,
                "password": user_password,
                "permissionsarray": checkBox
            },
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then((response) => {
            console.log("DATA");
            console.log(response.data);
            console.log(this.state.userFail);
            if (response.data == 1) {
                this.setState({
                    userFail: false
                });
            }
            if (response.data == -1) {
                this.setState({
                    SameUser: true
                });
            }

            if (response.data > 0) {
                this.setState({
                    Submit: true
                })
            }
        }).catch((error) => {
        })

        event.preventDefault();
    };

    handleCheckChieldElement = (event) => {
        let permissions = this.state.permissions
        permissions.forEach(permission => {
            if (permission.value === event.target.value)
                permission.isChecked = event.target.checked
        })
        this.setState({ permissions: permissions })
    }

    render() {
        const queryString = require('query-string');
        let params = queryString.parse(this.props.location.search)
        console.log("USER");
        console.log(this.state.noUser);

        if (params.name == undefined || params.name == '' || this.state.noUser) {
            return <Redirect to="/ManageUsers" />;
        }

        if (this.state.Submit == true) {
            return <Redirect to={{
                pathname: "/ManageUsers",
                search: "?name=" + this.state.editUser.username + "&action=edited"
            }} />;
        } else if (this.state.userFail == false) {
            return <Redirect to={{
                pathname: "/ManageUsers",
                search: "?name=" + this.state.editUser.username + "&action=edited"
            }} />;
        }

        return (
            <div>
                <div id="Clock">
                    <Clock />
                     &nbsp;<p class="clockUser">&nbsp;{this.state.user.username}</p>
                </div>
                <div className="Login">
                    <div className="LoginContainer">
                        <form onSubmit={this.login} className="form-signin">
                            <FontAwesomeIcon icon={faUserEdit} height="80px" class="center" />
                            <h1 className="signIn">Edit User <b> <br /> {this.state.editUser.username}</b></h1>
                            <div className="row">
                                <div className="col">
                                    <h3 className="h3 text-left"> Change Username: </h3>
                                    <input
                                        type="text"
                                        name="user_id"
                                        onChange={this.handleFormChange}
                                        placeholder="(unchanged)"
                                    />
                                    <h3 className="h3 text-left"> Change Password: </h3>
                                    <input
                                        type="password"
                                        name="user_password"
                                        onChange={this.handleFormChange}
                                        placeholder="(unchanged)"
                                    />
                                    <p className="permissionText"> Permissions: </p>
                                    <ul className="checkBox">
                                        {
                                            this.state.permissions.map((permission) => {
                                                return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...permission} />)
                                            })
                                        }
                                    </ul>

                                    <input className="createButton" type="submit" value="Apply" />

                                    <Link to="/ManageUsers">
                                        <input className="cancelButton" type="Button" value="Cancel" />
                                    </Link>

                                </div>
                            </div>
                            {console.log("AHH")}
                            {console.log(this.state.editUser)}
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}