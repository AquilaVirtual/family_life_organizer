

import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import SiteHeader from '../header/SiteHeader';
import Navbar from '../navbar/Navbar';
import UserCard from "./UserCard";

const UserPage = ({ user }) => {
  return (
    <Segment className='userPage' style={{textAlign: "center", border: 'none', boxShadow: '0px 0px 0px', height: '100vh', padding: '0px 0px'}}>
      <SiteHeader name='Users' />
      <Button circular primary icon="add" size='huge' content="Family Member" />

      <UserCard user={{name: user.name, type: user.type}} />

      <div style={{
        maxWidth: "60rem",
        margin: "0 auto",
        padding: "2rem 0",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {
          user.familyMembers.map((member, id) => (
            <UserCard key={id} user={member} />
          ))

        }
      </div>
      <Navbar />
    </Segment>
  );
}

export default UserPage;

