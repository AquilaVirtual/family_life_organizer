import React, { Component } from "react";
import axios from "axios";

import "../css/ResetPassword.css";

//let backend = process.env.REACT_APP_LOCAL_BACKEND;
let backend = "https://familylife.herokuapp.com";
// if (typeof backend !== 'string') {
//   backend = heroku;
// }

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

  resetPassword = e => {
    e.preventDefault();
    let email = {
        email: this.state.email
    };
   console.log("Info", email)
    axios
      .post(`${backend}/api/user/forgotpassword`, email)
      .then(response => {
        // console.log("Getting something", response)
        this.setState({
          email: ""
        });
      })
      .catch(err => {
        // console.log(err)
        this.setState({
          error: true,
          errorMessage: err.response.data.errorMessage
        });
      });
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
          <label forhtml="">Email address</label>
          <input
            type="text"
            placeholder="Email"
            className="reset-input--control"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Continue" className="btn-block" onClick={this.resetPassword}/>
          <span className="danger">You must enter a valid email address.</span>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
