import React from "react";
import { Button, Modal, Form, Select } from "semantic-ui-react";

const memberType = [
  {key: "parent", value: "parent", text:"Parent"},
  {key: "child", value: "child", text:"Child"}
]

class MemberModal extends React.Component {
  state = {
    nameText: "",
    accountText: "",
  };

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
    const { addMember, handleModalToggle } = this.props;
    const { nameText, accountText } = this.state;

    const newMember = {
      name: nameText,
      type: accountText,
    };

    this.setState({
      nameText: "",
      accountText: "",
    });

    addMember(newMember);
    handleModalToggle();
  };

  render() {
    const { open, handleModalToggle } = this.props;
    const { nameText, accountText } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>Add a Family Member</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.handleAddMember}>
            <Form.Input
              placeholder="Add member name..."
              onChange={this.handleChange}
              name="nameText"
              value={nameText}
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
                icon="add"
                content="Add"
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
