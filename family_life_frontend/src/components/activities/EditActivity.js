import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

class EditActivity extends Component {
  state = {
    activityName: "",
    activityType: ""
  };
  componentWillReceiveProps(props) {
    if (props.activity) {
      this.setState({
        activityName: props.activity.name,
        activityType: props.activity.type
      });
    }
  }
  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSelect = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  };
  handleEditActivity = () => {
    const { activity, editToggle, handleEdit } = this.props;
    const { activityName, activityType } = this.state;

    const activityUpdate = {
      name: activityName,
      type: activityType
    };

    this.setState({
      activityName: "",
      activityType: ""
    });

    handleEdit(activity._id, activityUpdate) 
    editToggle();
  };

  toggleAction = () => {};
  render() {
    const { open, editToggle, } = this.props;
    const { activityName, activityType } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>{`Edit this activity`}</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.handleEditActivity}>
            <Form.Input
              required
              placeholder="Add an activity..."
              onChange={this.handleChange}
              name="activityName"
              value={activityName}
            />
            <Form.Input
              style={{ width: "100%" }}
              placeholder="Add activity type..."
              onChange={this.handleChange}
              name="activityType"
              value={activityType}
            />
            <div style={{ padding: "1rem 0" }}>
              <Button
                primary
                floated="right"
                type="submit"
                icon="edit"
                content="Edit"
              />
              <Button
                floated="right"
                type="cancel"
                icon="cancel"
                content="Cancel"
                onClick={editToggle}
              />
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EditActivity;
