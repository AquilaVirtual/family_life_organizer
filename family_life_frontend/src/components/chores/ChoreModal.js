import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";

class ModalModalExample extends React.Component {
  state = {
    choreText: "",
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    })
  }

  handleAddChore = () => {
    console.log(`Add chore ${this.state.choreText} to ${this.props.user} `)
    this.setState({
      choreText: "",
    });
    this.props.handleModalToggle();
  }

  render() {
    const { user, open, handleModalToggle } = this.props;
    const { choreText } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>Add a Chore for {user}</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.handleAddChore}>
            <Form.Input placeholder="Add chore title..."
              onChange={this.handleChange}
              name="choreText"
              value={choreText}
            />
            <Button primary floated="right" type="submit" icon="add" content="Add"/>
            <Button floated="right" type="cancel" icon="cancel" content="Cancel"
              onClick={handleModalToggle}
            />
          </Form>
        </Modal.Content>
      </Modal>
  );
  }
}

export default ModalModalExample;
