import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

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
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Email" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default LogIn;
