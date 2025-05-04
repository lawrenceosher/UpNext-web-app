/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { User } from "../types/user";
import * as queueClient from "../clients/queueClient";

/**
 * Manages the state and actions for the queue list, including showing/hiding the delete modal,
 * removing media from the queue, and setting the selected media item.
 * @param currentUser The currently logged-in user
 * @param mediaQueue - The entire queue object, containing metadata and media items in both current and history queues
 * @param mediaType - The type of media (e.g., Movie, TV, etc.)
 * @param setMediaQueue - Function to set the media queue
 * @param setSelectedMedia - Function to set the selected media item
 * @returns An object containing state and functions to manage the queue list
 */
const useQueueList = (
  currentUser: User | undefined,
  mediaQueue: any,
  mediaType: string,
  setMediaQueue: (queue: any) => void,
  setSelectedMedia: (media: any) => void
) => {
  // State and handler functions to manage the visibility of the delete modal
  const [showDeleteQueueItemModal, setShowDeleteQueueItemModal] =
    useState(false);
  const handleCloseDeleteQueueItemModal = () =>
    setShowDeleteQueueItemModal(false);
  const handleShowDeleteQueueItemModal = () =>
    setShowDeleteQueueItemModal(true);

  // State to hold the media item to be deleted
  const [queueItemForModal, setQueueItemForModal] = useState({
    _id: "",
    title: "",
  });

  const removeMediaFromQueue = async (mediaId: string) => {
    if (!currentUser) return;

    // If the media item is in the current queue, delete it from there
    if (
      mediaQueue.current &&
      mediaQueue.current
        .map((mediaItem: any) => mediaItem._id)
        .includes(mediaId)
    ) {
      try {
        const updatedQueue = await queueClient.deleteMediaFromCurrentQueue(
          mediaType,
          mediaQueue._id,
          mediaId
        );

        // Update the media queue in the state
        setMediaQueue(updatedQueue);

        // Reset the selected media
        setSelectedMedia(null);
      } catch (error) {
        console.error("Error deleting media from current queue:", error);
      }
    }

    // If the media item is in the history queue, delete it from there
    if (
      mediaQueue.history &&
      mediaQueue.history
        .map((mediaItem: any) => mediaItem._id)
        .includes(mediaId)
    ) {
      try {
        const updatedQueue = await queueClient.deleteMediaFromHistoryQueue(
          mediaType,
          mediaQueue._id,
          mediaId
        );

        // Update the media queue in the state
        setMediaQueue(updatedQueue);

        // Reset the selected media
        setSelectedMedia(null);
      } catch (error) {
        console.error("Error deleting media from history queue:", error);
      }
    }
  };

  return {
    showDeleteQueueItemModal,
    handleCloseDeleteQueueItemModal,
    handleShowDeleteQueueItemModal,
    queueItemForModal,
    setQueueItemForModal,
    removeMediaFromQueue,
  };
};

export default useQueueList;
