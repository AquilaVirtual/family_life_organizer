import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";

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
  createUser = event => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorMessage: "Passwords don't match!"
      });
      return;
    }
    const user = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    axios //This is for when backend is ready
      .post(``, user)
      .then(response => {
        this.props.history.push(`/login`);
        this.setState({
          error: false
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          errorMessage: err.response.data.error
        });
      });
  };
  render() {
    return (
      <Form onSubmit={this.createUser}>
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

export default withRouter(Register);
