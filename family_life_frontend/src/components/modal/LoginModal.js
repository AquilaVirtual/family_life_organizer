import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";

class AssignmentModal extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { signin } = this.props;
    const { email, password } = this.state;

    this.setState({
      email: "",
      password: "",
    });

    signin(email, password);
  };

  render() {
    const { open, toggleModal } = this.props;
    const { email, password } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>Sign In to FamilyLife</Modal.Header>
        <Modal.Content style={{ marginBottom: "2rem" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <input
              placeholder="Email"
              name="email"
              type="text"
              value={email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button content="cancel" icon="cancel" onClick={toggleModal} />
          <Button content="sign in" icon="sign-in" type="submit" primary />
        </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AssignmentModal;
