import React from "react";
import axios from "axios";
import { Button, Modal, Form } from "semantic-ui-react";

class AddMemberToActivity extends React.Component {
  state = {
    memberName: "",
    errorMessage: ""
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    console.log("Our Current state", this.state.memberName);
  };

  addMemberToActivity = () => {
    const { errorMessage, memberName } = this.state;
    const { addMemberToggle, activity } = this.props;
    const member = {
      name: memberName
    };
    console.log("Current Activity", activity, member);
    const username = localStorage.getItem("username");
    axios
      .put(
        `http://localhost:3002/api/activity/add_member_to_activity/${
          activity._id
        }`,
        { username, member }
      )
      .then(activities => {
        console.log("Add member fired!");
      })
      .catch(err => {
        console.log("We have a problem", err);
      });
    this.setState({
      memberName: ""
    });
    if (!errorMessage) {
      addMemberToggle();
    }
  };

  render() {
    const { open, addMemberToggle } = this.props;
    const { memberName } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>{`Add a family member to this activity`}</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.addMemberToActivity}>
            <Form.Input
              placeholder="Type full name of family member"
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
                icon="add"
              />
              <Button
                floated="right"
                type="cancel"
                icon="cancel"
                content="Cancel"
                onClick={addMemberToggle}
              />
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
export default AddMemberToActivity;
