import React, { Component } from "react";
import {
  Segment,
  Grid,
  Header,
  Icon,
  Button,
  Confirm
} from "semantic-ui-react";

import ChoreModal from "./ChoreModal";

class ChoreCard extends Component {
  state = {
    modal: false,
    confirmDelete: false,
    deleteIndex: null
  };

  handleModalToggle = () => {
    this.setState(state => ({
      modal: !state.modal
    }));
  };

  render() {
    const {
      user,
      id,
      index,
      chores,
      addChore,
      deleteChore,
      updateStatus
    } = this.props;
    const { confirmDelete } = this.state;
    const accountType = localStorage.getItem("accountType");
    return (
      <Segment
        style={{
          maxWidth: "40rem",
          margin: "0.5rem auto"
        }}
      >
        <Grid style={{ marginBottom: "2rem" }} columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Header textAlign="left" as="h2">
                {user.split(" ")[0]}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">{index === 0 && "Status"}</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">{index === 0 && "Actions"}</Header>
            </Grid.Column>
          </Grid.Row>
          {chores.map(chore => (
            <React.Fragment key={chore._id}>
              <Grid.Column style={{ paddingLeft: "3rem", textAlign: "left" }}>
                {chore.title}
              </Grid.Column>
              <Grid.Column>
                <Icon
                  className={`${
                    chore.status === "completed"
                      ? "check green"
                      : chore.status === "not started"
                      ? "close red"
                      : "clock outline yellow"
                  } icon`}
                  style={{ fontSize: "1.4rem" }}
                />
              </Grid.Column>
              <Grid.Column textAlign="right">
                {chore.status !== "completed" && (
                  <Icon
                    className={`${
                      chore.status === "not started"
                        ? "arrow alternate circle right yellow"
                        : "stop circle outline green"
                    } icon`}
                    style={{ cursor: "pointer", fontSize: "1.4rem" }}
                    onClick={() => updateStatus(chore._id)}
                  />
                )}
                {accountType === "Primary" || accountType === "Spouse" ? (
                  <Icon
                    style={{ cursor: "pointer", fontSize: "1.4rem" }}
                    className="trash alternate outline"
                    onClick={() => {
                      this.setState({
                        confirmDelete: true,
                        deleteIndex: chore._id
                      });
                    }}
                  />
                ) : null}
              </Grid.Column>
            </React.Fragment>
          ))}
        </Grid>
        {/* Only allow parents to add new chores */}
        {localStorage.getItem("accountType") === "Primary" ||
        localStorage.getItem("accountType") === "Spouse" ? (
          <Button
            primary
            icon="add"
            content="New Chore"
            onClick={this.handleModalToggle}
          />
        ) : null}
        <Confirm
          open={confirmDelete}
          content="Are you sure you want to delete this chore?"
          onCancel={() => this.setState({ confirmDelete: false })}
          onConfirm={() => {
            deleteChore(this.state.deleteIndex);
            this.setState({ confirmDelete: false });
          }}
        />
        <ChoreModal
          open={this.state.modal}
          user={user}
          id={id}
          addChore={addChore}
          handleModalToggle={this.handleModalToggle}
        />
      </Segment>
    );
  }
}

export default ChoreCard;
