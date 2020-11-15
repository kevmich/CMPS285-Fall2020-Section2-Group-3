import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import "./ManageUsers.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTimes, faUserPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import Clock from 'react-digital-clock'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Admin extends Component {

    constructor(props) {
        super(props);
        this.DeleteUser = this.DeleteUser.bind(this);
        this.state = {
            Users: [],
            user: (JSON.parse(sessionStorage.getItem("user"))),
            notify: true,
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


    notify = (user) => {
        if (user.name == undefined)
            return;
        toast.success(user.name + " has been " + user.action + "!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        this.setState({
            notify: false
        })

    };
   

    render() {
        const queryString = require('query-string');
        let params = queryString.parse(this.props.location.search)
        if (!(this.state.user.permissionsArray.includes(0))) {
            return <Redirect to="/home" />;
        }

        return (
            <div>
                <div>

                    {this.state.notify ? this.notify(params) : null}
                    <ToastContainer />
                </div>
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
                                //state: {
                                //    editUser: [{user}]
                                //},
                                search: "?name=" + user

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