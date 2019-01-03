import React from 'react';
import { Segment, Header, Image, Button } from 'semantic-ui-react';

const UserPage = ({ user }) => {
  return (
    <Segment>
      {/* <Header as="h2">User Page</Header> */}
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
      <Button circular primary icon="add" content="Family Member" />
      <div style={{
        maxWidth: "60rem",
        margin: "0 auto",
        padding: "2rem 0",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        {
          user.familyMembers.map((member, id) => (
            <Segment key={id} style={{
              width: "18rem",
              margin: "0"
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
              <Header as="h1">{member.name}</Header>
              <p>{member.type}</p>
            </Segment>
          ))
        }
      </div>
    </Segment>
  );
}
 
export default UserPage;