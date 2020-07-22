// src/components/session/signup_form.js

import React from "react";
import { withRouter } from "react-router-dom";
import "./sessions.scss";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.usernameErrors = this.usernameErrors.bind(this);
    this.passwordErrors = this.passwordErrors.bind(this);
    this.passwordTwoErrors = this.passwordTwoErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.signup(user);
  }

  usernameErrors() {
    return (
      <div className="render-errors">
        {this.props.errors.username}
      </div>
    );
  }

  passwordErrors() {
    return (
      <div className="render-errors">
        {this.props.errors.password}
      </div>
    );
  }

  passwordTwoErrors() {
    return (
      <div className="render-errors">
        {this.props.errors.password2}
      </div>
    );
  }

  render() {
    return (
      <div className="session-form-container">
            <div className="form-exit-button">
              <button
                className="close-button"
                onClick={() => this.props.closeModal()}
              >X
              </button>
            </div>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="signup-form">

            <header>
              <div className="form-header">
                <h1>Sign up for Restaurant Roulette</h1>
              </div>
            </header>
     
            <input
              className="input"
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
            />
            {this.usernameErrors()}
           
            <input
              className="input"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            {this.passwordErrors()}
           
            <input
              className="input"
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
            />
         
            {this.passwordTwoErrors()}
            <button className="form-button" onClick={this.handleSubmit}>
              Sign up
            </button>

          </div>
          <div
            className="form-link"
            onClick={() => this.props.openModal("login")}
          >
            <div className="to-other-form">
              Already on Restaurant Roulette? Log in
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
