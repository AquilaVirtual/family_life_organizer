import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';

import { homework } from "../../dummyData";

import Navbar from "../navbar/Navbar";
<<<<<<< HEAD
import SiteHeader from '../header/SiteHeader';
const AssignmentPage = () => {
  return (
    <Segment style={{textAlign: "center", border: 'none', boxShadow: '0px 0px 0px', height: '100vh', padding: '0px 0px'}}>
    <SiteHeader name='Assignments'/>
    <Navbar />
    </Segment>
  );
=======
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

  deleteAssignment = (id) => {
    this.setState(state => ({
      assignments: state.assignments.filter((assignment, i) => i!==id)
    }))
  }

  render() {
    const { assignments } = this.state;
    return (
      <Segment>
        <Navbar />
        <Header as="h2">Assignment Page</Header>
        <Button icon="add" primary content="New Assignment"/>
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
              <AssignmentCard key={i} assignment={assignment}
                deleteAssignment={this.deleteAssignment}
                id={i}
              />
            ))
          }
        </div>
      </Segment>
    );
  }
>>>>>>> master
}
 
export default AssignmentPage;