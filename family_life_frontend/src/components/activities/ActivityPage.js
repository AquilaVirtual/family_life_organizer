import Navbar from "../navbar/Navbar";
import SiteHeader from "../header/SiteHeader";

import React from "react";
import axios from "axios";
import { Segment, Button, Header } from "semantic-ui-react";


import ActivityCard from "./ActivityCard";
import ActivityModal from "./ActivityModal";

class ActivityPage extends React.Component {
  state = {
    activities: [],
    modal: false,
    action: "Add",   
  };

  componentDidMount() {
    axios.get('http://localhost:3002/api/activity/all')
    .then(activities => {
      console.log("We have activity", activities.data)
      this.setState({
        activities: activities.data
      });
    })
    .catch(err => {
      console.log("We have a problem", err)
    })
  }
  handleModalToggle = (action) => {
    this.setState(({
      modal: !this.state.modal,
      action: action    
    }));
  };
  handleActivityAction = (activity, id) => {
    console.log("Befor post", activity)
    if (this.state.action === "Add") {
      axios.post(`http://localhost:3002/api/activity/create`, activity)
      .then(activity => {
        console.log("Created an activity", activity)     
      })
      .catch(err => {
        console.log("We have a problem", err)
      }) 
    } 
    else if (!id && id !== 0) {
      this.setState(state => ({
        ...state.activities,
        name: activity.name,
        type: activity.type
      }));
    } else {
      this.setState(state => ({
        ...state.activities,
        activities: state.activities.map((currentActivity, i) => {
          if (i === id) {
            return activity;
          }
          return currentActivity;
        })
      }));
    }
  };
  deleteActivity = id => {
    if (!id && id !== 0) {
      this.setState({
        activities: []
      });
    } else {
      this.setState(state => ({
        ...state.activities,
        activities: state.activities.filter((activity, i) => i !== id)
      }));
   }
  };
  render() {
    const { activities, modal, action, activity } = this.state;
    return (
      <Segment
        style={{textAlign: "center", border: 'none', boxShadow: '0px 0px 0px', height: '100vh', padding: '0px 0px'}}
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
          { activities &&
            activities.map((activity) => (
              <ActivityCard
              activity={activity}
                key={activity._id}            
                deleteActivity={() => this.deleteActivity(activity._id)}
                handleModalToggle={() =>
                  this.handleModalToggle("Edit", {
                    _id: activity._id,
                    activity: activity
                  })
                }
              />
            ))}
        </div>
        <ActivityModal
          open={modal}
          action={action}
          addActivity={this.handleActivityAction}
          handleModalToggle={() => this.handleModalToggle()}
          activity={activity}
        />
        <Navbar />
      </Segment>
    );
  }
}

export default ActivityPage;
