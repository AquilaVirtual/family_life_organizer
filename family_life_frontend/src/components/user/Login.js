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
      selectedOption: "",
      primary: "primary",
      other: "other",
      url:"",
      error: false,
      open: false,
      errorMessage: ""
    };
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOptionChange = event => {
    event.preventDefault();
    this.setState({ selectedOption: event.target.value });
  };

  login = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    if(this.state.selectedOption === "") {
      this.setState({
        errorMessage: "Please select an account type"
      })
    }   
    else if(this.state.selectedOption === "primary") {
      this.setState({
        url: "http://localhost:3002/api/user/login"
      })
    }
    else if(this.state.selectedOption === "other") {
      this.setState({
        url: "http://localhost:3002/api/member/login"
      })
      }
      const url = this.state.url;
      console.log("Current url", url)
    axios
      .post(`${url}`, user)
      .then(response => {
        console.log("Fire", response.data);
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
        console.log("What's happening here", err);
        this.setState({
          error: true,
         // errorMessage: err.response.data.error
        });
      });    
  };

  render() {
    return (
      <div>
        <LoginHeader name="Login" />
        <Form className="form-group" onSubmit={this.login}>  
        <div className="errorMessage">{this.state.errorMessage}</div>        
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
            <div className="radio">
              <label>
                <input
                  type="radio"
                  checked={this.state.selectedOption === "primary"}
                  value={this.state.primary}
                  onChange={this.handleOptionChange}
                />
                Primary account
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  checked={this.state.selectedOption === "other"}
                  value={this.state.other}
                  onChange={this.handleOptionChange}
                />
                Other account
              </label>
            </div>
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
