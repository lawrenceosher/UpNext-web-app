import { Modal, Button } from "react-bootstrap";

/**
 * Modal to leave a group
 * @param show Condition to show the modal
 * @param handleClose Function to close the modal
 * @param groupName Name of the group to leave
 * @param groupId ID of the group to leave
 * @param leaveGroup Function to handle leaving the group
 */
export default function LeaveGroupModal({
  show,
  handleClose,
  groupName,
  groupId,
  leaveGroup,
}: {
  show: boolean;
  handleClose: () => void;
  groupName: string;
  groupId: string;
  leaveGroup: (groupId: string) => void;
}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose} className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>Leave Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to leave this group: {groupName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              leaveGroup(groupId);
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
