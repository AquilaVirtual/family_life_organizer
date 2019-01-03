import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Navbar from "../navbar/Navbar";
import SiteHeader from '../header/SiteHeader';
const AssignmentPage = () => {
  return (
    <Segment style={{textAlign: "center", border: 'none', boxShadow: '0px 0px 0px', height: '100vh', padding: '0px 0px'}}>
    <SiteHeader name='Assignments'/>
    <Navbar />
    </Segment>
  );
}
 
export default AssignmentPage;