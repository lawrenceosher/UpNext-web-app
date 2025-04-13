import { Modal, Button } from "react-bootstrap";

export default function DeleteUserModal({
  show,
  handleClose,
  username,
  userId,
  deleteUser,
}: {
  show: boolean;
  handleClose: () => void;
  username: string;
  userId: string;
  deleteUser: (userId: string) => void;
}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose} className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user: {username}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteUser(userId);
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
