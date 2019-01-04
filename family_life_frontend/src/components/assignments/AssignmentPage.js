import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";

import { homework } from "../../dummyData";

import AssignmentCard from "./AssignmentCard";
import AssignmentModal from "./AssignmentModal";
import StatusCheck from "../auth/StatusCheck";

class AssignmentPage extends React.Component {
  state = {
    assignments: [],
    modal: false,
  };

  componentDidMount() {
    this.setState({
      assignments: homework
    });
  }

  handleModalToggle = (action, member) => {
    this.setState(state => ({
      modal: !state.modal,
      action,
      member
    }));
  };

  deleteAssignment = id => {
    this.setState(state => ({
      assignments: state.assignments.filter((assignment, i) => i !== id)
    }));
  };

  addAssignment = assignment => {
    this.setState(state => ({
      assignments: [...state.assignments, assignment]
    }))
  }

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
    const { assignments, modal } = this.state;
    const { currentUser, history, toggleModal } = this.props;

    if (!currentUser) return (
      <StatusCheck
        history={history}
        toggleModal={toggleModal}
      />
    )
    return (
      <Segment style={{textAlign: "center", border: 'none', boxShadow: '0px 0px 0px', height: '100vh', padding: '0px 0px'}}>
        <Header as="h1">FamilyLife Assignment</Header>
        <Button icon="add" primary content="New Assignment"
          onClick={this.handleModalToggle}
        />
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
        <AssignmentModal open={modal}
          handleModalToggle={this.handleModalToggle}
          addAssignment={this.addAssignment}
        />
      </Segment>
    );
  }
}

export default AssignmentPage;
