import React from "react";
import { Segment, Grid, Header, Icon } from "semantic-ui-react";

const ChoreCard = ({ user, index, chores }) => {
  return (
    <Segment
      style={{
        maxWidth: "40rem",
        margin: "0 auto"
      }}
    >
      <Grid columns={2}>
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
            <Grid.Column>{chore.title}</Grid.Column>
            <Grid.Column>
              {chore.status === "completed" ? (
                <Icon className="check icon" />
              ) : chore.status === "not started" ? (
                <Icon className="close icon" />
              ) : (
                <Icon className="clock outline icon" />
              )}
            </Grid.Column>
          </React.Fragment>
        ))}
      </Grid>
    </Segment>
  );
};

export default ChoreCard;
