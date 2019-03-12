import React from "react";
import axios from "axios";
import { Button, Modal, Form, Select } from "semantic-ui-react";

class ActivityModal extends React.Component {
  state = {
    activityName: "",
    activityType: "",
    memberName: ""
  };
  componentWillReceiveProps(props) {
    if (props.activity) {
      this.setState({
        activityName: props.activity.name,
        activityType: props.activity.type
      });
    }
  }
  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSelect = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  };
  handleAddMember = () => {
    const {
      addActivity,
      handleModalToggle,
      activity,
      editActivity
    } = this.props;
    const { activityName, activityType } = this.state;

    const newActivity = {
      name: activityName,
      type: activityType,
      username: localStorage.getItem("username")
    };
    this.setState({
      activityName: "",
      activityType: ""
    });

    if (this.props.action === "Edit") {
      axios
        .put(`http://localhost:3002/api/activity/${activity._id}`, newActivity)
        .then(activities => {})
        .catch(err => {
          console.log("We have a problem", err);
        });
      this.props.handleActivityToggle();
    } else if (this.props.action === "Add") {
      addActivity(newActivity);
      handleModalToggle();
    }
  };
  addMemberToActivity = () => {
    console.log("New member", this.state.memberName);
    const { activity } = this.props;
    const username = localStorage.getItem("username");
    axios
      .put(
        `http://localhost:3002/api/activity/add_member_to_activity/${
          activity._id
        }`,
        { username }
      )
      .then(activities => {
        console.log("Add member fired!");
      })
      .catch(err => {
        console.log("We have a problem", err);
      });
    this.props.handleActivityToggle();
  };

  toggleAction = () => {
    if (this.props.action === "Edit") {
      this.props.handleActivityToggle();
    } else if (this.props.action === "Add") {
      this.props.handleModalToggle();
    } else if (this.props.action === "Add Person") {
      this.props.handleActivityToggle();
    }
  };
  render() {
    const { action, open, handleModalToggle, _id } = this.props;
    console.log("Some Id in Activity", _id);
    const { activityName, activityType, memberName } = this.state;
    console.log("Action has been fired: ", this.props.action);
    return (
      <Modal size="mini" open={open}>
        {action === "Edit" || action === "Add" ? (
          <Modal.Header>{`${action} an activity`}</Modal.Header>
        ) : (
          <Modal.Header>{`Add a family member to this activity`}</Modal.Header>
        )}
        <Modal.Content style={{ marginBottom: "2rem" }}>
          {action === "Edit" || action === "Add" ? (
            <Form onSubmit={this.handleAddMember}>
              <Form.Input
                required
                placeholder="Add an activity..."
                onChange={this.handleChange}
                name="activityName"
                value={activityName}
              />
              <Form.Input
                style={{ width: "100%" }}
                placeholder="Add activity type..."
                onChange={this.handleChange}
                name="activityType"
                value={activityType}
              />
              <div style={{ padding: "1rem 0" }}>
                <Button
                  primary
                  floated="right"
                  type="submit"
                  icon={`${action === "Add" ? "add" : "edit"}`}
                  content={`${action === "Add" ? "Add" : "Edit"}`}
                  onClick={handleModalToggle("Add Person")}
                />
                <Button
                  floated="right"
                  type="cancel"
                  icon="cancel"
                  content="Cancel"
                  onClick={this.toggleAction}
                />
              </div>
            </Form>
          ) : (
            <Form onSubmit={this.addMemberToActivity}>
              <Form.Input
                placeholder="Type full name of person"
                onChange={this.handleChange}
                name="memberName"
                value={memberName}
              />
              <div style={{ padding: "1rem 0" }}>
                <Button
                  primary
                  floated="right"
                  type="submit"
                  content="Member"
                  icon={`${action === "Add Person" ? "add" : "add"}`}
                />
                <Button
                  floated="right"
                  type="cancel"
                  icon="cancel"
                  content="Cancel"
                  onClick={this.toggleAction}
                />
              </div>
            </Form>
          )}
        </Modal.Content>
      </Modal>
    );
  }
}

export default ActivityModal;
