/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";

export default function UpdateGroupModal({
  show,
  handleClose,
  updatedGroup,
  setUpdatedGroup,
  handleUpdateGroup,
}: {
  show: boolean;
  handleClose: () => void;
  updatedGroup: any;
  setUpdatedGroup: (group: any) => void;
  handleUpdateGroup: () => void;
}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose} className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>Update Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedGroup.groupName}
                onChange={(e) =>
                  setUpdatedGroup({ ...updatedGroup, groupName: e.target.value })
                }
                placeholder="Enter new group name"
              />
            </Form.Group>

            <Button
              size="lg"
              id="action-button"
              className="purple-brand-bg border-0 mt-3 float-end"
              onClick={() => {
                handleUpdateGroup();
                handleClose();
              }}
            >
              Update Group
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
