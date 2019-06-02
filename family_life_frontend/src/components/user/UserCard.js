import React, { Component } from "react";

import {
  Segment,
  Image,
  Header,
  Icon,
  Confirm,
} from "semantic-ui-react";

class UserCard extends Component {
  state = {
    confirmDelete: false
  };

  render() {
    const { user, deleteUser } = this.props;
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
        <Header as="h1">{user.name}</Header>
        <p>{user.accountType}</p>
        {/* Enable only a parent to delete account
         */}
        {localStorage.getItem("accountType") === "Primary" ||
        localStorage.getItem("accountType") === "Spouse" ? (
          <div>
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
