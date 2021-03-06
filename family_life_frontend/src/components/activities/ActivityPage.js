import Navbar from "../navbar/Navbar";
import SiteHeader from "../header/SiteHeader";

import React, { Component } from "react";
import axios from "axios";
import { Segment, Button } from "semantic-ui-react";

import ActivityCard from "./ActivityCard";
import ActivityModal from "./ActivityModal";

//let backend = process.env.REACT_APP_LOCAL_BACKEND;
let backend = "https://familylife.herokuapp.com";
// if (typeof backend !== 'string') {
//   backend = heroku;
// }

class ActivityPage extends Component {
  state = {
    activities: [],
    modal: false,
    error: false,
    errorMessage: ""
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const accountType = localStorage.getItem("accountType");
    const headers = { headers: { authorization: token } };
    let url = "";
    if (accountType === "Primary") {
      url = `${backend}/api/activity/get/primary`;
    } else if (
      accountType === "Child" ||
      accountType === "Spouse" ||
      accountType === "Relative"
    ) {
      url = `${backend}/api/activity/get/member`;
    }
    axios
      .get(`${url}/${username}`, headers)
      .then(activities => {
        this.setState({
          error: false,
          activities: activities.data
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          errorMessage: err.response.data.errorMessage
        });
      });
  }

  handleModalToggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  handleAddActivity = newActivity => {
    const { activities } = this.state;
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };
    axios
      .post(`${backend}/api/activity/create`, newActivity, headers)
      .then(activity => {
        this.setState({
          activities: [...activities, activity.data]
        });
      })
      .catch(err => {
        console.log("We have a problem", err.response);
      });
  };

  handleEdit = (id, activity) => { 
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };

    const { activities } = this.state  
    axios
      .put(`${backend}/api/activity/edit/${id}`, activity, headers)
      .then(activity => {
           activities.forEach((element, i)  => {
        if (activity.data._id === element._id) {
          activities[i] = activity.data;
        } 
        return activities;
      })
     this.setState(state => ({
      ...state.activities,
      activities: state.activities
     }))  
    })
      .catch(err => {
        console.log("We have a problem", err);
      });
  }
  deleteActivity = id => {
    const { activities } = this.state;
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };
    axios
      .delete(`${backend}/api/activity/delete/${id}`, headers)
      .then(response => {
        const currentActivities = activities.filter(
          activity => activity._id !== response.data._id
        );
        this.setState({
          activities: currentActivities
        });
      })
      .catch(err => {
        console.log("We have a problem", err);
      });
  };

  render() {
    const { activities, modal, error, errorMessage } = this.state;
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
        <Navbar />
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
                key={activity._id}
                handleModalToggle={() => this.handleModalToggle()}
                deleteActivity={() => this.deleteActivity(activity._id)}
                handleEdit={this.handleEdit}
              />
            ))}
        </div>
        <ActivityModal
          error={error}
          errorMessage={errorMessage}
          open={modal}
          handleModalToggle={() => this.setState({ modal: false })}
          handleAddActivity={this.handleAddActivity}
        /> 
      </Segment>
    );
  }
}

export default ActivityPage;
