/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormCheck, ListGroup } from "react-bootstrap";
import { CiCircleRemove } from "react-icons/ci";
import DeleteQueueItemModal from "./DeleteQueueItemModal";
import "../styles/QueueList.css";
import { useSelector } from "react-redux";
import useQueueList from "../../hooks/useQueueList";
import { Queue } from "../../types/queue";

/**
 * Displays a list of media items in the user's queue.
 * Allows users to check off completed items and remove items from the queue.
 * Encapsulates both current and history queues based on the `showHistory` prop.
 * @param mediaType - The type of media (e.g., Movie, TV, etc.)
 * @param queue - The entire queue object, containing metadata and media items in both current and history queues
 * @param showHistory - Boolean indicating whether to show history or current queue
 * @param setCompletedMediaIDs - Function to set completed media IDs
 * @param setSelectedMedia - Function to set the selected media item
 * @param setMediaQueue - Function to set the media queue
 */
export default function QueueList({
  mediaType,
  mediaQueue,
  showHistory,
  setCompletedMediaIDs,
  setSelectedMedia,
  setMediaQueue,
}: {
  mediaType: string;
  mediaQueue: Queue | null | undefined;
  showHistory: boolean;
  setCompletedMediaIDs: (_ids: any) => void;
  setSelectedMedia: (media: any) => void;
  setMediaQueue: (queue: any) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const {
    showDeleteQueueItemModal,
    handleCloseDeleteQueueItemModal,
    handleShowDeleteQueueItemModal,
    queueItemForModal,
    setQueueItemForModal,
    removeMediaFromQueue,
  } = useQueueList(
    currentUser,
    mediaQueue,
    mediaType,
    setMediaQueue,
    setSelectedMedia
  );

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
        handleClose={handleCloseDeleteQueueItemModal}
        queueItem={queueItemForModal}
        removeMediaFromQueue={removeMediaFromQueue}
      />

      {/* Display the current queue or history queue based on the showHistory prop */}
      {!showHistory ? (
        // Display the current queue
        <ListGroup className="mt-4 fs-4" id="queue">
          {mediaQueue?.current && mediaQueue?.current.length === 0 && (
            <p>No items in queue. Search for media and add to the queue!</p>
          )}
          {mediaQueue?.current &&
            mediaQueue?.current.map((mediaItem: any) => {
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setQueueItemForModal(mediaItem);
                      handleShowDeleteQueueItemModal();
                    }}
                  />
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      ) : (
        // Display the history queue
        <ListGroup className="mt-4 fs-4" id="queue">
          {mediaQueue?.history && mediaQueue?.history.length === 0 && (
            <p>
              No previously consumed media. Check off media in your current
              queue!
            </p>
          )}
          {mediaQueue?.history &&
            mediaQueue?.history.map((mediaItem: any) => {
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setQueueItemForModal(mediaItem);
                      handleShowDeleteQueueItemModal();
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
