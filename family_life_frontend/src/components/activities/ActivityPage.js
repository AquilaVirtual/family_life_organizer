import Navbar from "../navbar/Navbar";
import SiteHeader from "../header/SiteHeader";

import React from "react";
import { Segment, Button, Header } from "semantic-ui-react";

import { activities } from "../../dummyData";

class ActivityPage extends React.Component {
  state = {
    activities: [],
    modal: false,
    action: "add",
    activity: { name: "Row", type: "sports" }
  };

  componentDidMount() {
    this.setState({
      activities: activities
    });
  }

  handleModalToggle = () => {
    this.setState(({
      modal: !this.state.modal    
    }));
  };

  handleActivityAction = (activity, id) => {
    if (this.state.action === "add") {
      this.setState(state => ({
        ...state.activities,
        activities: [...state.activities, activity]
      }));
    } else if (!id && id !== 0) {
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
    if (!activity.name) return <div>No activity</div>;
    return (
      <Segment
        style={{
          textAlign: "center"       
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
        </div>        
        <Navbar />
      </Segment>
    );
  }
}

export default ActivityPage;
