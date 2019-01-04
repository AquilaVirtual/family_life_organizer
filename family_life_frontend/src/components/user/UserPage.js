import React from "react";
import { Segment, Button, Header } from "semantic-ui-react";

import { account } from "../../dummyData";

import UserCard from "./UserCard";
import MemberModal from "./MemberModal";
import StatusCheck from "../auth/StatusCheck";

class UserPage extends React.Component {
  state = {
    user: {},
    modal: false,
    action: "add",
    member: null
  };

  componentDidMount() {
    this.setState({
      user: account
    });
  }

  handleModalToggle = (action, member) => {
    this.setState(state => ({
      modal: !state.modal,
      action,
      member
    }));
  };

  handleMemberAction = (member, id) => {
    if (this.state.action === "Add") {
      this.setState(state => ({
        user: {
          ...state.user,
          familyMembers: [...state.user.familyMembers, member]
        }
      }));
    } else if (!id && id !== 0) {
      this.setState(state => ({
        user: {
          ...state.user,
          name: member.name,
          type: member.type
        }
      }));
    } else {
      this.setState(state => ({
        user: {
          ...state.user,
          familyMembers: state.user.familyMembers.map((currentMember, i) => {
            if (i === id) {
              return member;
            }
            return currentMember;
          })
        }
      }));
    }
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
    const { currentUser, history, toggleModal, type } = this.props;

    if (!currentUser)
      return <StatusCheck history={history} toggleModal={toggleModal} />;

    if (!user.name) return <div>No User</div>;

    return (
      <Segment
        style={{
          textAlign: "center",
          border: "none",
          boxShadow: "0px 0px 0px",
          height: "100vh",
          padding: "0px 0px"
        }}
      >
        <Header as="h2">FamilyLife</Header>
        {type !== "child" && (
          <>
            <UserCard
              user={{ name: user.name, type: user.type }}
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
              {user.familyMembers &&
                user.familyMembers.map((member, id) => (
                  <UserCard
                    key={id}
                    user={member}
                    deleteUser={() => this.deleteUser(id)}
                    handleModalToggle={() =>
                      this.handleModalToggle("Edit", {
                        id: id,
                        member: member
                      })
                    }
                  />
                ))}
            </div>
          </>
        )}
        {
          type === "child" &&
          <UserCard
            child
            user={user.familyMembers.find((member) => member.name === currentUser)}
            deleteUser={() => this.deleteUser()}
            handleModalToggle={() =>
              this.handleModalToggle("Edit", {
                member: { name: user.name, type: user.type }
              })
            }
          />
        }
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
