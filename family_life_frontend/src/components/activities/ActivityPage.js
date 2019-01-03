import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Navbar from "../navbar/Navbar";

const ActivityPage = () => {
  return (
    <Segment>
    <Navbar />
      <Header as="h2">Activity Page</Header>
    </Segment>
  );
}
 
export default ActivityPage;