import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, TextArea } from "semantic-ui-react";
import DatePicker from "react-datepicker";

// needed for DatePicker to work
import "react-datepicker/dist/react-datepicker.css";


class EditAssignment extends Component {
  state = {
    user: "",
    due: new Date(),
    title: "",
    description: "",
    _id: null
  };
  componentDidMount() {
    this.setState({
      user: this.props.assignment.name,
      title: this.props.assignment.title,
      description: this.props.assignment.description,
      _id: this.props.assignment._id
    });
  }
  changeDate = date => {
    this.setState({
      due: date
    });
  };

  handleSelect = (e, data) => {
    e.preventDefault();
    this.setState({ [data.name]: data.value });
  };

  handleChange = event => { 
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = () => {
    const { user, due, title, description, _id } = this.state;    
    const { handleEdit } = this.props;
    const assignmentUpdate = {
      user: user,
      due: due,
      title: title,
      description: description,
      _id: _id
    }; 
    handleEdit(_id, assignmentUpdate)
    this.props.toggleEdit();
  };
  render() {
    const { open, toggleEdit } = this.props;
    const { user, title, due, description } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>Edit Assignment for {user}</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input onChange={this.handleChange} name="user" value={user} />
            <Form.Input
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
              placeholder="Tell us more"
              value={description}
              name="description"
              onChange={this.handleChange}
              rows={15}
            />
            <Button
              primary
              floated="right"
              type="submit"
              icon="edit"
              content="edit"
            />
            <Button
              floated="right"
              type="cancel"
              icon="cancel"
              content="Cancel"
              onClick={() => {
                toggleEdit();
              }}
            />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EditAssignment;
