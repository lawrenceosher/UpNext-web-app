/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "react-bootstrap";

/**
 * Used to confirm the deletion of a queue item
 * @param show - Whether the modal is visible or not
 * @param handleClose - Function to close the modal
 * @param queueItem - The queue item to be deleted
 * @param removeMediaFromQueue - Function to remove media from the queue
 */
export default function DeleteQueueItemModal({
  show,
  handleClose,
  queueItem,
  removeMediaFromQueue,
}: {
  show: boolean;
  handleClose: () => void;
  queueItem: any;
  removeMediaFromQueue: (mediaId: string) => void;
}) {

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Delete Queue Item</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          Are you sure you want to remove {queueItem.title}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              removeMediaFromQueue(queueItem._id);
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
