import React from "react";
import axios from "axios";
import { Segment, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

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
    let url = "";
    const accountType = localStorage.getItem("accountType");
    if (accountType === "Primary") {
       url = "http://localhost:3002/api/user/family";
    }
   else if (accountType === "Child" || accountType === "Spouse" || accountType === "Relative") {
       url = "http://localhost:3002/api/member/family";
    }
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");   
    const headers = { headers: { authorization: token } };
    axios.get(`${url}/${username}`, headers)
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

  addMember = (member) => {  
    const token = localStorage.getItem("token");   
    const headers = { headers: { authorization: token } };
    axios.post("http://localhost:3002/api/member/create", member, headers)
    .then(response => {
    })
    .catch(err => {
      console.log("Error adding member", err)
    })    
  };
  deleteUser = id => {
    console.log("Confirming Delete", id)
    const token = localStorage.getItem("token");   
    const headers = { headers: { authorization: token } };
    axios.delete(`http://localhost:3002/api/member/${id}`, headers)
    .then(response => {
      console.log("Getting response from delete", response)
      this.props.history.push("/users")
       })
    .catch(err => {
      console.log("Error deleting member", err)
    })
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
          addMember={this.addMember}
          handleModalToggle={() => this.handleModalToggle()}
          member={member}
        />
      </Segment>
    );
  }
}

export default withRouter(UserPage);
