import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

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
        <div className="button-group">
          <Link to={"/profile"} className="button button-secondary">Profile</Link>
          <button onClick={this.logoutUser} className="button button-primary">Logout</button>
        </div>
      );
    } else {
      return (
        <div className="button-group">
          <Link to={"/signup"} className="button button-theme">Signup</Link>
          <Link to={"/login"} className="button button-secondary">Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="main-nav-container">
        <Link to="/">Restaurant Roulette</Link>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
