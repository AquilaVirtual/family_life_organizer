import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';

import { homework } from "../../dummyData";

import Navbar from "../navbar/Navbar";
import AssignmentCard from "./AssignmentCard";

class AssignmentPage extends React.Component {
  state = {
    assignments: []
  }

  componentDidMount() {
    this.setState({
      assignments: homework,
    })
  }

  render() {
    const { assignments } = this.state;
    return (
      <Segment>
        <Navbar />
        <Header as="h2">Assignment Page</Header>
        <Button icon="add" primary circular content="New Assignment"/>
        <div style={{
          maxWidth: "80rem",
          margin: "1rem auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          {
            assignments.map((assignment, i) => (
              <AssignmentCard key={i} assignment={assignment} />
            ))
          }
        </div>
      </Segment>
    );
  }
}
 
export default AssignmentPage;