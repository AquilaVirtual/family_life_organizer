import React, { Component } from "react";
import axios from "axios";
import { Segment, Button } from "semantic-ui-react";

import UserCard from "./UserCard";
import MemberModal from "./MemberModal";
import Navbar from "../navbar/Navbar";
import SiteHeader from "../header/SiteHeader";

let backend = process.env.REACT_APP_LOCAL_BACKEND;
// let backend = "https://familylife.herokuapp.com";
//  if (typeof backend !== 'string') {
//    backend = heroku;
//  }

class UserPage extends Component {
  state = {
    users: [],
    modal: false,
    action: "add",
    member: null
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
      });
  }

  handleModalToggle = (action, member) => {
    this.setState(state => ({
      modal: !state.modal,
      action,
      member
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
      })
      .catch(err => {
        console.log("Error adding member", err.response);
      });
  };
  deleteUser = id => {
    const { users } = this.state;
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };
    axios
      .delete(`${backend}/api/member/${id}`, headers)
      .then(response => {
        const newState = users.filter(user => user._id !== response.data._id);
        this.setState({
          users: newState
        });
      })
      .catch(err => {
        console.log("Error deleting member", err);
      });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }
  render() {
    const { user, modal, action, member } = this.state;

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
        <UserCard
          user={{
            name: localStorage.getItem("name"),
            accountType: localStorage.getItem("accountType"),
            userImage: localStorage.getItem("userImage")
          }}
          deleteUser={() => this.deleteUser()}
          handleModalToggle={() =>
            this.handleModalToggle("Edit", {
              member: { name: user.name, type: user.type }
            })
          }
        />
        {/* Only give ability to add family members if logged-in user is a parent */}
        {localStorage.getItem("accountType") === "Primary" ||
        localStorage.getItem("accountType") === "Spouse" ? (
          <Button
            circular
            primary
            icon="add"
            content="Family Member"
            onClick={() => this.handleModalToggle("Add")}
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
                handleModalToggle={() =>
                  this.handleModalToggle("Edit", {
                    member: member
                  })
                }
              />
            ))}
        </div>
        <MemberModal
          open={modal}
          action={action}
          addMember={this.addMember}
          handleModalToggle={() => this.handleModalToggle()}
          member={member}
        />
      </Segment>
    );
  }
}

export default UserPage;
