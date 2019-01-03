import React from "react";
import { Segment, Button } from "semantic-ui-react";

import { account } from "../../dummyData";

import UserCard from "./UserCard";
import MemberModal from "./MemberModal";

class UserPage extends React.Component {
  state = {
    user: {},
    modal: false,
    action: "add"
  };

  componentDidMount() {
    this.setState({
      user: account
    });
  }

  handleModalToggle = action => {
    this.setState(state => ({
      modal: !state.modal,
      action
    }));
  };

  handleMemberAction = (member, id) => {
    if (this.state.action === "add") {
      this.setState(state => ({
        user: {
          ...state.user,
          familyMembers: [
            ...state.user.familyMembers,
            member
          ]
        }
      }))
    }
  };

  render() {
    const { user, modal, action } = this.state;

    return (
      <Segment style={{ textAlign: "center" }}>
        <UserCard user={{ name: user.name, type: user.type }} />
        <Button
          circular
          primary
          icon="add"
          content="Family Member"
          onClick={() => this.handleModalToggle("add")}
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
          {user.familyMembers &&
            user.familyMembers.map((member, id) => (
              <UserCard key={id} user={member} />
            ))}
        </div>
        <MemberModal open={modal} action={action}
          addMember={this.handleMemberAction}
          handleModalToggle={this.handleModalToggle}
        />
      </Segment>
    );
  }
}

export default UserPage;