/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormCheck, ListGroup } from "react-bootstrap";
import { CiCircleRemove } from "react-icons/ci";
import { useEffect, useState } from "react";
import DeleteQueueItemModal from "./DeleteQueueItemModal";
import "./QueueList.css";
import { useSelector } from "react-redux";
import * as queueClient from "../clients/queueClient";

export default function QueueList({
  mediaType,
  showHistory,
}: {
  mediaType: string;
  showHistory: boolean;
}) {
  const [showDeleteQueueItemModal, setShowDeleteQueueItemModal] =
    useState(false);
  const handleClose = () => setShowDeleteQueueItemModal(false);
  const handleShow = () => setShowDeleteQueueItemModal(true);
  const [queueItemForModal, setQueueItemForModal] = useState("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [currentQueueItems, setCurrentQueueItems] = useState([]);
  const [historyQueueItems, setHistoryQueueItems] = useState([]);

  useEffect(() => {
    const fetchQueueItems = async () => {
      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          mediaType
        );
        setCurrentQueueItems(queue.current);
        setHistoryQueueItems(queue.history);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };
    fetchQueueItems();
  }, [mediaType, currentUser]);

  if (!currentUser)
    return (
      <p className="fs-3">
        Login required to interact with queues and add media.
      </p>
    );

  return (
    <>
      <DeleteQueueItemModal
        show={showDeleteQueueItemModal}
        handleClose={handleClose}
        queueItemTitle={queueItemForModal}
      />
      {!showHistory ? (
        <ListGroup className="mt-4 fs-4" id="queue">
          {currentQueueItems.length === 0 && (
            <p>No items in queue. Search for media and add to the queue!</p>
          )}
          {currentQueueItems.map((mediaItem: any) => {
            return (
              <ListGroup.Item
                key={mediaItem._id}
                className="d-flex align-items-center"
                id="queue-item"
              >
                <FormCheck
                  type="checkbox"
                  label={mediaItem.title}
                  className="flex-grow-1"
                />
                <CiCircleRemove
                  id="remove-button"
                  className="fs-2"
                  onClick={() => {
                    setQueueItemForModal(mediaItem.title);
                    handleShow();
                  }}
                />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <ListGroup className="mt-4 fs-4" id="queue">
          {historyQueueItems.length === 0 && (
            <p>
              No previously consumed media. Check off media in your current
              queue!
            </p>
          )}
          {historyQueueItems.map((mediaItem: any) => {
            return (
              <ListGroup.Item
                key={mediaItem._id}
                className="d-flex align-items-center"
                id="queue-item"
              >
                <span className="flex-grow-1">
                  {mediaItem.title}{" "}
                  {(mediaType === "Movie" ||
                    mediaType === "Album" ||
                    mediaType === "VideoGame") &&
                    `(${mediaItem.releaseDate.slice(0, 4)})`}
                  {mediaType === "TV" &&
                    `(${mediaItem.firstAirDate.slice(0, 4)})`}
                  {mediaType === "Book" &&
                    mediaItem.datePublished !== "" &&
                    `(${mediaItem.publishedDate.slice(0, 4)})`}
                  {mediaType === "Podcast" &&
                    `(${mediaItem.latestEpisodeDate.slice(0, 4)})`}
                </span>
                <CiCircleRemove
                  id="remove-button"
                  className="fs-2"
                  onClick={() => {
                    setQueueItemForModal(mediaItem.title);
                    handleShow();
                  }}
                />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </>
  );
}
