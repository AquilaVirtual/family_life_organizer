import React from "react";
import { Segment, Header } from "semantic-ui-react";

import ChoreCard from "./ChoreCard";

import { users } from "../../dummyData";

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

  render() {
    const { users } = this.state;
    return (
      <Segment>
        <Header as="h2">Chore Page</Header>

        {users.map((user, i) => (
          <ChoreCard
            key={user.id}
            index={i}
            id={user.id}
            user={user.name}
            chores={user.chores}
            addChore={this.addChore}
            deleteChore={this.deleteChore}
          />
        ))}
      </Segment>
    );
  }
}

export default ChorePage;
