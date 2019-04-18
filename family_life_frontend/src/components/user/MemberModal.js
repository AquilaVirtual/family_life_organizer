import React, { Component} from "react";
import { Button, Modal, Form, Select } from "semantic-ui-react";

const memberType = [
  { key: "Spouse", value: "Spouse", text: "Spouse" },
  { key: "Child", value: "Child", text: "Child" },
  { key: "Relative", value: "Relative", text: "Relative" }
];

class MemberModal extends Component {
  state = {
    nameText: "",
    accountText: "",
    usernameText: "",
    emailText: ""
  };

  componentWillReceiveProps(props) {
    if (props.member) {
      this.setState({
        nameText: props.member.member.name,
        usernameText: props.member.member.username,
        emailText: props.member.member.email,
        accountText: props.member.member.type
      });
    }
  }
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };
  handleSelect = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  };

  handleAddMember = () => {
    const { addMember, handleModalToggle } = this.props;
    const { nameText, usernameText, emailText, accountText } = this.state;

    const newMember = {
      name: nameText,
      username: usernameText,
      email: emailText,
      accountType: accountText,
      //Here we randomly generate a number and add it to the username of newly added family member.
      //This will be used as password for new member to log in and change password.
      //When app is fully functional, this new member informatiom will be sent via email or text message.
      //Only a primary account can add family members, but they can't have access to log in credentials for added members
      password: usernameText + Math.floor(Math.random() * 100000),
      //Username of primary account holder is used to associate with newly added for query
      username_primary: localStorage.getItem("username")
    };

    addMember(newMember);
    this.setState({
      nameText: "",
      accountText: "",
      email: emailText
    });
    handleModalToggle();
    //Temporary! Here we alert primary holder with password of newly added family member.
    //When app is fully functional, this new member informatiom will be sent via email or text message to newly added member.
    alert(newMember.password);
  };

  render() {
    const { action, open, handleModalToggle } = this.props;
    const { usernameText, emailText, nameText, accountText } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>{`${action} a Family Member`}</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.handleAddMember}>
            <Form.Input
              required
              placeholder="Full Name"
              onChange={this.handleChange}
              name="nameText"
              value={nameText}
            />
            <Form.Input
              required
              placeholder="Username"
              onChange={this.handleChange}
              name="usernameText"
              value={usernameText}
            />
            <Form.Input
              required
              placeholder="Email"
              onChange={this.handleChange}
              name="emailText"
              value={emailText}
            />
            <Select
              style={{ width: "100%" }}
              placeholder="Add accout type..."
              onChange={this.handleSelect}
              name="accountText"
              value={accountText}
              options={memberType}
            />
            <div style={{ padding: "1rem 0" }}>
              <Button
                primary
                floated="right"
                type="submit"
                icon={`${action === "Add" ? "add" : "edit"}`}
                content={`${action === "Add" ? "Add" : "Edit"}`}
              />
              <Button
                floated="right"
                type="cancel"
                icon="cancel"
                content="Cancel"
                onClick={handleModalToggle}
              />
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default MemberModal;
