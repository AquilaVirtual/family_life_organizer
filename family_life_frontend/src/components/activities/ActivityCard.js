import React, { Component } from "react";
import { Segment, Header, Icon, Confirm, Button } from "semantic-ui-react";
import EditActivity from "./EditActivity";
import AddMemberToActivityModal from "./AddMemberToActivityModal";

class UserCard extends Component {
  state = {
    confirmDelete: false,
    modalMember: false,
    modalEdit: false,
    action: ""
  };

  addMemberToggle = () => {
    this.setState({ modalMember: !this.state.modalMember });
  };
  editToggle = () => {
    this.setState({ modalEdit: !this.state.modalEdit });
  };
  render() {
    const { activity, deleteActivity } = this.props;
    const { confirmDelete, modalMember, modalEdit } = this.state;
    const accountType = localStorage.getItem("accountType");
    return (
      <Segment
        style={{
          width: "18rem",
          margin: "1rem auto"
        }}
        textAlign="center"
      >
        <Header as="h1">{activity.name}</Header>
        <p key={activity._id}>{activity.type}</p>

        <Icon
          style={{ cursor: "pointer", fontSize: "1.4rem" }}
          className="edit outline green"
          onClick={this.editToggle}
        />
        {accountType === "Primary" || accountType === "Spouse" ? (
          <Icon
            style={{ cursor: "pointer", fontSize: "1.4rem" }}
            className="trash alternate outline red"
            onClick={() => this.setState({ confirmDelete: true })}
          />
        ) : null}
        <Button icon="user plus" primary onClick={this.addMemberToggle} />
        <Confirm
          open={confirmDelete}
          size="mini"
          content={`Are you sure you want to remove ${activity.name} ?`}
          onCancel={() => this.setState({ confirmDelete: false })}
          onConfirm={() => {
            deleteActivity(activity._id);
            this.setState({ confirmDelete: false });
          }}
        />
        <AddMemberToActivityModal
          open={modalMember}
          addMemberToggle={this.addMemberToggle}
          activity={this.props.activity}
        />
        <EditActivity
          open={modalEdit}
          editToggle={this.editToggle}
          activity={activity}
          handleEdit={this.props.handleEdit}
        />
      </Segment>
    );
  }
}

export default UserCard;
