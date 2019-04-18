import React, { Component} from "react";
import { Segment, Image, Header, Icon, Confirm, Button, Form } from "semantic-ui-react";

import "./userCard.css";


class UserCard extends Component {
  state = {
    confirmDelete: false,
    imageUrl: ""
  };
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.user !== this.props.user;
  // }
  
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };  
  render() {
    console.log("User in card", this.props.user);
    console.log("User in card", this.state.imageUrl);
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
              : "https://react.semantic-ui.com/images/wireframe/square-image.png"
          }
          size="small"
          circular
        />
        <Button            
        className="add-image-button"            
            content="Change Image"
            style = {{ fontSize: ".7rem"}}
          /> 
          <div className="image-upload">         
            <input            
             type="file"
             name="imageUrl"
             value={this.state.imageUrl}
             onChange={this.handleInputChange}
             /> 
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
              onClick={handleModalToggle}
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
