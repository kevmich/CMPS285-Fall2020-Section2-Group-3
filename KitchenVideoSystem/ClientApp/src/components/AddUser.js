import React, { Component } from 'react';
import "./AddUser.css";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import CheckBox from './CheckBox';
import Clock from 'react-digital-clock'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            loginParams: {
                user_id: "",
                user_password: "",
                user_firstname: "",
                user_lastname: ""
            },
            user: (JSON.parse(sessionStorage.getItem("user"))),
            userFail: true,
            SameUser: false,
            adminFail: false,
            permissions: [
                { id: 0, value: "Manage Users", isChecked: false },
                { id: 1, value: "Cashier", isChecked: false },
                { id: 2, value: "Kitchen", isChecked: false },
                { id: 3, value: "View Log", isChecked: false }
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
        let user_firstname = this.state.loginParams.user_firstname;
        let user_lastname = this.state.loginParams.user_lastname;

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
                "firstname": user_firstname,
                "lastname": user_lastname,
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
                this.notify()
                this.props.closeModal()
                
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


    notify = () => {
        toast.success("User has been added!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        this.setState({
            notify: false
        })

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
        if (!(this.state.user.permissionsArray.includes(0))) {
            return <Redirect to="/Home" />;
        }

        return (
            <div>
                    <ToastContainer />

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
                                    <h3 className="h3 text-left"> First Name: </h3>
                                    <input
                                        type="text"
                                        name="user_firstname"
                                        required pattern="*"
                                        onChange={this.handleFormChange}
                                        placeholder="First Name"
                                    />
                                    <h3 className="h3 text-left"> Last Name: </h3>
                                    <input
                                        type="text"
                                        name="user_lastname"
                                        required pattern="*"
                                        onChange={this.handleFormChange}
                                        placeholder="Last Name"
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
                                    <input className="cancelButton" type="Button" value="Cancel" onClick={this.props.closeModal} /> 

                                <input className="createButton" type="submit" value="Add User"/>
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