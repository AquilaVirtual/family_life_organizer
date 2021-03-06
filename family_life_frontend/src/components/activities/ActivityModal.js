import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

class ActivityModal extends Component {
  state = {
    activityName: "",
    activityType: "",
    memberName: ""
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
  addActivity = () => {
    const { handleModalToggle, handleAddActivity, error } = this.props;
    const { activityName, activityType } = this.state;

    const newActivity = {
      name: activityName,
      type: activityType,
      username: localStorage.getItem("username")
    };
    this.setState({
      activityName: "",
      activityType: ""
    });
    handleAddActivity(newActivity);
    if (!error) {
      handleModalToggle();
    }
  };
  render() {
    const { open, error, errorMessage } = this.props;
    const { activityName, activityType } = this.state;
    return (
      <Modal size="mini" open={open}>
        {error ? errorMessage : null}
        <Modal.Header>{`Add an activity`}</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.addActivity}>
            <Form.Input
              required
              placeholder="Add activity name..."
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
                icon="plus"
                content="Add"
              />
              <Button
                floated="right"
                type="cancel"
                icon="cancel"
                content="Cancel"
                onClick={this.props.handleModalToggle}
              />
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ActivityModal;
