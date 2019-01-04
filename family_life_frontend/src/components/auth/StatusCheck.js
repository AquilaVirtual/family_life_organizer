import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

const StatusCheck = ({ history, toggleModal}) => {
  return (
    <Segment>
      <p>You're Not Signed In</p>
      <Button icon="home" content="Home"
        primary
        onClick={() => history.push("/")}
      />
      <Button icon="sign-in" content="Sign In"
        primary
        onClick={toggleModal}
      />
    </Segment>
  );
}

export default StatusCheck;