import React from 'react';
import { Segment, Image, Header } from 'semantic-ui-react';

const UserCard = ({ user }) => {
  return (
    <Segment style={{
      width: "18rem",
      margin: "1rem auto"
    }}
    textAlign="center"
    >
      <Image
        centered
        src={
          user && user.url
            ? user.url
            : "https://react.semantic-ui.com/images/wireframe/square-image.png"
        }
        size="small"
        circular
      />
      <Header as="h1">{user.name}</Header>
      <p>{user.type}</p>
    </Segment>
  );
}

export default UserCard;