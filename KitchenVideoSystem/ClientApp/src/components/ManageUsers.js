import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import "./ManageUsers.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTimes, faUserPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import Clock from 'react-digital-clock'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import AddUser from './AddUser';
import EditUser from './EditUser';
import { add } from 'lodash';


//const customStyles = {
 //   content: {
    //   top: '50%',
    //   left: '0%',
    //     right: '60%',
    //    bottom: '0%',
    //    marginRight: '20%',
    //   transform: 'translate(-50%, -50%)'
  //}
//};


export default class Admin extends Component {

    constructor(props) {
        super(props);
        this.DeleteUser = this.DeleteUser.bind(this);
        this.state = {
            Users: [],
            user: (JSON.parse(sessionStorage.getItem("user"))),
            notify: true,
            showModal: false,
            showEditModal: false,
            certainUser: ''
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.handleOpenModalEdit = this.handleOpenModalEdit.bind(this);
        this.handleCloseModalEdit = this.handleCloseModalEdit.bind(this);

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


    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
        this.GetAllUsers();
    }

    handleOpenModalEdit(user) {
        if (this.state.showEditModal == false) {
            this.setState({ showEditModal: true, certainUser: user });
        }
    }

    handleCloseModalEdit() {
        this.setState({ showEditModal: false });
        this.GetAllUsers();
    }

    editModal() {
        return 
    }


    render() {
        const queryString = require('query-string');
        let params = queryString.parse(this.props.location.search)
        if (!(this.state.user.permissionsArray.includes(0))) {
            return <Redirect to="/Home" />;
        }

        return (
            <div>



                <Modal className = "Modal"
                    isOpen={this.state.showEditModal}
                    contentLabel="Minimal Modal Example"
                    onRequestClose={this.handleCloseModalEdit}
                   // style={customStyles}

                >
                    <EditUser closeModalEdit={this.handleCloseModalEdit} usernameEdit={this.state.certainUser} />
                </Modal>
                

                <div>

                    {this.state.notify ? this.notify(params) : null}
                    <ToastContainer />
                </div>
                <div className="title">
                    <b style={{ fontSize: "60px" }}> Manage Users</b> <br/>
                    <button class="addButton" onClick={this.handleOpenModal}> <FontAwesomeIcon icon={faUserPlus} />&nbsp;Add User</button>
                    <Modal className = "Modal"
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                        onRequestClose={this.handleCloseModal}
                        //style={customStyles}

                    >
                        <AddUser closeModal={this.handleCloseModal}/>
                    </Modal>
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
                            <button class="editButton" onClick={() => this.handleOpenModalEdit(user)} > <FontAwesomeIcon icon={faUserEdit} /> </button>
                                
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