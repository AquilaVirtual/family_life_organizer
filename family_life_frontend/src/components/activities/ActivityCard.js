import React from 'react';
import { Segment, Header, Icon, Confirm } from 'semantic-ui-react';

class UserCard extends React.Component {
  state = {
    confirmDelete: false,
  }
  render() {
    const { activity, deleteActivity, handleModalToggle } = this.props;
    const { confirmDelete } = this.state;

    return (
      <Segment style={{
        width: "18rem",
        margin: "1rem auto"
      }}
        textAlign="center"
      >  
        <Header as="h1">{activity.name}</Header>
        <p>{activity.type}</p>

        <Icon style={{ cursor: "pointer", fontSize: "1.4rem" }}
          className="edit outline green"
          onClick={handleModalToggle}
        />
        <Icon style={{ cursor: "pointer", fontSize: "1.4rem" }}
          className="trash alternate outline red"
          onClick={() => this.setState({ confirmDelete: true })}
        />
        <Confirm open={confirmDelete}
          size="mini"
          content={`Are you sure you want to remove ${activity.name} ?`}
          onCancel={() => this.setState({ confirmDelete: false })}
          onConfirm={() => {
            deleteActivity();
            this.setState({ confirmDelete: false })}
          }
        />
      </Segment>
    );
  }
}

export default UserCard;