import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";

const ModalModalExample = ({ user }) => (
  <Modal size="mini" trigger={<Button icon="add" content="Add" />}>
    <Modal.Header>Add a Chore for {user}</Modal.Header>
    <Modal.Content style={{ marginBottom: "2rem"}}>
      <Form>
        <Form.Input placeholder="Add chore title..." />
        <Button floated="right" type="submit" icon="add" content="Add" />
        <Button floated="right" type="cancel" icon="cancel" content="Cancel" />
      </Form>
    </Modal.Content>
  </Modal>
);

export default ModalModalExample;
