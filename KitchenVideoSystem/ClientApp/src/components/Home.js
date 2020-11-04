import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import { NavLink } from 'reactstrap';
import './Home.css'
import KvsIcon from '../content/KVS-Icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            islogout: false
        };
    }
    signOut = () => {
        sessionStorage.removeItem("token");
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
                <div className="ButtonList">
                    <img src={KvsIcon} height="120px" class="center" />
                    <h1 className="HomeTitle">Welcome to KVS!</h1>
                    <table>
                        <tr>
                            <td>
                                <NavLink tag={Link} to="/cashierscreen" className="HomeButton"><FontAwesomeIcon icon={faCashRegister} />&nbsp;Cashier</NavLink>
                            </td>
                            <td width="10%">
                            </td>
                            <td>
                                <NavLink tag={Link} to="/kitchenscreen" className="HomeButton"><FontAwesomeIcon icon={faFire} />&nbsp;Kitchen</NavLink>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3"> <NavLink tag={Link} to="/admin" className="AdminButton"><FontAwesomeIcon icon={faCog} />&nbsp;Manage Users</NavLink>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <button onClick={this.signOut} href="#" className="SignOutButton"><FontAwesomeIcon icon={faSignOutAlt}/>&nbsp;Sign Out</button>
                            </td>
                        </tr>
                    </table>
                    
                    
                 </div>
            </div>
      );
      
    }
}
