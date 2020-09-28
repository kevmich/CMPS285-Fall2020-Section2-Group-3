import React, { Component } from 'react';

export default class Login extends Component {

    render() {
        return (
            <div>
                <label for><b>Username</b></label>
                <input type="username" placeholder="Enter Username" />
                <br/>

                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" />
                <br/>

                <button onClick="submit()">Submit</button>
            </div>
        );
    }
}
