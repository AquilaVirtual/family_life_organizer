import React, { Component } from "react";
import axios from "axios";
import "../css/UserSettings.css";

import {
  Segment,
  Image,
  Header,
  Icon,
  Confirm,
  Button
} from "semantic-ui-react";

import SiteHeader from "../header/SiteHeader";
import Navbar from "../navbar/Navbar";

//let backend = process.env.REACT_APP_LOCAL_BACKEND;
let backend = "https://familylife.herokuapp.com";
// if (typeof backend !== 'string') {
//   backend = heroku;
// }

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
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
  componentDidMount = () => {
    let url = "";
    const userId = localStorage.getItem("userId");
    const accountType = localStorage.getItem("accountType");
    if (accountType === "Primary") {
      url = `${backend}/api/user/get`;
    } else if (
      accountType === "Child" ||
      accountType === "Spouse" ||
      accountType === "Relative"
    ) {
      url = `${backend}/api/member/get`;
    }
    axios
      .get(`${url}/${userId}`)
      .then(response => {
        this.setState({
          user: response.data
        });
      })
      .catch(err => {
        //console.log("Error in User Settings", err);
        this.setState({
          errorMessage: err.response.data.errorMessage
        });
      });
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  
  toggleChange = e => {
    e.preventDefault();
    if (e.target.previousElementSibling.style.display === "flex") {
      e.target.previousElementSibling.style.display = "none";
    } else {
      e.target.previousElementSibling.style.display = "flex";
    }
    if (
      e.target.previousElementSibling.previousElementSibling.style.display ===
      "none"
    ) {
      e.target.previousElementSibling.previousElementSibling.style.display =
        "block";
    } else {
      e.target.previousElementSibling.previousElementSibling.style.display =
        "none";
    }
  };
  openImageUploader = () => {
    const image = document.getElementById("image-uploader");
    image.style.display = "block";
  };
  handleImageUpload = () => {
    const image = this.state.image;
    const userId = localStorage.getItem("userId");
    console.log("Our Image", image);
    axios
      .post(`${backend}/api/user/image/${userId}`, image)
      .then(response => {
        console.log("Image upload response", response);
      })
      .catch(err => {
        console.log("Something BahDDD", err);
        this.setState({
          errorMessage: err.response.data.errorMessage
        });
      });
    const imageId = document.getElementById("image-uploader");
    imageId.style.display = "none";
  };

  render() {
    const { user, deleteUser, confirmDelete } = this.state;

    return (
      <div className="container">
        <Navbar />
        <SiteHeader name="Settings" />
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
            <Header as="h1">{user.name}</Header>
            <p>{user.accountType}</p>

            <div>
              <Icon
                style={{ cursor: "pointer", fontSize: "1.4rem" }}
                className="edit outline green"
                onClick={this.toggle}
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
          <div id="settings">
            <div className="setting">
              <div className="info-label">Username:</div>
              <div className="info-data_username">{user.username}</div>
              <input className="input" type="type" value={user.username} />
              <button className="setting-button" onClick={this.toggleChange}>
                Change{" "}
              </button>
            </div>
            <div className="setting">
              <div className="info-label">Email:</div>
              <div className="info-data_email"> {user.email}</div>
              <input
                className="input"
                type="type"
                name="email"
                value={user.email}
              />
              <button className="setting-button" onClick={this.toggleChange}>
                Change
              </button>{" "}
            </div>
            <div className="setting">
              <div className="info-label">Password:</div>
              <div className="info-label_password">****************** </div>
              <div className="reset-password">
                <input className="password" type="password" />
                <input className="password" type="password" />
                <input className="password" type="password" />
              </div>
              <button
                className="setting-button"
                onClick={this.toggleChange}
              >
                Change
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserSettings;
