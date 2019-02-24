import React,  { Component } from "react";
import axios from "axios";
import { Segment, Header } from "semantic-ui-react";

import ChoreCard from "./ChoreCard";

import { users } from "../../dummyData";
import Navbar from "../navbar/Navbar";
import SiteHeader from '../header/SiteHeader';
class ChorePage extends Component {
  state = {
    users: [],
    user: []
  };

  componentWillMount() {
    this.setState({
      users
    });
  }
  componentDidMount() {    
    let url = "";
    const accountType = localStorage.getItem("accountType");
    if (accountType === "Primary") {
       url = "http://localhost:3002/api/user/family";
    }
   else if (accountType === "Child" || accountType === "Spouse" || accountType === "Relative") {
       url = "http://localhost:3002/api/member/family";
    }
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");   
    const headers = { headers: { authorization: token } };
    axios.get(`${url}/${username}`, headers)
    .then(response => {
      console.log("Getting users for chores", response.data) 
      this.setState({
        users: response.data 
      });
    })
    .catch(err => {
      console.log("Error adding member", err)
    })    
  }
  addChore = (userId, newChore) => {
    this.setState(state => ({
      users: state.users.map(user => {
        if (user.id === userId) {
          return { ...user, chores: [...user.chores, newChore] };
        }
        return user;
      })
    }));
  };

  deleteChore = (userId, choreId) => {
    this.setState(state => ({
      users: state.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            chores: user.chores.filter((chore, id) => id !== choreId)
          };
        }
        return user;
      })
    }));
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
    const { users } = this.state;
    return (
      <Segment style={{textAlign: "center", border: 'none', boxShadow: '0px 0px 0px', height: '100vh', padding: '0px 0px'}}>
        <Navbar />
        
        <SiteHeader name='Chores'></SiteHeader>

        {users.map((user, i) => (
          <ChoreCard
            key={user.id}
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
