import React from "react";
import axios from "axios";
import { Button, Modal, Form, Select } from "semantic-ui-react";



class ActivityModal extends React.Component {
  state = {
    nameText: "",
    typeText: "",
  };
  componentWillReceiveProps(props) {
    if (props.activity) {
      this.setState({
        nameText: props.activity.name,
        typeText: props.activity.type
      })
    }
  }

  handleChange =  event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelect = (e, data) => {
    this.setState({
      [data.name]: data.value
    })
  }

  handleAddMember = () => {
    const { addActivity, handleModalToggle, activity, editActivity } = this.props;
    const { nameText, typeText } = this.state;

    const newActivity = {
      name: nameText,
      type: typeText,
    };     
    this.setState({
      nameText: "",
      typeText: "",
    });

    if(this.props.action === "Edit") {
       console.log("Edited in bastard!", activity._id, newActivity)
      axios.put(`http://localhost:3002/api/activity/${activity._id}`, newActivity)
      .then(activities => {
      console.log("We Edited activity", activities)     
    })
    .catch(err => {
      console.log("We have a problem", err)
    })
      this.props.toggleEdit();
    }
    else if(this.props.action === "Add") {
      addActivity(newActivity);
      handleModalToggle();
    }   
  };
  toggleAction = () => {
    if(this.props.action === "Edit") {
      this.props.toggleEdit();
    }
    else   if(this.props.action === "Add") {
      this.props.handleModalToggle();
    }
  }
  render() {
    const { action, open, handleModalToggle, _id } = this.props;
    console.log("Some Id in Activity", _id)
    const { nameText, typeText } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>{`${action} an activity`}</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.handleAddMember}>
            <Form.Input
              required
              placeholder="Add an activity..."
              onChange={this.handleChange}
              name="nameText"
              value={nameText}
            />
            <Form.Input
              style={{ width: "100%"}}
              placeholder="Add activity type..."
              onChange={this.handleChange}
              name="typeText"
              value={typeText}        
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
                onClick={this.toggleAction}
              />
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ActivityModal;
