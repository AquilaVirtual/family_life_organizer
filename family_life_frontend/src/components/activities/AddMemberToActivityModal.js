import React from "react";
import axios from "axios";
import { Button, Modal, Form, Select } from "semantic-ui-react";


class AddMemberToActivity extends React.Component {
  state = {
    memberName: ""
  };
  componentWillReceiveProps(props) {
    if (props.activity) {
      this.setState({
        memberName:  props.activity.memberName,        
      })
    }
  }
  handleChange =  event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  
  handleAddMember = () => {
    const { handleModalToggle, activity } = this.props;
    const { memberName, } = this.state;    
   
    this.setState({
        memberName: ""    
    });

  };
  addMemberToActivity = () => {    
    // console.log("New member", this.state.memberName)
    // const { activity } = this.props;
    // const username = localStorage.getItem("username");
    // axios.put(`http://localhost:3002/api/activity/add_member_to_activity/${activity._id}`, {username})
    // .then(activities => {     
    //   console.log("Add member fired!")
    // })
    // .catch(err => {
    //   console.log("We have a problem", err)
    // })  
    //   this.props.handleActivityToggle(); 
     }

  toggleAction = () => {
    if(this.props.action === "Edit") {
      this.props.handleActivityToggle();
    }
    else if(this.props.action === "Add") {
      this.props.handleModalToggle();
    }
    else if(this.props.action === "Add Person") {
      this.props.handleActivityToggle();
    }
  }
  render() {
    const { action, open, handleModalToggle, _id } = this.props
    const {  memberName } = this.state;
    console.log("Action has been fired: ", this.props.action)
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>{`Add a family member to this activity`}</Modal.Header>     
        <Modal.Content style={{ marginBottom: "2rem" }}>
    
            <Form onSubmit={this.addMemberToActivity}>
            <Form.Input          
              placeholder="Type full name of person"
              onChange={this.handleChange}
              name="memberName"
              value={memberName}
            />            
            <div style={{ padding: "1rem 0"}}>
              <Button
                primary
                floated="right"
                type="submit"
                content="Member"
                icon={`${action ===  "Add Person" ? "add" : "add"}`}            
              />
              <Button
                floated="right"
                type="cancel"
                icon="cancel"
                content="Cancel"
                onClick={this.toggleAction}
              />
            </div>
          </Form>
          
        </Modal.Content>
      </Modal>
    );
  }
}
export default AddMemberToActivity;
