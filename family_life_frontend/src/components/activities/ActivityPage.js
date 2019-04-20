import Navbar from "../navbar/Navbar";
import SiteHeader from "../header/SiteHeader";

import React, { Component} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Segment, Button, Header } from "semantic-ui-react";

import ActivityCard from "./ActivityCard";
import ActivityModal from "./ActivityModal";

class ActivityPage extends Component {
  state = {
    activities: [],
    modal: false
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const accountType = localStorage.getItem("accountType");
    const headers = { headers: { authorization: token } };
    let url = "";
    if (accountType === "Primary") {
      url = "http://localhost:3002/api/activity/get/primary";
    } else if (
      accountType === "Child" ||
      accountType === "Spouse" ||
      accountType === "Relative"
    ) {
      url = "http://localhost:3002/api/activity/get/member";
    }
    axios
      .get(`${url}/${username}`, headers)
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

  handleModalToggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    console.log("Handle Toggle Called in Activity Page: ", this.state.action);
  };
  handleAddActivity = (newActivity) => {
    const { activities } = this.state;
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };
    axios
      .post(`http://localhost:3002/api/activity/create`, newActivity, headers)
      .then(activity => {
        console.log("Created an activity", activity);
        this.setState({
         activities: [...activities, activity.data]
        })
      })
      .catch(err => {
        console.log("We have a problem", err);
      });

  }
  deleteActivity = id => {
    const { activities } = this.state;
    console.log("Delete activity called");
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };
    axios
      .delete(`http://localhost:3002/api/activity/delete/${id}`, headers)
      .then(response => {
        console.log("Created an activity", response);
        const currentActivities = activities.filter(activity => activity._id !== response.data._id)
       this.setState({
        activities: currentActivities
       })
      })
      .catch(err => {
        console.log("We have a problem", err);
      });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.activities !== nextState.activities    
  }
  render() {
    console.log("How fast?")
    const { activities, modal, action, activity } = this.state;
    const accountType = localStorage.getItem("accountType");
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
        {/* { accountType ==="child" ? (null) : ("You don't have any activity")} */}
        {accountType === "Primary" || accountType === "Spouse" ? (
          <Button
            primary
            icon="add"
            content="New Activity"
            onClick={() => this.handleModalToggle()}
          />
        ) : null}
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
                handleModalToggle={() => this.handleModalToggle()}
                deleteActivity={() => this.deleteActivity(activity._id)}
              />
            ))}
        </div>
        <ActivityModal
          open={modal}
          action={action}
          handleModalToggle={() => this.setState({ modal: false })}
          handleAddActivity={this.handleAddActivity}
        />
        <Navbar />
      </Segment>
    );
  }
}

export default ActivityPage;
