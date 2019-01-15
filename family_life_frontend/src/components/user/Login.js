import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import LoginHeader from "./LoginHeader";

import "./Login.css";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
      open: false,
      errorMessage: ""
    };
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  login = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post(`http://localhost:3002/api/user/login`, user)
      .then(response => {
        console.log("Fire", response);
        this.setState({
          error: false
        });
        setTimeout(() => {
          this.props.history.push("/");
        }, 200);
      })
      .catch(err => {
        console.log("What's happening here", err);
        this.setState({
          error: true,
          errorMessage: err.response.data.error
        });
      });
  };
  render() {
    return (
      <div>
        <LoginHeader name="Login" />
        <Form className="form-group" onSubmit={this.login}>
          <div style={{ color: "red" }}>{this.state.errorMessage}</div>
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
