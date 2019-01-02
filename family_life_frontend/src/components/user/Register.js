import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

import "../css/Register.css"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      <Form>
        <Form.Field>
          <label>Full Name</label>
          <input
            placeholder="Full Name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder="Username"
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Button type="submit" primary>Submit</Button>
      </Form>
    );
  }
}

export default Register;
