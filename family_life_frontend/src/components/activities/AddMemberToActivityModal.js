import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form } from "semantic-ui-react";

let backend = process.env.REACT_APP_LOCAL_BACKEND;
//let backend = "https://familylife.herokuapp.com";
// if (typeof backend !== 'string') {
//   backend = heroku;
// }

class AddMemberToActivity extends Component {
  state = {
   username: "",
    errorMessage: ""
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    console.log("Our Current state", this.state.memberUsername);
  };

  addMemberToActivity = () => {
    const { errorMessage, username } = this.state;
    const { addMemberToggle, activity } = this.props;
    const  memberUsername = username.trim();
   console.log("Getting member username", memberUsername)
    const parentUsername = localStorage.getItem("username");
    axios
      .put(`${backend}/api/activity/addmember/${activity._id}`, {
        parentUsername,
       memberUsername
      })
      .then(addedMember => {
        ///console.log("Add member fired!", addedMember);
      })
      .catch(err => {
       console.log("We have a problem", err.response.data.errorMessage);
       this.setState({
        errorMessage: err.response.data.errorMessage
       });
      });
    this.setState({
     username: ""
    });
    if (!errorMessage) {
      addMemberToggle();
    }
  };

  render() {
    const { open, addMemberToggle } = this.props;
    const { username } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>{`Add a family member to this activity`}</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.addMemberToActivity}>
            <Form.Input
              required
              placeholder="Enter username of family member"
              onChange={this.handleChange}
              name="username"
              value={username}
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
