import React from "react";
import { Segment, Header } from "semantic-ui-react";

import ChoreCard from "./ChoreCard";

// dummy data
const users = [
  {
    name: "Dad",
    chores: [
      { title: "Mow lawn", status: "not started" },
      { title: "Fix sink", status: "in progress" }
    ]
  },
  {
    name: "Mom",
    chores: [{ title: "Buy grocery", status: "not started" }]
  },
  {
    name: "Jan",
    chores: [
      { title: "Wash dishes", status: "completed" },
      { title: "Clean room", status: "in progress" }
    ]
  },
  {
    name: "Tom",
    chores: [
      { title: "Clean bathroom", status: "not started" },
      { title: "Walk dog", status: "completed" }
    ]
  }
];

const ChorePage = () => {
  return (
    <Segment>
      <Header as="h2">Chore Page</Header>

      {users.map((user, i) => (
        <ChoreCard key={i} index={i} user={user.name} chores={user.chores} />
      ))}
    </Segment>
  );
};

export default ChorePage;
