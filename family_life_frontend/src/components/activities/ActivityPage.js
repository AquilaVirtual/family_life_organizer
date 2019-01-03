import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Navbar from "../navbar/Navbar";
import SiteHeader from '../header/SiteHeader';
const ActivityPage = () => {
  return (
    <Segment  style={{textAlign: "center", border: 'none', boxShadow: '0px 0px 0px', height: '100vh', padding: '0px 0px'}}>
    <Navbar />
      <SiteHeader name='Activities'/>
    </Segment>
  );
}
 
export default ActivityPage;