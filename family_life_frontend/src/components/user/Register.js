import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

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
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Full Name</label>
          <input placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <label>Username</label>
          <input placeholder="Last Name" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input placeholder="ConfirmPassword" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default Register;
