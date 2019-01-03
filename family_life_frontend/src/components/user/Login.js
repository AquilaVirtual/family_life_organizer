import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";

import "./Login.css";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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

  render() {
    return (
      <Form className="form-group">
        <Form.Field>
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            className="form-control"
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Button primary onClick={()=>{this.props.history.push('/')}}>
          Cancel
        </Button>
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
    );
  }
}

export default LogIn;
