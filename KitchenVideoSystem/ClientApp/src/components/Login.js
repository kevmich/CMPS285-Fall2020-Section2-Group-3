import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import axios from 'axios'
import KvsIcon from '../content/KVS-Icon.png';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            islogged: false,
            loginParams: {
                user_id: "",
                user_password: ""
            },
            loginFail: false
        };
    }
    handleFormChange = event => {
        let loginParamsNew = { ...this.state.loginParams };
        let val = event.target.value;
        loginParamsNew[event.target.name] = val;
        this.setState({
            loginParams: loginParamsNew,
            loginFail: false
        });
    };

    login = event => {
        let user_id = this.state.loginParams.user_id;
        let user_password = this.state.loginParams.user_password;

        axios({
            method: 'post',
            url: '/api/token',
            data: {
                "username": user_id,
                "password": user_password
            }
        }).then((response) => {
            sessionStorage.setItem("token", response.data.token)
            this.getUserInfo(user_id);
        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 400) {
                this.setState({
                    loginFail: true
                });
                console.log("LOGIN FAIL");
            }
        })

        event.preventDefault();
    };

    getUserInfo(username) {
        axios.get('/api/user/getuserinfo/' + username, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then((response) => {
            sessionStorage.setItem("user", JSON.stringify(response.data));
            this.setState({
                islogged: true
            });
        })
    }

    componentDidMount() {
        document.title = "KVS Login";
    }

    render() {
        if (sessionStorage.getItem("token")) {
            return <Redirect to="/home" />;
        }
        return (
            <div className="Login">
                <div className="LoginContainer">
                    <form onSubmit={this.login} className="form-signin">
                        <img src={KvsIcon} height="80px" class="center" />
                        <h1 className="signIn">Please sign in to KVS </h1>
                        <div className="row">
                            <div className="col">
                                <h3 className="h3 text-left"> Username: </h3>
                                <input
                                    type="text"
                                    name="user_id"
                                    required pattern="[0-9a-zA-Z_.-]*"
                                    onChange={this.handleFormChange}
                                    placeholder="Enter Username"
                                />
                                <h3 className="h3 text-left"> Password: </h3>
                                <input
                                    type="password"
                                    name="user_password"
                                    required pattern="*"
                                    onChange={this.handleFormChange}
                                    placeholder="Enter Password"
                                />
                                <input type="submit" value="Login" />
                            </div>
                        </div>
                        {this.state.loginFail ? <p className="alert"> Incorrect Username or Password. </p> : null}

                    </form>

                </div>
            </div>
        );
    }
}
export default Login;