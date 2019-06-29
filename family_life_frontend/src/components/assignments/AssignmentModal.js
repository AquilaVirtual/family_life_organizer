import React, { Component } from "react";
import { Button, Modal, Form, TextArea } from "semantic-ui-react";
import DatePicker from "react-datepicker";

// needed for DatePicker to work
import "react-datepicker/dist/react-datepicker.css";

class AssignmentModal extends Component {
  state = {
    name: "",
    due: new Date(),
    title: "",
    description: "",
    username: localStorage.getItem("username"),
    error: false
  };

  componentDidMount = () => {
    this.setState({
      error: this.props.error
    });
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
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmit = () => {
    const { addAssignment, handleModalToggle, error } = this.props;
    const { name, due, title, description, username } = this.state;
    console.log("Error Modal", error)
    const newAssignment = {
      name,
      due,
      title,
      description,
      username,
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
    const { open, handleModalToggle, error, errorMessage } = this.props;
    const { name, title, due, description } = this.state;
    return (
      <Modal size="mini" open={open}>
        {error ? errorMessage : null}
        <Modal.Header>Add Assignment for {name}</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              placeholder="Add a member's name..."
              onChange={this.handleChange}
              name="name"
              value={name}
            />
            <Form.Input
              placeholder="Add assignment's title..."
              onChange={this.handleChange}
              name="title"
              value={title}
            />
            <DatePicker
              selected={due}
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
              icon="cancel"\
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
