import React, { Component } from "react";
import axios from "axios";
import "../css/UserSettings.css"

import {
    Segment,
    Image,
    Header,
    Icon,
    Confirm,
    Button,
  } from "semantic-ui-react";
  
import SiteHeader from "../header/SiteHeader";
import Navbar from "../navbar/Navbar";

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      newUsername: "",
      email: "",
      newEmail: "",
      password: "",
      newPassword: "",
      verifyPassword: "",
      error: false,
      errorMessage: ""
    };
  }

  render() {
    const { user, deleteUser, handleModalToggle } = this.props;
    const { confirmDelete } = this.state;

    return (
          <div className="container">
       <Navbar />
         <SiteHeader name="settings" />
         <div className="profile">
         <Segment
        style={{
          width: "18rem"         
        }}
        textAlign="center"
      >
        <Image
          centered
          src={
            user && user.userImage
              ? user.userImage
              : "https://png.icons8.com/ios/100/000000/gender-neutral-user.png"
          }
          size="small"
          circular
        />
        <Button
          onClick={this.openImageUploader}
          content="Change Image"
          style={{ fontSize: ".7rem" }}
        />        
        <div id="image-uploader">
          <input
            type="file"
            name="image"
            value={this.state.image}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleImageUpload}>Upload Image</button>
        </div>
        <Header as="h1">{user}</Header>
        <p>{user}</p>     
      
          <div>
            <Icon
              style={{ cursor: "pointer", fontSize: "1.4rem" }}
              className="edit outline green"
              onClick={this.toggleEdit}
            />
            <Icon
              style={{ cursor: "pointer", fontSize: "1.4rem" }}
              className="trash alternate outline red"
              onClick={() => this.setState({ confirmDelete: true })}
            />{" "}
          </div>
        
        <Confirm
          open={confirmDelete}
          size="mini"
          content={`Are you sure you want to remove ${user} ?`}
          onCancel={() => this.setState({ confirmDelete: false })}
          onConfirm={() => {
            deleteUser();
            this.setState({ confirmDelete: false });
          }}
        />          
      </Segment>
      <div className="settings-wrap">
      <div className="settings">
           <div className="info-label">Username:</div>
           <div className="info-data">{this.state.username}</div>
           <button className="username-button" onClick={this.changeUsername}>
             Change{" "}
           </button>
         </div>
         <div className="settings">
           <div className="info-label">Email:</div>
           <div className="info-data_email"> {this.state.email}</div>
           <button className="email-button" onClick={this.changeEmail}>
             Change
           </button>{" "}
         </div>
         <div className="settings">
           Password: ******************{" "}
           <button className="password-button" onClick={this.changePassword}>
             Change
           </button>{" "}
         </div>
         </div>
         </div>
      </div>
        
    //   {/* <div className="container">
    //   <Navbar />
    //     <SiteHeader name="settings" />
    //     <div className="settings">
    //       <div className="info-label">Username:</div>
    //       <div className="info-data">{this.state.username}</div>
    //       <button className="username-button" onClick={this.changeUsername}>
    //         Change{" "}
    //       </button>
    //     </div>
    //     <div className="settings">
    //       <div className="info-label">Email:</div>
    //       <div className="info-data_email"> {this.state.email}</div>
    //       <button className="email-button" onClick={this.changeEmail}>
    //         Change
    //       </button>{" "}
    //     </div>
    //     <div className="settings">
    //       Password: ******************{" "}
    //       <button className="password-button" onClick={this.changePassword}>
    //         Change
    //       </button>{" "}
    //     </div>
    //   </div> */}
    );
  }
}
export default UserSettings;
