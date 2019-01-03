import React from "react";
import { Segment, Grid, Header, Icon, Button, Confirm } from "semantic-ui-react";

import ChoreModal from "./ChoreModal";

class ChoreCard extends React.Component {
  state = {
    modal: false,
    confirmDelete: false,
  }

  handleModalToggle = () => {
    this.setState(state => ({
      modal: !state.modal
    }))
  }
  render() {
    const { user, id, index, chores, addChore } = this.props;
    const { confirmDelete } = this.state;
    return (
      <Segment
        style={{
          maxWidth: "40rem",
          margin: "0 auto"
        }}
      >
        <Grid style={{ marginBottom: "2rem" }} columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Header textAlign="left" as="h2">
                {user}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">{index === 0 && "Status"}</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">{index === 0 && "Actions"}</Header>
            </Grid.Column>
          </Grid.Row>
          {chores.map((chore, i) => (
            <React.Fragment key={i}>
              <Grid.Column
                style={{ paddingLeft: "3rem", textAlign: "left" }}
              >{chore.title}</Grid.Column>
              <Grid.Column>
                <Icon className={`${
                  chore.status === "completed" ?
                    "check green" :
                  chore.status === "not started" ?
                    "close red" :
                    "clock outline yellow"
                  } icon`}
                  style = {{ fontSize: "1.4rem" }}
                />
              </Grid.Column>
              <Grid.Column textAlign="right">
                {
                  chore.status !== "completed" &&
                  <Icon className={`${
                    chore.status === "not started" ?
                    "arrow alternate circle right yellow" :
                    "stop circle outline green"
                    } icon`}
                    style = {{ cursor: "pointer", fontSize: "1.4rem" }}
                  />
                }
                <Icon style={{ cursor: "pointer", fontSize: "1.4rem" }}
                  className="trash alternate outline"
                  onClick={() => this.setState({confirmDelete: true})}
                />
                <Confirm open={confirmDelete}
                  content="Are you sure you want to delete this chore?"
                  onCancel={() => this.setState({ confirmDelete: false })}
                  onConfirm={() => {
                    console.log("delete a chore");
                    this.setState({ confirmDelete: false })}
                  }
                />
              </Grid.Column>
            </React.Fragment>
          ))}
        </Grid>
        <Button primary icon="add" content="New Chore"
          onClick={this.handleModalToggle}
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
}};

export default ChoreCard;
