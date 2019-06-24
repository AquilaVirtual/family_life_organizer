import React, { Component } from "react";
import axios from "axios";
import { Segment, Button } from "semantic-ui-react";

import UserCard from "./UserCard";
import MemberModal from "./MemberModal";
import Navbar from "../navbar/Navbar";
import SiteHeader from "../header/SiteHeader";
import { displaySuccessBox } from "../services/SuccessBox";

import "../css/UserPage.css";

//let backend = process.env.REACT_APP_LOCAL_BACKEND;
let backend = "https://familylife.herokuapp.com";
//  if (typeof backend !== 'string') {
//    backend = heroku;
//  }

class UserPage extends Component {
  state = {
    users: [],
    modal: false,
    action: "add",
    member: null,
    errorMessage: ""
  };

  componentDidMount() {
    let url = "";
    const accountType = localStorage.getItem("accountType");
    if (accountType === "Primary") {
      url = `${backend}/api/user/family`;
    } else if (
      accountType === "Child" ||
      accountType === "Spouse" ||
      accountType === "Relative"
    ) {
      url = `${backend}/api/member/family`;
    }
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };
    axios
      .get(`${url}/${username}`, headers)
      .then(response => {
        console.log("Getting users", response);
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log("Error getting members", err.response);
        this.setState({
          errorMessage: err.response.data.errorMessage
        });
      });
  }

  handleModalToggle = () => {
    this.setState(state => ({
      modal: !state.modal
    }));
  };

  addMember = member => {
    console.log("New member credentials", member);
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };
    axios
      .post(`${backend}/api/member/create`, member, headers)
      .then(response => {
        this.setState({
          users: [...this.state.users, response.data]
        });
        //displaySuccessBox is invoked
        displaySuccessBox(response.status, response.data.name);
      })
      .catch(err => {
        console.log("Error adding member", err.response);
        this.setState({
          errorMessage: err.response.data.errorMessage
        });
      });
  };
  deleteUser = id => {
    const { users } = this.state;
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };
    axios
      .delete(`${backend}/api/member/${id}`, headers)
      .then(response => {
        const updatedUsers = users.filter(
          user => user._id !== response.data._id
        );
        this.setState({
          users: updatedUsers
        });
      })
      .catch(err => {
        console.log("Error deleting member", err);
        this.setState({
          errorMessage: err.response.data.errorMessage
        });
      });
  };
  render() {
    const { modal, action, member } = this.state;

    if (!localStorage.getItem("name")) return <div>No User</div>;
    return (
      <Segment
        style={{
          textAlign: "center",
          border: "none",
          boxShadow: "0px 0px 0px",
          height: "100vh",
          padding: "0px 0px",
          marginBottom: "30px"
        }}
      >
        <Navbar />
        <SiteHeader name="Users" />
        {/* Only give ability to add family members if logged-in user is a parent */}
        {localStorage.getItem("accountType") === "Primary" ||
        localStorage.getItem("accountType") === "Spouse" ? (
          <Button
            circular
            primary
            icon="add"
            content="Family Member"
            onClick={() => this.handleModalToggle()}
          />
        ) : null}
        <div
          style={{
            maxWidth: "60rem",
            margin: "0 auto",
            padding: "2rem 0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.state.users &&
            this.state.users.map(member => (
              <UserCard
                key={member._id}
                user={member}
                deleteUser={() => this.deleteUser(member._id)}
              />
            ))}
        </div>
        <MemberModal
          open={modal}
          action={action}
          addMember={this.addMember}
          handleModalToggle={() => this.handleModalToggle("Add")}
          member={member}
        />
      </Segment>
    );
  }
}

export default UserPage;
