import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import "./ManageUsers.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTimes, faUserPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import Clock from 'react-digital-clock'

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.DeleteUser = this.DeleteUser.bind(this);
        this.state = {
            Users: [],
            user: (JSON.parse(sessionStorage.getItem("user")))
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
        document.title = "Manage Users"
    }

    render() {
        if (!(this.state.user.permissionsArray.includes(0))) {
            return <Redirect to="/home" />;
        }

        return (
            <div>
                <div className="title">
                    <b style={{ fontSize: "60px" }}> Manage Users</b> <br/>
                <Link to="./ManageUsers/adduser">
                    <button class="addButton"> <FontAwesomeIcon icon={faUserPlus} />&nbsp;Add User</button>
                </Link>
                </div>

                <Link to="./">
                    <button class="BackButton"> Back</button>
                </Link>
                <div id="Clock">
                    <Clock />
                     &nbsp;<p class="clockUser">&nbsp;{this.state.user.username}</p>

                </div>

                <div className="adminTableDiv">
       
                    <table className="adminTable">

                    <tr>
                        <th>Username </th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                {this.state.Users.map((user) => (
                    <tr>
                        
                        <td>
                            {user}
                        </td>
                        <td>

                            <Link to={{
                                pathname: "./ManageUsers/edituser",
                                state: {
                                    editUser: [{user}]
                                    }
                                }}>
                            <button class="editButton"> <FontAwesomeIcon icon={faUserEdit} /> </button>
                            </Link>
                        </td>
                         <td>
                            <button className='delete' onClick={e =>
                                window.confirm("Are you sure you want to delete the user '" + user  +"'?") && 
                                this.DeleteUser({ user }) 
                            }> <FontAwesomeIcon icon={faUserTimes} /> </button>
                        </td>            
                         
                    </tr>
                ))}
                        <br />
                        <br />
                    </table>
                    
                    </div>
            </div>
        );
    }
}