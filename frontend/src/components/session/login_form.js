import React from 'react';
import { withRouter } from 'react-router-dom';
import "./sessions.scss";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
    this.usernameErrors = this.usernameErrors.bind(this);
    this.passwordErrors = this.passwordErrors.bind(this);
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
    };

    this.props.login(user);
    this.props.history.push('/main');
  }


  handleDemoLogin(e) {
    e.preventDefault();
    this.props.login({ username: "bilbo", password: "123456" });
    this.props.history.push('/main');
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
          <header>
            <div className="form-header">
              <h1>Log in to Restaurant Roulette</h1>
            </div>
          </header>

          <div>
            <br />
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
          </div>
         
          <button className="form-button" onClick={this.handleSubmit}>
            Log in
          </button>
          <button
            type="button"
            onClick={this.handleDemoLogin}
            className="demo-login"
            >
            Demo Login
          </button>

          <div
            className="form-link"
            onClick={() => this.props.openModal("signup")}
          >
            <div className="to-other-form">
              New to Restaurant Roulette? Sign up
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);