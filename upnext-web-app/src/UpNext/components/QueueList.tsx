import { FormCheck, ListGroup } from "react-bootstrap";
import { CiCircleRemove } from "react-icons/ci";
import { useState } from "react";
import DeleteQueueItemModal from "./DeleteQueueItemModal";
import "./QueueList.css";

const dummyMovies = [
  { _id: 1, title: "Pacific Rim" },
  { _id: 2, title: "Ferris Bueller's Day Off" },
  { _id: 3, title: "Mad Max Fury Road" },
  { _id: 4, title: "Big Lebowski" },
  { _id: 5, title: "Rango" },

  { _id: 6, title: "Pacific Rim" },
  { _id: 7, title: "Ferris Bueller's Day Off" },
  { _id: 8, title: "Mad Max Fury Road" },
  { _id: 9, title: "Big Lebowski" },
  { _id: 10, title: "Rango" },

  { _id: 11, title: "Pacific Rim" },
  { _id: 12, title: "Ferris Bueller's Day Off" },
  { _id: 13, title: "Mad Max Fury Road" },
  { _id: 14, title: "Big Lebowski" },
  { _id: 15, title: "Rango" },
];

export default function QueueList({
  queueListType,
}: {
  queueListType: string;
}) {
  const [showDeleteQueueItemModal, setShowDeleteQueueItemModal] =
    useState(false);
  const handleClose = () => setShowDeleteQueueItemModal(false);
  const handleShow = () => setShowDeleteQueueItemModal(true);
  const [queueItemForModal, setQueueItemForModal] = useState("");

  return (
    <>
      <DeleteQueueItemModal
        show={showDeleteQueueItemModal}
        handleClose={handleClose}
        queueItemTitle={queueItemForModal}
        queueItemType={queueListType}
      />

      <ListGroup className="mt-4 fs-4" id="queue">
        {dummyMovies.map((movie) => {
          return (
            <ListGroup.Item
              key={movie._id}
              className="d-flex align-items-center"
              id="queue-item"
            >
              <FormCheck
                type="checkbox"
                label={movie.title}
                className="flex-grow-1"
              />
              <CiCircleRemove
                id="remove-button"
                className="fs-2"
                onClick={() => {
                  setQueueItemForModal(movie.title);
                  handleShow();
                }}
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}
