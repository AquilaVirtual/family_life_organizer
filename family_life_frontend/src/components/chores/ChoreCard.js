import React from "react";
import { Segment, Grid, Header, Icon, Button } from "semantic-ui-react";

import ChoreModal from "./ChoreModal";

class ChoreCard extends React.Component {
  state = {
    modal: false,
  }

  handleModalToggle = () => {
    this.setState(state => ({
      modal: !state.modal
    }))
  }
  render() {
    const { user, index, chores } = this.props;
    return (
      <Segment
        style={{
          maxWidth: "40rem",
          margin: "0 auto"
        }}
      >
        <Grid style={{ marginBottom: "2rem" }} columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Header textAlign="left" as="h2">
                {user}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h2">{index === 0 && "Status"}</Header>
            </Grid.Column>
          </Grid.Row>
          {chores.map((chore, i) => (
            <React.Fragment key={i}>
              <Grid.Column
                style={{ paddingLeft: "3rem", textAlign: "left" }}
              >{chore.title}</Grid.Column>
              <Grid.Column>
                {chore.status === "completed" ? (
                  <Icon className="check icon green" />
                ) : chore.status === "not started" ? (
                  <Icon className="close icon red" />
                ) : (
                      <Icon className="clock outline icon yellow" />
                    )}
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
          handleModalToggle={this.handleModalToggle}
        />
      </Segment>
    );
}};

export default ChoreCard;
