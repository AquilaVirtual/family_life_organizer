import React, { Component } from "react";

import "../css/ResetPassword.css";

class ResetPassword extends Component {
  render() {
    return (
      <div className="container">
        <div className="center-text">
          <h1>Forgot your Password?</h1>
        </div>
        <div>
          Please enter your email address below, and we'll send your password to
          you right away.
        </div>
        <div className="form-wrapper"> 
          <label forHtml="">
            Email address
          </label>
          <input type="text" />
          <input type="submit" value="Continue"/>
          <span className="danger">
            You must enter a valid email address.
          </span>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
