import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import { NavLink } from 'reactstrap';


export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            islogout: false
        };
    }
    signOut = () => {
        localStorage.removeItem("token");
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
                <button onClick={this.signOut} href="#">
                    Sign Out
            </button>
            <NavLink tag={Link} to="/cashierscreen">Cashier</NavLink>
            <br />
            <NavLink tag={Link} to="/kitchenscreen">Kitchen</NavLink>
            <br />
            <NavLink tag={Link} to="/login">Login</NavLink>
      </div>
      );
      
    }
}
