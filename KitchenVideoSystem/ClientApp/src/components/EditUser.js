import React, { Component } from 'react';
import "./AddUser.css";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios'
import KvsIcon from '../content/KVS-Icon.png';
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
            editUser: [this.getUserInfo(this.props.location.state.editUser[0].user)],
            userFail: true,
            SameUser: false,
            adminFail: false,
            permissions: [
                { id: 1, value: "Admin", isChecked: false },
                { id: 2, value: "Cashier", isChecked: false },
                { id: 3, value: "Cook", isChecked: false }
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
            adminFail: false
        });
    };

    getUserInfo(username) {
        axios.get('/api/user/getuserinfo/' + username)
            .then((response) =>
                this.setState({
                    editUser: response.data
                }))
    }

    login = event => {
        let user_id = this.state.loginParams.user_id;
        let user_password = null;
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
            return <Redirect to="/admin" />;
        }

        return (
            <div>
                <div id="Clock">
                    <Clock />
                     &nbsp;&nbsp;{this.state.user.username}
                </div>
                <div className="Login">
                    <div className="LoginContainer">
                        <form onSubmit={this.login} className="form-signin">
                            <img src={KvsIcon} height="80px" class="center" />
                            <h1 className="signIn">Edit User <b>{this.state.editUser.username}</b></h1>
                            <div className="row">
                                <div className="col">
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

                                    <Link to="/admin">
                                        <input className="cancelButton" type="Button" value="Cancel" /> 
                                    </Link>

                                    <input className="createButton" type="submit" value="Apply" />
                                </div>
                            </div>
                            {this.state.SameUser ? <p className="alert"> User already exists. </p> : null}
                            {this.state.adminFail ? <p className="alert"> Admin cannot be modified. </p> : null}
                            {console.log("AHH")}
                            {console.log(this.state.editUser)}
                            {console.log(this.props.location.state.editUser[0].user)}
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}