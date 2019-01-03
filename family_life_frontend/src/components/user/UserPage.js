

import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

import UserCard from "./UserCard";

const UserPage = ({ user }) => {
  return (
    <Segment style={{textAlign: "center"}}>
      <UserCard user={{name: user.name, type: user.type}} />
      <Button circular primary icon="add" content="Family Member" />

      <div style={{
        maxWidth: "60rem",
        margin: "0 auto",
        padding: "2rem 0",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {
          user.familyMembers.map((member, id) => (
            <UserCard key={id} user={member} />
          ))

        }
      </div>
    </Segment>
  );
}

export default UserPage;

