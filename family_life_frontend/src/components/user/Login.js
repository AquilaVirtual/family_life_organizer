import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Form, Radio } from "semantic-ui-react";
import axios from "axios";
import LoginHeader from "./LoginHeader";

import "../css/Login.css";

//let backend = process.env.REACT_APP_LOCAL_BACKEND;
let backend = "https://familylife.herokuapp.com";
// if (typeof backend !== 'string') {
//   backend = heroku;
// }

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
      open: false,
      errorMessage: "",
      value: ""
    };
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRadioOptionChange = (e, { value }) => this.setState({ value: value });
  login = event => {
    event.preventDefault();
    let url = ""; 
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    if (!this.state.value) {
      this.setState({
        error: true,
        errorMessage: "Please select account type"
      });
    } else if (this.state.value === "primary") {
      url = `${backend}/api/user/login`;
    } else if (this.state.value === "other") {
      url = `${backend}/api/member/login`;
    }
    axios
      .post(`${url}`, user)
      .then(response => {
        this.setState({
          error: false
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.userFound.name);
        localStorage.setItem(
          "accountType",
          response.data.userFound.accountType
        );
        localStorage.setItem("username", response.data.userFound.username);
        localStorage.setItem("userId", response.data.userId);
        setTimeout(() => {
          this.props.history.push("/");
        }, 200);
      })
      .catch(err => {
        //console.log("Error here in login", err.response);
        this.setState({
          error: true,
          errorMessage: err.response.data.errorMessage
        });
      });
  };

  render() {
    return (
      <div>
        <LoginHeader name="Login" />
        <Form className="form-group" onSubmit={this.login}>
          {this.state.error ? (
            <div className="errorMessage">{this.state.errorMessage}</div>
          ) : null}
          <Form.Field>
            <input
              id="form-control"
              placeholder="Username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleInputChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <input
              id="form-control"
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </Form.Field>
          <div className="radio-buttons-wrapp">
            <Form.Field>
              <Radio
                label="Primary account"
                name="radioGroup"
                value="primary"
                checked={this.state.value === "primary"}
                onChange={this.handleRadioOptionChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label=" Other account"
                name="radioGroup"
                value="other"
                checked={this.state.value === "other"}
                onChange={this.handleRadioOptionChange}
              />
            </Form.Field>
          </div>
          <Button
            className="form-controlBtn"
            primary
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            Cancel
          </Button>
          <Button className="form-controlBtn" type="submit" primary>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(LogIn);
