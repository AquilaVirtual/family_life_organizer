import React from "react";
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
    const { addActivity, handleModalToggle, activity } = this.props;
    const { nameText, typeText } = this.state;

    const newActivity = {
      name: nameText,
      type: typeText,
    };

    const id = activity ? activity.id : null;

    this.setState({
      nameText: "",
      typeText: "",
    });

    addActivity(newActivity, id);
    handleModalToggle();
  };

  render() {
    const { action, open, handleModalToggle } = this.props;
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
                onClick={handleModalToggle}
              />
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ActivityModal;
