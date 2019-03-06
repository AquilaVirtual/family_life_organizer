import React from 'react';
import { Segment, Header, Icon, Confirm } from 'semantic-ui-react';

import ActivityModal from './ActivityModal';


class UserCard extends React.Component {
  state = {
    confirmDelete: false,
    confirmEdit: false,
    action: "", 
  }
  render() {
    const { activity, deleteActivity, handleModalToggle } = this.props;
    const { confirmDelete, confirmEdit,  action } = this.state;
    const accountType = localStorage.getItem("accountType");    
    return (
      <Segment style={{
        width: "18rem",
        margin: "1rem auto"
      }}
        textAlign="center"
      >        
        <Header as="h1">{activity.name}</Header>
        <p key={activity._id}>{activity.type}</p>

        <Icon style={{ cursor: "pointer", fontSize: "1.4rem" }}
          className="edit outline green"
          onClick={() => this.setState({ confirmEdit: true, action: "Edit" })}
        />
        {accountType === "Primary" || accountType === "Spouse" ? (
        <Icon style={{ cursor: "pointer", fontSize: "1.4rem" }}
          className="trash alternate outline red"
          onClick={() => this.setState({ confirmDelete: true })}
        />):(null)
        }
        <Confirm open={confirmDelete}
          size="mini"
          content={`Are you sure you want to remove ${activity.name} ?`}
          onCancel={() => this.setState({ confirmDelete: false })}
          onConfirm={() => {
            deleteActivity(activity._id);
            this.setState({ confirmDelete: false })}
          }
        />
        <ActivityModal
        open={confirmEdit}
        toggleEdit={() => this.setState({ confirmEdit: false })}
        activity={this.props.activity}
        _id={this.props.activity._id}
        action={action}        
        />
      </Segment>
    );
  }
}

export default UserCard;