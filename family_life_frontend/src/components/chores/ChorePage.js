import React, { Component } from "react";
import axios from "axios";
import { Segment, Header } from "semantic-ui-react";

import ChoreCard from "./ChoreCard";

import Navbar from "../navbar/Navbar";
import SiteHeader from "../header/SiteHeader";
class ChorePage extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };
    axios
      .get(`http://localhost:3002/api/chore/${username}`)
      .then(response => {
        console.log("Getting users for chores", response.data);
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log("Error adding member", err);
      });
  }
  addChore = newChore => {
    const { users } = this.state;
    console.log("Adding new chore", newChore);
    axios
      .post("http://localhost:3002/api/chore/create", newChore)
      .then(response => {
        users.forEach(user => {
          if (user._id === response.data.createdFor) {
            user.chores.push(response.data);
          }
        });
        this.setState({
          users: users
        });
      })
      .catch(err => {
        console.log("Error add chore", err);
      });
  };

  deleteChore = id => {
    const { users } = this.state;
    console.log("Deletable ID", id);
    axios
      .delete(`http://localhost:3002/api/chore/deletechore/${id}`)
      .then(response => {
      const updatedUsers = users.filter(user => user._id !== response.data.createdFor);
        this.setState({
          users: updatedUsers
        });
        console.log("Updated users Chores", updatedUsers)
      })
      .catch(err => {
        console.log("Something went wrong while deleteing chore", err);
      });
  };

  updateStatus = (userId, choreId) => {
    this.setState(state => ({
      users: state.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            chores: user.chores.map((chore, id) => {
              if (id === choreId) {
                return {
                  ...chore,
                  status:
                    chore.status === "not started" ? "in progress" : "completed"
                };
              }
              return chore;
            })
          };
        }
        return user;
      })
    }));
  };

  render() {
    console.log("What we have on state", this.state.users);
    const { users } = this.state;
    return (
      <Segment
        style={{
          textAlign: "center",
          border: "none",
          boxShadow: "0px 0px 0px",
          height: "100vh",
          padding: "0px 0px"
        }}
      >
        <Navbar />

        <SiteHeader name="Chores" />

        {users.map((user, i) => (
          <ChoreCard
            key={user._id}
            index={i}
            id={user.id}
            user={user.name}
            chores={user.chores}
            addChore={this.addChore}
            deleteChore={this.deleteChore}
            updateStatus={this.updateStatus}
          />
        ))}
      </Segment>
    );
  }
}

export default ChorePage;
