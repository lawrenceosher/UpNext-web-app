/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormCheck, ListGroup } from "react-bootstrap";
import { CiCircleRemove } from "react-icons/ci";
import { useState } from "react";
import DeleteQueueItemModal from "./DeleteQueueItemModal";
import "./QueueList.css";
import { useSelector } from "react-redux";
import * as queueClient from "../clients/queueClient";

export default function QueueList({
  mediaType,
  queue,
  currentQueue,
  historyQueue,
  showHistory,
  setCompletedMediaIDs,
  setSelectedMedia,
  setMediaQueue,
}: {
  mediaType: string;
  queue: any;
  currentQueue: any;
  historyQueue: any;
  showHistory: boolean;
  setCompletedMediaIDs: (_ids: any) => void;
  setSelectedMedia: (media: any) => void;
  setMediaQueue: (queue: any) => void;
}) {
  const [showDeleteQueueItemModal, setShowDeleteQueueItemModal] =
    useState(false);
  const handleClose = () => setShowDeleteQueueItemModal(false);
  const handleShow = () => setShowDeleteQueueItemModal(true);
  const [queueItemForModal, setQueueItemForModal] = useState<any>({
    _id: '',
    title: '',
  });
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const removeMediaFromQueue = async (mediaId: string) => {
    if (!currentUser) return;

    if (
      currentQueue &&
      currentQueue.map((mediaItem: any) => mediaItem._id).includes(mediaId)
    ) {
      try {
        const updatedQueue = await queueClient.deleteMediaFromCurrentQueue(
          mediaType,
          queue._id,
          mediaId
        );
        setMediaQueue(updatedQueue);
        setSelectedMedia(null);
      } catch (error) {
        console.error("Error deleting media from current queue:", error);
      }
    }

    if (
      historyQueue &&
      historyQueue.map((mediaItem: any) => mediaItem._id).includes(mediaId)
    ) {
      try {
        const updatedQueue = await queueClient.deleteMediaFromHistoryQueue(
          mediaType,
          queue._id,
          mediaId
        );
        setMediaQueue(updatedQueue);
        setSelectedMedia(null);
      } catch (error) {
        console.error("Error deleting media from history queue:", error);
      }
    }
  };

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
        queueItem={queueItemForModal}
        removeMediaFromQueue={removeMediaFromQueue}
      />
      {!showHistory ? (
        <ListGroup className="mt-4 fs-4" id="queue">
          {currentQueue && currentQueue.length === 0 && (
            <p>No items in queue. Search for media and add to the queue!</p>
          )}
          {currentQueue &&
            currentQueue.map((mediaItem: any) => {
              return (
                <ListGroup.Item
                  key={mediaItem._id}
                  className="d-flex align-items-center"
                  id="queue-item"
                  onClick={() => setSelectedMedia(mediaItem)}
                >
                  <FormCheck
                    type="checkbox"
                    label={mediaItem.title}
                    className="flex-grow-1"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCompletedMediaIDs((prev: any) => {
                          return [...prev, mediaItem._id];
                        });
                      } else {
                        setCompletedMediaIDs((prev: any) => {
                          return prev.filter((id: any) => id !== mediaItem._id);
                        });
                      }
                    }}
                  />
                  <CiCircleRemove
                    id="remove-button"
                    className="fs-2"
                    onClick={() => {
                      setQueueItemForModal(mediaItem);
                      handleShow();
                    }}
                  />
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      ) : (
        <ListGroup className="mt-4 fs-4" id="queue">
          {historyQueue && historyQueue.length === 0 && (
            <p>
              No previously consumed media. Check off media in your current
              queue!
            </p>
          )}
          {historyQueue &&
            historyQueue.map((mediaItem: any) => {
              return (
                <ListGroup.Item
                  key={mediaItem._id}
                  className="d-flex align-items-center"
                  id="queue-item"
                  onClick={() => setSelectedMedia(mediaItem)}
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
                      `(${mediaItem.datePublished.slice(0, 4)})`}
                    {mediaType === "Podcast" &&
                      `(${mediaItem.latestEpisodeDate.slice(0, 4)})`}
                  </span>
                  <CiCircleRemove
                    id="remove-button"
                    className="fs-2"
                    onClick={() => {
                      setQueueItemForModal(mediaItem);
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
