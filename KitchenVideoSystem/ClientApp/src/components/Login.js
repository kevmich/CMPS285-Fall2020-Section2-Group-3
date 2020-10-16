import React, { Component } from 'react';
import './Login.css'
import Clock from 'react-digital-clock'

export default class Login extends Component {

    componentDidMount() {
        document.title = "Login";
    }

    submit() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        if (username == "test" && password == "test") {
            window.location.replace("./");
        }
        else {
            var x = document.getElementById("submit").value;
            document.getElementById("error").innerHTML = x;
        }
    }

    render() {
        return (
            <div>
                <div class="login">
                    <label><b>Username&nbsp;</b></label>
                    <input id="username" class="username" placeholder="Enter Username" />
                    <br/>
                    <label><b>Password&nbsp;</b></label>
                    <input id="password" class="password" placeholder="Enter Password" />
                    <br/>
                    <button id="submit" value="Username or Password is Incorrect" onClick={() => this.submit()}>Submit</button>
                    <br />
                    <p id="error"></p>
                </div>
                <div class="loginClock">
                    <Clock />
                </div>
            </div>
        );
    }
}
