import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';

import { homework } from "../../dummyData";

import Navbar from "../navbar/Navbar";
import AssignmentCard from "./AssignmentCard";
import SiteHeader from '../header/SiteHeader';

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
      <Segment style={{textAlign: "center", border: 'none', boxShadow: '0px 0px 0px', height: '100vh', padding: '0px 0px'}}>
        <Navbar />
        <SiteHeader name='Assignments'/>
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
}
 
export default AssignmentPage;