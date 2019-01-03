import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Navbar from "../navbar/Navbar";

const CalendarPage = () => {
  return (
    <Segment>
    <Navbar />
      <Header as="h2">Calendar Page</Header>
    </Segment>
  );
}
 
export default CalendarPage;