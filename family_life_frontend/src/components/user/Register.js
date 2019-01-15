import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import LoginHeader from "./LoginHeader";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",     
      email: "",
      username: "",
      password: "",
      child: false,
      id: 2,
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
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
      // child: this.state.child,
      // id:    this.state.id
    };
    axios
      .post(`http://localhost:3002/api/user/register`, user)
      .then(response => {
        console.log("Fire response here", response);
        console.log("Fire error here", this.state.errorMessage);
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
        console.log("Error in catch", err);
      });
  };
  render() {
    return (
      <div>
        <LoginHeader name="Register" />
        <Form
          onSubmit={this.createUser}
          className="form-group form-group--register"
        >
          <Form.Field>
            <input
              required
              id="form-control"
              placeholder="Full Name"
              name="name"
              type="text"
              value={this.state.firstname}
              onChange={this.handleInputChange}
            />
          </Form.Field>          
          <Form.Field>
            <input
              required
              id="form-control"
              placeholder="Email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              required
              id="form-control"
              placeholder="Username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              required
              id="form-control"
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              required
              id="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleInputChange}
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

export default withRouter(Register);
