import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import './Home.css'
import KvsIcon from '../content/KVS-Icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister, faCog, faFire, faSignOutAlt, faClipboardList} from '@fortawesome/free-solid-svg-icons'
import Clock from 'react-digital-clock'

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            islogout: false,
            user: (JSON.parse(sessionStorage.getItem("user"))),
        };
    }
    signOut = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        this.setState({
            islogout: true
        });
    };

    componentDidMount() {
        document.title = "Home";
    }

    render() {
        if (this.state.islogout) {
            return <Redirect to="/" />;
        }
        return (

            <div>
                <div id="Clock">
                    <Clock />
                    &nbsp;<p class="clockUser">&nbsp;{this.state.user.username}</p>
                </div>
                <div className="ButtonList">
                    <img src={KvsIcon} height="120px" class="center" />
                    <h1 className="HomeTitle">Welcome to KVS, {this.state.user.username}!</h1>
                    <table>
                        <tr>
                            {this.state.user.permissionsArray.includes(1) && this.state.user.permissionsArray.includes(2) ? <td>
                                <NavLink tag={Link} to="/cashierscreen" className="HomeButton"><FontAwesomeIcon icon={faCashRegister} />&nbsp;Cashier</NavLink>
                            </td> : null}

                            {this.state.user.permissionsArray.includes(1) && !(this.state.user.permissionsArray.includes(2)) ? <td colSpan="3">
                                <NavLink tag={Link} to="/cashierscreen" className="HomeButton"><FontAwesomeIcon icon={faCashRegister} />&nbsp;Cashier</NavLink>
                            </td> : null}

                            {this.state.user.permissionsArray.includes(1) && (this.state.user.permissionsArray.includes(2)) ? <td width="10%">
                            </td> : null}

                            {this.state.user.permissionsArray.includes(2) && this.state.user.permissionsArray.includes(1) ? <td>
                                <NavLink tag={Link} to="/kitchenscreen" className="HomeButton"><FontAwesomeIcon icon={faFire} />&nbsp;Kitchen</NavLink>
                            </td> : null}

                            {this.state.user.permissionsArray.includes(2) && !(this.state.user.permissionsArray.includes(1)) ? <td colSpan="3">
                                <NavLink tag={Link} to="/kitchenscreen" className="HomeButton"><FontAwesomeIcon icon={faFire} />&nbsp;Kitchen</NavLink>
                            </td> : null}

                        </tr>
                        <tr>
                            {this.state.user.permissionsArray.includes(0) ? <td colSpan="3"> <NavLink tag={Link} to="/ManageUsers" className="AdminButton"><FontAwesomeIcon icon={faCog} />&nbsp;Manage Users</NavLink>
                            </td> : null}

                        </tr>

                        <tr>
                            <td colSpan="3"> <NavLink tag={Link} to="/Log" className="LogButton"><FontAwesomeIcon icon={faClipboardList} />&nbsp;Order Log</NavLink>
                            </td>

                        </tr>

                        <tr>
                            <td colSpan="3">
                                <button onClick={this.signOut} href="#" className="SignOutButton"><FontAwesomeIcon icon={faSignOutAlt} />&nbsp;Sign Out</button>
                            </td>
                        </tr>
                    </table>

                </div>
            </div>
        );
    }
}