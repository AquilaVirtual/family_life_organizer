import React from "react";
import { Segment, Header } from "semantic-ui-react";

import ChoreCard from "./ChoreCard";

import { users } from "../../dummyData";
import Navbar from "../navbar/Navbar";
import SiteHeader from '../header/SiteHeader';
class ChorePage extends React.Component {
  state = {
    users: []
  };

  componentWillMount() {
    this.setState({
      users
    });
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
