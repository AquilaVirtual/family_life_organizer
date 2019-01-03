import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";

const AssignmentCard = ({ assignment }) => {
  return (
    <Segment style={{ width: "18rem", margin: "1rem" }}>
      <Header textAlign="center" as="h2">
        {`${assignment.user}'s ${assignment.title}`}
      </Header>
      <p>
        <Icon className={`${assignment.status === "completed" ? "check green" : "time yellow"}`} />
        {assignment.status}
      </p>
      <div style={{ widht: "100%", textAlign: "left" }}>
        <p>Due: {assignment.due.toDateString()}</p>
        <p>
        </p>
        <p>
          Description:
          <br /> {assignment.description}
        </p>
      </div>
    </Segment>
  );
};

export default AssignmentCard;
