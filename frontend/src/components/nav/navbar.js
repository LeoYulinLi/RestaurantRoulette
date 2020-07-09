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
    if (this.props.loggedIn && this.props.location.pathname !== "/profile") {
      return (
        <div className="button-group">
          <Link to={"/profile"} className="button button-secondary">
            Profile
          </Link>
          <button onClick={this.logoutUser} className="button button-primary">
            Logout
          </button>
        </div>
      );
    } else if (this.props.loggedIn && this.props.location.pathname === "/profile") {
      return (
        <div className="button-group">
          <Link to={"/"} className="button button-secondary">
            Home
          </Link>
          <button onClick={this.logoutUser} className="button button-primary">
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="button-group">
          <button
            onClick={() => this.props.openModal("signup")}
            className="button button-theme"
          >
            Signup
          </button>
          <button
            onClick={() => this.props.openModal("login")}
            className="button button-secondary"
          >
            Login
          </button>
        </div>
      );
    }
  }
 

  render() {
    
    return (
      <div className="main-nav-container">
        <div className="main-nav-content">
          <Link to="/">Restaurant Roulette</Link>
          {this.getLinks()}
        </div>
      </div>
    );
  }
}

export default NavBar;
