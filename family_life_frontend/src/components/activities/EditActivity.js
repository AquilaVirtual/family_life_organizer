import React, { Component} from "react";
import axios from "axios";
import { Button, Modal, Form } from "semantic-ui-react";

//let backend = process.env.REACT_APP_LOCAL_BACKEND;
let backend = 'https://familylife.herokuapp.com';
// if (typeof backend !== 'string') {
//   backend = heroku;
// }

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
  handleEdit = () => {
    const { activity, editToggle } = this.props;
    const { activityName, activityType } = this.state;

    const newActivity = {
      name: activityName,
      type: activityType
    };

    this.setState({
      activityName: "",
      activityType: ""
    });
    console.log("Edited activity", newActivity);

    axios
      .put(
        `${backend}/api/activity/edit/${activity._id}`,
        newActivity
      )
      .then(activities => {})
      .catch(err => {
        console.log("We have a problem", err);
      });
    editToggle();
  };

  toggleAction = () => {};
  render() {
    const { open, editToggle, activity } = this.props;
    const { activityName, activityType } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>{`Edit this activity`}</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
          <Form onSubmit={this.handleEdit}>
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
