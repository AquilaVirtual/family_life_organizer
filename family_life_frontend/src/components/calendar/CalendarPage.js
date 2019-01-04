import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

import StatusCheck from "../auth/StatusCheck";

const CalendarPage = (props) => {
  const { currentUser, history, toggleModal } = props;

  if (!currentUser) return (
    <StatusCheck
      history={history}
      toggleModal={toggleModal}
    />
  )

  return (
    <Segment style={{textAlign: "center", border: 'none', boxShadow: '0px 0px 0px', height: '100vh', padding: '0px 0px'}}>
      <Header as="h1">FamilyLife Calendar</Header>
    </Segment>
  );
}
 
export default CalendarPage;