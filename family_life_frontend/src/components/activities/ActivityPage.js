import React from "react";
import { Segment, Button, Header } from "semantic-ui-react";

import { activities } from "../../dummyData";

import ActivityCard from "./ActivityCard";
import StatusCheck from "../auth/StatusCheck";

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
    const { activities, activity } = this.state;

    const { currentUser, history, toggleModal } = this.props;

    if (!currentUser) return (
      <StatusCheck
        history={history}
        toggleModal={toggleModal}
      />
    )

    if (!activity.name) return <div>No activity</div>;
    return (
      <Segment style={{textAlign: "center", border: 'none', boxShadow: '0px 0px 0px', height: '100vh', padding: '0px 0px'}}
      >
        <Header as="h2">FamilyLife Activities</Header>
        <Button
          primary
          icon="add"
          content="Activity"
          onClick={() => this.handleModalToggle("Add")}
        />
        <ActivityCard
          activity={{ name: activity.name, type: activity.type }}
          deleteActivity={() => this.deleteActivity()}
          handleModalToggle={() =>
            this.handleModalToggle("Edit", {
              activity: { name: activity.name, type: activity.type }
            })
          }
        />
        <div
          style={{
            alignItems: "center"
          }}
        >
          {activities &&
            activities.map((activity, id) => (
              <ActivityCard
                key={id}
                activity={activity}
                deleteActivity={() => this.deleteActivity(id)}
                handleModalToggle={() =>
                  this.handleModalToggle("Edit", {
                    id: id,
                    activity: activity
                  })
                }
              />
            ))}
        </div>
      </Segment>
    );
  }
}

export default ActivityPage;
