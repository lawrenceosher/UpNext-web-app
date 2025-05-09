/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { MediaItem, Queue } from "../types/queue";
import * as queueClient from "../clients/queueClient";
import { User } from "../types/user";

/**
 * Custom hook to manage media details and queue actions.
 * It fetches media details, displays them, and provides functions to add media to the queue.
 * @param currentUser - The current user object
 * @param mediaId - The ID of the media item
 * @param mediaType - The type of media (e.g., "Movie", "TV", etc.)
 * @returns An object containing state and functions for managing media details and queue actions
 */
const useDetails = (
  currentUser: User | undefined,
  mediaId: string | undefined,
  mediaType: string
) => {
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [mediaQueue, setMediaQueue] = useState<Queue | undefined>(undefined);

  // State to manage the visibility of the alert
  // when a media item is added to the queue
  const [showAlert, setShowAlert] = useState(false);

  // Function to check if a media item is in the current or history queue
  const isMediaInQueue = (mediaId: string | undefined) => {
    return (
      (mediaQueue &&
        mediaQueue.current.map((item: any) => item._id).includes(mediaId)) ||
      (mediaQueue &&
        mediaQueue.history.map((item: any) => item._id).includes(mediaId))
    );
  };

  const addMediaToCurrentQueue = async () => {
    if (!currentUser || !mediaQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        mediaType,
        mediaQueue._id,
        media
      );

      setMediaQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding media to queue:", error);
    }
  };

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        if (!mediaId) return;
        const mediaResult = await queueClient.retrieveMediaDetails(
          mediaType,
          mediaId
        );

        setMedia(mediaResult);
      } catch (error) {
        console.error("Error fetching media:", error);
      }

      if (!currentUser) return;

      // Fetch the user's queue - used to check if the media is already in the queue
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          mediaType
        );

        setMediaQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };

    fetchMediaDetails();
  }, [currentUser, mediaId, mediaType]);

  return {
    media,
    mediaQueue,
    addMediaToCurrentQueue,
    showAlert,
    setShowAlert,
    isMediaInQueue,
  };
};

export default useDetails;
