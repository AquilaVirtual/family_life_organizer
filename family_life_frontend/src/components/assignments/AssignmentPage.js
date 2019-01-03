import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";

import { homework } from "../../dummyData";

import Navbar from "../navbar/Navbar";
import AssignmentCard from "./AssignmentCard";

class AssignmentPage extends React.Component {
  state = {
    assignments: []
  };

  componentDidMount() {
    this.setState({
      assignments: homework
    });
  }

  deleteAssignment = id => {
    this.setState(state => ({
      assignments: state.assignments.filter((assignment, i) => i !== id)
    }));
  };

  changeStatus = id => {
    this.setState(state => ({
      assignments: state.assignments.map((assignment, i) => {
        if (id === i) {
          return {
            ...assignment,
            status:
              assignment.status === "initial" ? "incomplete" : "completed"
          };
        }
        return assignment;
      })
    }));
  };

  render() {
    const { assignments } = this.state;
    return (
      <Segment>
        <Navbar />
        <Header as="h2">Assignment Page</Header>
        <Button icon="add" primary content="New Assignment" />
        <div
          style={{
            maxWidth: "80rem",
            margin: "1rem auto",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          {assignments.map((assignment, i) => (
            <AssignmentCard
              key={i}
              assignment={assignment}
              deleteAssignment={this.deleteAssignment}
              changeStatus={this.changeStatus}
              id={i}
            />
          ))}
        </div>
      </Segment>
    );
  }
}

export default AssignmentPage;
