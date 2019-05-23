import React, { Component } from "react";
import axios from "axios";


import {
  Segment,
  Image,
  Header,
  Icon,
  Confirm,
  Button,
} from "semantic-ui-react";

import "./userCard.css";

//let backend = process.env.REACT_APP_LOCAL_BACKEND;
let backend = "https://familylife.herokuapp.com";
// if (typeof backend !== 'string') {
//   backend = heroku;
// }

class UserCard extends Component {
  state = {
    confirmDelete: false,
    edit: false,
    image: "",
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
   // console.log("Getting an image", event.target.value);
  };
  
  toggleEdit = () => {
  this.setState(state => ({
    edit: !state.edit
  }))
  }
  openImageUploader = () => {
    const image = document.getElementById("image-uploader");
    image.style.display = "block";
  };
  handleImageUpload = () => {
    const image = this.state.image;
    console.log("Our Image", image);
    axios
      .post(
        `${backend}/api/user/image/${localStorage.getItem("userId")}`,
        image
      )
      .then(response => {
        console.log("Image upload response", response);
      })
      .catch(err => {
        console.log("Something BahDDD", err);
      });
    const imageId = document.getElementById("image-uploader");
    imageId.style.display = "none";
  };
  render() {
    console.log("User in card", this.props.user);
    const { user, deleteUser, handleModalToggle } = this.props;
    const { confirmDelete } = this.state;

    return (
      <Segment
        style={{
          width: "18rem",
          margin: "1rem auto"
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
        <Header as="h1">{user.name}</Header>
        <p>{user.accountType}</p>
        {/* Show the edit and delete icons if the logged in user's account type is primary.
            Only a primary account holder can delete and/or add family members. 
        */}
        {localStorage.getItem("accountType") === "Primary" ||
        localStorage.getItem("accountType") === "Spouse" ? (
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
        ) : null}
        <Confirm
          open={confirmDelete}
          size="mini"
          content={`Are you sure you want to remove ${user.name} ?`}
          onCancel={() => this.setState({ confirmDelete: false })}
          onConfirm={() => {
            deleteUser();
            this.setState({ confirmDelete: false });
          }}
        />          
      </Segment>
    );
  }
}

export default UserCard;
