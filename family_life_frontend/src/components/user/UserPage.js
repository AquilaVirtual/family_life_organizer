import React from "react";
import axios from "axios";
import { Segment, Button } from "semantic-ui-react";

import { account } from "../../dummyData";

import UserCard from "./UserCard";
import MemberModal from "./MemberModal";
import Navbar from '../navbar/Navbar';
import SiteHeader from '../header/SiteHeader';

class UserPage extends React.Component {
  state = {  
    users: [],
    modal: false,
    action: "add",
    member: null
  };

  componentDidMount() {    
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");   
    const headers = { headers: { authorization: token } };
    axios.get(`http://localhost:3002/api/user/family/${username}`, headers)
    .then(response => {
      console.log("Getting family", response.data) 
      this.setState({
        users: response.data 
      });
    })
    .catch(err => {
      console.log("Error adding member", err)
    })    
  }

  handleModalToggle = (action, member) => {
    this.setState(state => ({
      modal: !state.modal,
      action,
      member
    }));
  };

  handleMemberAction = (member) => {  
    const token = localStorage.getItem("token");   
    const headers = { headers: { authorization: token } };
    axios.post("http://localhost:3002/api/member/create", member, headers)
    .then(response => {
      console.log("Adding New Member", response) 
    })
    .catch(err => {
      console.log("Error adding member", err)
    })    
  };
  deleteUser = id => {
    if (!id && id !== 0) {
      this.setState({
        user: {}
      });
    } else {
      this.setState(state => ({
        user: {
          ...state.user,
          familyMembers: state.user.familyMembers.filter(
            (member, i) => i !== id
          )
        }
      }));
    }
  };
  render() {
    const { user, modal, action, member } = this.state;

    if (!localStorage.getItem("name")) return <div>No User</div>;
    return (
      <Segment style={{textAlign: "center", border: 'none', boxShadow: '0px 0px 0px', height: '100vh', padding: '0px 0px', marginBottom: '30px'}}>
        <Navbar />
        <SiteHeader name="Users" />
        <UserCard         
          user={{ name: localStorage.getItem("name"), accountType: localStorage.getItem("accountType") }}
          deleteUser={() => this.deleteUser()}
          handleModalToggle={() =>
            this.handleModalToggle("Edit", {
              member: { name: user.name, type: user.type }
            })
          }
        />
        <Button
          circular
          primary
          icon="add"
          content="Family Member"
          onClick={() => this.handleModalToggle("Add")}
        />
        <div
          style={{
            maxWidth: "60rem",
            margin: "0 auto",
            padding: "2rem 0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.state.users &&
            this.state.users.map((member) => (
              <UserCard
                key={member._id}
                user={member}
                deleteUser={() => this.deleteUser(member._id)}
                handleModalToggle={() =>
                  this.handleModalToggle("Edit", {
                  member: member
                  })
                }
              />
            ))}
        </div>
        <MemberModal
          open={modal}
          action={action}
          addMember={this.handleMemberAction}
          handleModalToggle={() => this.handleModalToggle()}
          member={member}
        />
      </Segment>
    );
  }
}

export default UserPage;
