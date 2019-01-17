import React from "react";
import { Segment, Header, Icon, Confirm } from "semantic-ui-react";

class AssignmentCard extends React.Component{
  constructor(){
    super();
    this.state= {
      confirmDelete: false,
    }
  } 
  
  render() {  
    const { assignment, deleteAssignment, changeStatus} = this.props;
    const { confirmDelete } = this.state;
    const { _id } = this.props.assignment;
    return (
      <Segment style={{ width: "18rem", margin: "1rem" }}>
        <Header textAlign="center" as="h2">
          {`${assignment.user}'s ${assignment.title}`}
        </Header>
        <p style={{ fontSize: "1.4rem" }}>
          <Icon
            className={`${
              assignment.status === "completed" ? "check green" :
              assignment.status === "initial" ? "play circle outline" : "time yellow"
              }`}
            style={{ cursor: "pointer", margin: "0 .5rem" }}
            onClick={() => changeStatus(_id)}
          />
          <Icon
            style={{ cursor: "pointer", margin: "0 .5rem" }}
            className="edit green"
          />
          <Icon
            style={{ cursor: "pointer", margin: "0 .5rem" }}
            className="trash alternate outline red"
            onClick={() => this.setState({confirmDelete: true})}
          />
          <Confirm open={confirmDelete}
            size="mini"
            onCancel={() => this.setState({ confirmDelete: false })}
            content={`Remove ${assignment.user}'s ${assignment.title}?`}
            onConfirm={() => {
              deleteAssignment( _id);     
              this.setState({ confirmDelete: false })}
            }
          />
        </p>
        <div style={{ widht: "100%", textAlign: "left" }}>
          <p>Due: {assignment.due.toString()}</p>
          <p />
          <p>
            Description:
          <br /> {assignment.description}
          </p>
        </div>
      </Segment>
    );
  }
};

export default AssignmentCard;
