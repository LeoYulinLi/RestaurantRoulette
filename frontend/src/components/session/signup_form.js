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
      password2: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
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

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.props.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="session-form-container">
        <form onSubmit={this.handleSubmit} className="form">
          <div className="signup-form">
            <header>
              <div className="form-header">
                <h1>Sign up for Restaurant Roulette</h1>
              </div>
            </header>
            <br />
            <input
              className="input"
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
            />
            <br />
            <input
              className="input"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <input
              className="input"
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
            />
            <br />
            <button className="form-button" onClick={this.handleSubmit}>
              Sign up
            </button>
            {this.renderErrors()}
          </div>
          <div className="form-link" onClick={() => this.props.openModal("login")}>
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
