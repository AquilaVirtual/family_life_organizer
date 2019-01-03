import React from "react";
import { Segment, Header } from "semantic-ui-react";

import ChoreCard from "./ChoreCard";

import { users } from "../../dummyData"

class ChorePage extends React.Component {
  state = {
    users: []
  };

  componentWillMount() {
    this.setState({
      users,
    })
  }

  render() {
    const { users } = this.state;
    return (
      <Segment>
        <Header as="h2">Chore Page</Header>

        {users.map((user, i) => (
          <ChoreCard key={i} index={i} user={user.name} chores={user.chores} />
        ))}
      </Segment>
    );
  }
}

export default ChorePage;
