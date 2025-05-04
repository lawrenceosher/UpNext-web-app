import { Modal, Button } from "react-bootstrap";

/**
 * Modal to delete a group
 * @param show Condition to show the modal
 * @param handleClose Function to close the modal
 * @param groupName Name of the group to be deleted
 * @param groupId ID of the group to be deleted
 * @param deleteGroup Function to handle the deletion of the group
 */
export default function DeleteGroupModal({
  show,
  handleClose,
  groupName,
  groupId,
  deleteGroup,
}: {
  show: boolean;
  handleClose: () => void;
  groupName: string;
  groupId: string;
  deleteGroup: (groupId: string) => void;
}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose} className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>Delete Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this group: {groupName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteGroup(groupId);
              handleClose();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
