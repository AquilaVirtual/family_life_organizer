import React from 'react';
import { Segment, Image, Header, Icon, Confirm } from 'semantic-ui-react';

class UserCard extends React.Component {
  state = {
    confirmDelete: false,
  }
  render() {
    const { user, deleteUser, handleModalToggle } = this.props;
    const { confirmDelete } = this.state;

    return (
      <Segment style={{
        width: "18rem",
        margin: "1rem auto"
      }}
        textAlign="center"
      >
        <Image
          centered
          src={
            user && user.url
              ? user.url
              : "https://react.semantic-ui.com/images/wireframe/square-image.png"
          }
          size="small"
          circular
        />
        <Header as="h1">{user.name}</Header>
        <p>{user.type}</p>

        <Icon style={{ cursor: "pointer", fontSize: "1.4rem" }}
          className="edit outline green"
          onClick={handleModalToggle}
        />
        <Icon style={{ cursor: "pointer", fontSize: "1.4rem" }}
          className="trash alternate outline red"
          onClick={() => this.setState({ confirmDelete: true })}
        />
        <Confirm open={confirmDelete}
          size="mini"
          content={`Are you sure you want to remove ${user.name} ?`}
          onCancel={() => this.setState({ confirmDelete: false })}
          onConfirm={() => {
            deleteUser();
            this.setState({ confirmDelete: false })}
          }
        />
      </Segment>
    );
  }
}

export default UserCard;