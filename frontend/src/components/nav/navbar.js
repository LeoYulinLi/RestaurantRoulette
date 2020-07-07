import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to={"/profile"}>Profile</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
         <button onClick={() => this.props.openModal('signup')}>Signup</button>
         <button onClick={() => this.props.openModal('login')}>login</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Restaurant Roulette</h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
