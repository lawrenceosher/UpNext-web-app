/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { MdAdd } from "react-icons/md";

/**
 * Modal to create a new group
 * @param show Condition to show the modal
 * @param handleClose Function to close the modal
 * @param newGroup Object containing the new group details
 * @param setNewGroup Function to set the new group details
 * @param handleCreateGroup Function to handle the creation of the group
 */
export default function CreateGroupModal({
  show,
  handleClose,
  newGroup,
  setNewGroup,
  handleCreateGroup,
}: {
  show: boolean;
  handleClose: () => void;
  newGroup: any;
  setNewGroup: (group: any) => void;
  handleCreateGroup: () => void;
}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose} className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                value={newGroup.name}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, name: e.target.value })
                }
                placeholder="Enter group name"
              />
            </Form.Group>

            <Button
              size="lg"
              id="action-button"
              className="purple-brand-bg border-0 mt-3 float-end"
              onClick={() => {
                handleCreateGroup();
                handleClose();
              }}
            >
              <MdAdd className="me-1 mb-1 fs-4" /> Create Group
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
