import React, { Component } from "react";
import { Segment, Header, Button } from "semantic-ui-react";

import axios from "axios";

import Navbar from "../navbar/Navbar";
import AssignmentCard from "./AssignmentCard";
import SiteHeader from "../header/SiteHeader";
import AssignmentModal from "./AssignmentModal";

let backend = process.env.REACT_APP_LOCAL_BACKEND;
//let backend = "https://familylife.herokuapp.com";
// if (typeof backend !== 'string') {
//   backend = heroku;
// }

class AssignmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      modal: false,
      error: false,
      errorMessage: ""
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const headers = { headers: { authorization: token } };
    axios
      .get(`${backend}/api/assignment/${username}`, headers)
      .then(response => {
        this.setState({
          assignments: response.data
        });
      })
      .catch(err => {
        console.log("Something Bahd!", err);
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
    const { assignments } = this.state;
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };
    axios
      .delete(`${backend}/api/assignment/${id}`, headers)
      .then(response => {
        const currentAssignments = assignments.filter(
          assignment => assignment._id !== response.data._id
        );
        this.setState({
          assignments: currentAssignments
        });
      })
      .catch(err => {
        console.log("Something Bahd!", err);
      });
  };
  addAssignment = assignment => {
    console.log("New assignment", assignment);
    const { assignments } = this.state;
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } };
    axios
      .post(`${backend}/api/assignment/create`, assignment, headers)
      .then(response => {
        this.setState({
          assignments: [...assignments, response.data]
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          errorMessage: err.response.data.errorMessage
        });
      });
  };
  handleEdit = (id, assignment) => {


    const token = localStorage.getItem("token");    
    const headers = { headers: { authorization: token } };

    const { assignments } = this.state;
    console.log("Updated assignment", assignment);
    axios
      .put(`${backend}/api/assignment/${id}`, assignment, headers)
      .then(assignment => {
        assignments.forEach((element, i)  => {
          if (assignment.data._id === element._id) {
            assignments[i] = assignment.data;
          } 
          return assignments;
        })
       this.setState(state => ({
        ...state.assignments,
        assignments: state.assignments
       }))
      })
      .catch(err => {
        this.setState({
        errorMessage: err.response.data.errorMessage
        })
        console.log("Fire!", err);
      });
  };
  changeStatus = id => {
    this.setState(state => ({
      assignments: state.assignments.map((assignment, i) => {
        if (id === i) {
          return {
            ...assignment,
            status: assignment.status === "initial" ? "incomplete" : "completed"
          };
        }
        return assignment;
      })
    }));
  };
  render() {
    const { assignments, modal, error, errorMessage } = this.state;
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
        <SiteHeader name="Assignments" />{" "}
        {accountType === "Primary" || accountType === "Spouse" ? (
          <Button
            icon="add"
            primary
            content="New Assignment"
            onClick={this.handleModalToggle}
          />
        ) : null}
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
          {assignments.map(assignment => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              deleteAssignment={this.deleteAssignment}
              changeStatus={this.changeStatus}
              handleEdit={this.handleEdit}
            />
          ))}
        </div>
        <AssignmentModal
          error={error}
          errorMessage={errorMessage}
          open={modal}
          handleModalToggle={this.handleModalToggle}
          addAssignment={this.addAssignment}
        />
      </Segment>
    );
  }
}

export default AssignmentPage;
