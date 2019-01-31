import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";

import axios from "axios";

import Navbar from "../navbar/Navbar";
import AssignmentCard from "./AssignmentCard";
import SiteHeader from "../header/SiteHeader";
import AssignmentModal from "./AssignmentModal";

class AssignmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      modal: false
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    console.log("Getting some token", token);
    const headers = { headers: { authorization: token } };
    axios
      .get(`http://localhost:3002/api/assignment/${username}`, headers)
      .then(response => {
        console.log("Getting Assignment", response.data);
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
    console.log("Some ID here", id);
    axios
      .delete(`http://localhost:3002/api/assignment/${id}`)
      .then(response => {
        console.log("Deleted Assignment", response);
      })
      .catch(err => {
        console.log("Something Bahd!", err);
      });
  };

  addAssignment = assignment => {
    const token = localStorage.getItem("token");
    console.log("Getting some token", token);
    const headers = { headers: { authorization: token } };

    console.log("Passing on", assignment);
    axios
      .post(`http://localhost:3002/api/assignment/create`, assignment, headers)
      .then(response => {
        console.log("Logging Assignment", response);
      })
      .catch(err => {
        console.log("Something Bahd!", err);
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
    const { assignments, modal } = this.state;
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
        <Button
          icon="add"
          primary
          content="New Assignment"
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
        <AssignmentModal
          open={modal}
          handleModalToggle={this.handleModalToggle}
          addAssignment={this.addAssignment}
        />
      </Segment>
    );
  }
}

export default AssignmentPage;
