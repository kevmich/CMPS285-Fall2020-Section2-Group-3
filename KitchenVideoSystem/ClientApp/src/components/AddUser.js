import React, { Component } from 'react';
import "./AddUser.css";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import CheckBox from './CheckBox';
import Clock from 'react-digital-clock'

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            loginParams: {
                user_id: "",
                user_password: ""
            },
            user: (JSON.parse(sessionStorage.getItem("user"))),
            userFail: true,
            SameUser: false,
            adminFail: false,
            permissions: [
                { id: 1, value: "Manage Users", isChecked: false },
                { id: 2, value: "Cashier", isChecked: false },
                { id: 3, value: "Kitchen", isChecked: false }
            ]
        };
    }

    handleFormChange = event => {
        let loginParamsNew = { ...this.state.loginParams };
        let val = event.target.value;
        loginParamsNew[event.target.name] = val;
        this.setState({
            loginParams: loginParamsNew,
            SameUser: false,
            adminFail: false
        });
    };

    login = event => {
        let user_id = this.state.loginParams.user_id;
        let user_password = this.state.loginParams.user_password;

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
            url: '/api/user/adduser',
            data: {
                "username": user_id,
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
            if (response.data == -3) {
                this.setState({
                    adminFail: true
                });
            }
        }).catch((error) => {
        })

        event.preventDefault();
    };

    componentDidMount() {
        document.title = "Add User";
    }

    handleCheckChieldElement = (event) => {
        let permissions = this.state.permissions
        permissions.forEach(permission => {
            if (permission.value === event.target.value)
                permission.isChecked = event.target.checked
        })
        this.setState({ permissions: permissions })
    }



    render() {
        if (this.state.userFail == false) {
            return <Redirect to="/ManageUsers" />;
        }
        if (!(this.state.user.permissionsArray.includes(0))) {
            return <Redirect to="/home" />;
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
                            <FontAwesomeIcon icon={faUserPlus} height="80px" class="center" />
                            <h1 className="signIn">Add User&nbsp;&nbsp;&nbsp;</h1>
                        <div className="row">
                            <div className="col">
                                <h3 className="h3 text-left"> Username: </h3>
                                <input
                                    type="text"
                                    name="user_id"
                                    required pattern="[0-9a-zA-Z_.-]*"
                                    onChange={this.handleFormChange}
                                    placeholder="Create Username"
                                />
                                <h3 className="h3 text-left"> Password: </h3>
                                <input
                                    type="password"
                                    name="user_password"
                                    required pattern="*"
                                    onChange={this.handleFormChange}
                                    placeholder="Create Password"
                                />
                                <p className= "permissionText"> Permissions: </p>
                                <ul className = "checkBox">
                                {
                                    this.state.permissions.map((permission) => {
                                        return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...permission} />)
                                    })
                                }
                                </ul>

                                 <Link to="/ManageUsers">
                                        <input className="cancelButton" type="Button" value ="Cancel"/> 
                                </Link>

                                <input className="createButton" type="submit" value="Create" />
                            </div>
                        </div>
                        {this.state.SameUser ? <p className="alert"> User already exists. </p> : null}
                        {this.state.adminFail ? <p className="alert"> User already exists. </p> : null}

                    </form>

                </div>
                </div>
                </div>
        );
    }
}