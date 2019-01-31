import Navbar from "../navbar/Navbar";
import SiteHeader from "../header/SiteHeader";

import React from "react";
import { withRouter } from "react-router-dom"
import axios from "axios";
import { Segment, Button, Header } from "semantic-ui-react";

import ActivityCard from "./ActivityCard";
import ActivityModal from "./ActivityModal";

class ActivityPage extends React.Component {
  state = {
    activities: [],
    modal: false,
    action: "Add"
  };

  componentDidMount() {
    const token = localStorage.getItem('token');   
    const username = localStorage.getItem("username");
    const headers = { "headers": { "authorization": token } };
    axios
      .get(`http://localhost:3002/api/activity/${username}`, headers)
      .then(activities => {
        console.log("We have activity", activities.data);
        this.setState({
          activities: activities.data
        });
      })
      .catch(err => {
        console.log("We have a problem", err);
      });
  }
  handleModalToggle = action => {
    this.setState({
      modal: !this.state.modal,
      action: action
    });
  };
  handleActivityAction = activity => {
    if (this.state.action === "Add") {
      const token = localStorage.getItem('token');   
    const headers = { "headers": { "authorization": token } };
      axios
        .post(`http://localhost:3002/api/activity/create`, activity, headers)
        .then(activity => {
          console.log("Created an activity", activity);
        })
        .catch(err => {
          console.log("We have a problem", err);
        });
    }
  };

  deleteActivity = id => {
    console.log("Deleting activity", id);
    axios
      .delete(`http://localhost:3002/api/activity/${id}`)
      .then(activity => {
        console.log("Created an activity", activity);
        setTimeout(() => {
          this.props.history.push("/activities")
        }, 200)
      })
      .catch(err => {
        console.log("We have a problem", err);
      });
  };
  render() {
    const { activities, modal, action, activity } = this.state;
    return (
      <Segment
        style={{
          textAlign: "center",
          border: "none",
          boxShadow: "0px 0px 0px",
          height: "100vh",
          padding: "0px 0px"
        }}
      >
        <SiteHeader name="Activities" />
        <Button
          primary
          icon="add"
          content="Activity"
          onClick={() => this.handleModalToggle("Add")}
        />
        <div
          style={{
            alignItems: "center"
          }}
        >
          {activities &&
            activities.map(activity => (
              <ActivityCard
                activity={activity}
                action={action}
                key={activity._id}
                deleteActivity={() => this.deleteActivity(activity._id)}
              />
            ))}
        </div>
        <ActivityModal
          open={modal}
          action={action}
          addActivity={this.handleActivityAction}
          editActivity={this.editActivity}
          handleModalToggle={() => this.handleModalToggle()}
          activity={activity}
        />
        <Navbar />
      </Segment>
    );
  }
}

export default withRouter(ActivityPage);
