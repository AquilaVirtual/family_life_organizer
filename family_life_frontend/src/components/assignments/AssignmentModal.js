import React, { Component} from "react";
import { Button, Modal, Form, TextArea } from "semantic-ui-react";
import DatePicker from "react-datepicker";

// needed for DatePicker to work
import "react-datepicker/dist/react-datepicker.css";

class AssignmentModal extends Component {
  state = {
    user: "",
    due: new Date(),
    title: "",
    description: ""
  };

  changeDate = date => {
    this.setState({
      due: date
    });
  };

  handleSelect = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  };

  handleChange = ({ target }) => {
    console.log(target.name);
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmit = () => {
    const { addAssignment, handleModalToggle } = this.props;
    const { user, due, title, description } = this.state;

    const newAssignment = {
      user,
      due,
      title,
      description,
      status: "initial"
    };

    this.setState({
      user: "",
      due: new Date(),
      title: "",
      description: ""
    });

    addAssignment(newAssignment);
    handleModalToggle();
  };

  render() {
    const { open, handleModalToggle } = this.props;
    const { user, title, due, description } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>Add an Assignment for {user}</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              placeholder="Add a child's name..."
              onChange={this.handleChange}
              name="user"
              value={user}
            />
            <Form.Input
              placeholder="Add assignment's title..."
              onChange={this.handleChange}
              name="title"
              value={title}
            />
            <DatePicker selected={due}
              onChange={this.changeDate}
              dateFormat="yyyy/MM/dd"
            />
            <TextArea
              style={{ margin: "1rem 0" }}
              placeholder="Assignment's description"
              value={description}
              name="description"
              onChange={this.handleChange}
              rows={15}
            />
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
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AssignmentModal;
