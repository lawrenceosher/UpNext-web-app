import { Button, Modal } from "react-bootstrap";

export default function DeleteQueueItemModal({
  show,
  handleClose,
  queueItemTitle,
}: {
  show: boolean;
  handleClose: () => void;
  queueItemTitle: string;
}) {

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Delete Queue Item</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          Are you sure you want to remove {queueItemTitle}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
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
