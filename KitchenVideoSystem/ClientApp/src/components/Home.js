import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import { NavLink } from 'reactstrap';
import './Home.css'
import KvsIcon from '../content/KVS-Icon.png';


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
                    <NavLink tag={Link} to="/cashierscreen" className="HomeButton">Cashier</NavLink>
                    <NavLink tag={Link} to="/kitchenscreen" className="HomeButton">Kitchen</NavLink>
                    <button onClick={this.signOut} href="#" className="SignOutButton">Sign Out</button>
                 </div>
            </div>
      );
      
    }
}
