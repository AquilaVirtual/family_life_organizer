import React, { Component } from "react";

import "../css/ResetPassword.css";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      error: false,
      errorMessage: ""
    };
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div className="reset-container">
        <div className="center-text">
          <h1>Forgot your Password?</h1>
        </div>
        <div>
          Please enter your email address below, and we'll send you and an email
          to reset your password.
        </div>
        <div className="form-wrapper">
          <label forHtml="">Email address</label>
          <input
            type="text"
            placeholder="Email"
            className="reset-input--control"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Continue" className="btn-block" />
          <span className="danger">You must enter a valid email address.</span>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
