import React, { Component } from "react";
import { withRouter } from "react-router-dom"
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
      errorMessage: "",
      current: ""
    };
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  changeState = () => {
    this.setState({
      current: "passwordsent"
    });
  };
  resetPassword = e => {
    e.preventDefault();
    let email = {
      email: this.state.email
    };
    console.log("Info", email);
    axios
      .post(`${backend}/api/user/forgotpassword`, email)
      .then(response => {
        console.log("Getting something", response);
        this.setState({
          email: ""
        });
        this.changeState();
      })
      .catch(err => {
        // console.log(err)
        this.setState({
          error: true,
          errorMessage: err.response.data.errorMessage
        });
      });
  };

  loadContent = () => {
    switch (this.state.current) {
      case "passwordsent":
        return (
          <div className="instruction-container"> 
            <header>
              <h1 className="instruction-header">Password request sent</h1>
            </header>
            <div className="content-wrapper">
            <i className="fas fa-envelope-open-text"></i>
            <div className="instruction">
              <p>
                We've emailed you instructions on how to reset your password. If
                you don't see it, don't forget to check your spam folder.
              </p>
            </div>
            </div>
            <footer className="formFooter">
              <button className="loginhelp-btn" onClick={()=>{this.props.history.push("/login")}}>Go to Log In</button>
            </footer>
          </div>
        );

      default:
        return (
          <div>
            <div className="center-text">
              <h1>Forgot your Password?</h1>
            </div>
            <div>
              Please enter your email address below, and we'll send you and an
              email to reset your password.
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
              <footer className="formFooter">
              <button onClick={()=>{this.props.history.push("/login")}} className="loginhelp-btn" >Back</button>           
              <button onClick={this.resetPassword} className="loginhelp-btn" >Submit</button>   
              </footer>
              <span className="danger">
                You must enter a valid email address.
              </span>
            </div>
          </div>
        );
    }
  };
  render() {
    return <div className="reset-container">{this.loadContent()}</div>;
  }
}

export default withRouter(ResetPassword);
