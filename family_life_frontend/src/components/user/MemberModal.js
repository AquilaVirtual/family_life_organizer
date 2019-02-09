import React from "react";
import { Button, Modal, Form, Select } from "semantic-ui-react";

const memberType = [
  {key: "spouse", value: "spouse", text:"Spouse"},
  {key: "child", value: "child", text:"Child"},
  {key: "relative", value: "relative", text:"Relative"}
]

class MemberModal extends React.Component {
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
      })
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
    })
  }

  handleAddMember = () => {
    const { addMember, handleModalToggle, member } = this.props;
    const { nameText, usernameText, emailText, accountText } = this.state;

    const newMember = {
      name: nameText,
      username: usernameText, 
      email: emailText,
      type: accountText,
    };

    const id = member ? member.id : null;

    this.setState({
      nameText: "",
      accountText: "",
    });

    addMember(newMember, id);
    handleModalToggle();
  };

  render() {
    const { action, open, handleModalToggle } = this.props;
    const {usernameText, emailText, nameText, accountText } = this.state;
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
              style={{ width: "100%"}}
              placeholder="Add accout type..."
              onChange={this.handleSelect}
              name="accountText"
              value={accountText}
              options={memberType}
            />
            <div style={{ padding: "1rem 0"}}>
              <Button
                primary
                floated="right"
                type="submit"
                icon={`${action ===  "Add" ? "add" : "edit"}`}
                content={`${action ===  "Add" ? "Add" : "Edit"}`}
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
