import React from 'react';
import { Segment, Header, Image } from 'semantic-ui-react';

const UserPage = ({ user }) => {
  return (
    <Segment>
      <Header as="h2">User Page</Header>
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
      <Header as="h1">{user.username}</Header>
    </Segment>
  );
}
 
export default UserPage;