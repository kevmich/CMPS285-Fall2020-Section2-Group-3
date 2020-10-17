import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import bcrypt from 'bcryptjs'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogged: false,
            loginParams: {
                user_id: "",
                user_password: ""
            }
        };
    }
    handleFormChange = event => {
        let loginParamsNew = { ...this.state.loginParams };
        let val = event.target.value;
        loginParamsNew[event.target.name] = val;
        this.setState({
            loginParams: loginParamsNew
        });
    };

    login = event => {

        // Example of hashing password
        const password = 'oe3im3io2r3o2'
        const rounds = 10

        bcrypt.hash(password, rounds, (err, hash) => {
            if (err) {
                console.error(err)
                return
            }
            console.log(hash)
        })


        let user_id = this.state.loginParams.user_id;
        let user_password = this.state.loginParams.user_password;
        if (user_id === "admin" && user_password === "123") {
            localStorage.setItem("token", "T");
            this.setState({
                islogged: true
            });
        }
        event.preventDefault();
    };
    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container">
                <form onSubmit={this.login} className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                name="user_id"
                                onChange={this.handleFormChange}
                                placeholder="Enter Username"
                            />
                            <input
                                type="password"
                                name="user_password"
                                onChange={this.handleFormChange}
                                placeholder="Enter Password"
                            />
                            <input type="submit" value="Login" />
                        </div>
                    </div>
                    <p>user_id === "admin" && user_password === "123"</p>
                </form>
            </div>
        );
    }
}
export default Login;