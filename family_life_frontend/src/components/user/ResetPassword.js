import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { failBox } from "../services/FailBox";

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
      empty: false,
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

  validateEmail = mail => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };
  resetPassword = e => {
    if (this.state.email !== "" && this.validateEmail(this.state.email)) {
      e.preventDefault();
      let email = {
        email: this.state.email
      };
      this.setState({
        empty: false
      });
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
          console.log(err.response.data);
          this.setState({
            error: true,
            errorMessage: err.response.data.errorMessage
          });
          failBox(500, this.state.errorMessage);
        });
    } else {
      this.setState({
        empty: true
      });
    }
  };

  loadContent = () => {
    switch (this.state.current) {
      case "passwordsent":
        return (
          <div className="instruction-container">
            <header className="instruction-header">
              <h1>Password request sent</h1>
            </header>
            <div className="content-wrapper">
              <i className="fas fa-envelope-open-text" />
              <div className="instruction">
                <p>
                  We've emailed you instructions on how to reset your password.
                  If you don't see it, don't forget to check your spam folder.
                </p>
              </div>
            </div>
            <footer className="formFooter">
              <button
                className="loginhelp-btn"
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Go to Log In
              </button>
            </footer>
          </div>
        );

      default:
        return (
          <div className="instruction-container">
            <header id="instruction-header">
              <h1>Forgot your Password?</h1>
            </header>
            <div className="content-wrapper">
              <i className="fas fa-envelope-open-text" />
              <div className="instruction">
                Please enter your email address below, and we'll send you an
                email to reset your password.
              </div>
            </div>
            <div className="form-wrapper">
              <div className="reset-input-wrapper">
                <input
                  required
                  type="text"
                  placeholder="Email"
                  className="reset-input--control"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </div>
              {this.state.empty ? (
                <span className="danger">
                  You must enter a valid email address.
                </span>
              ) : null}
              <footer className="formFooter">
                <button
                  onClick={() => {
                    this.props.history.push("/login");
                  }}
                  className="loginhelp-btn left"
                >
                  Back
                </button>
                <button
                  onClick={this.resetPassword}
                  className="loginhelp-btn right"
                >
                  Submit
                </button>
              </footer>
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
