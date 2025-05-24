/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { MediaItem, Queue } from "../types/queue";
import { User } from "../types/user";
import * as queueClient from "../clients/queueClient";

/**
 * Custom hook to manage the queue page state and actions.
 * It handles fetching the queue, adding media to the queue,
 * moving media from current to history, and checking if media is in the queue.
 * @param currentUser - The current user object
 * @param mediaType - The type of media (e.g., "Movie", "TV", etc.)
 * @returns An object containing state and functions for managing the queue
 */
const useQueuePage = (currentUser: User | undefined, mediaType: string) => {
  const [mediaQueue, setMediaQueue] = useState<Queue | null>();
  const [consumedMediaIDs, setConsumedMediaIDs] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [queueHistorySelected, setQueueHistorySelected] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const addMediaToCurrentQueue = async () => {
    if (selectedMedia === null || !currentUser || !mediaQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        mediaType,
        mediaQueue._id,
        selectedMedia
      );

      setMediaQueue(updatedQueue);
      setToastMessage(`Added ${selectedMedia.title} to your queue!`);
      setShowToast(true);
    } catch (error) {
      console.error("Error adding media to queue:", error);
    }
  };

  const moveMediaFromCurrentToHistory = async () => {
    if (!currentUser || consumedMediaIDs.length === 0 || !mediaQueue) return;

    try {
      const updatedQueue = await queueClient.moveMediaFromCurrentToHistory(
        mediaType,
        mediaQueue._id,
        consumedMediaIDs
      );

      setMediaQueue(updatedQueue);
    } catch (error) {
      console.error("Error moving media to history:", error);
    }
  };

  /**
   * Checks if a media item is in the current or history queue.
   * @param mediaId - The ID of the media item to check
   * @returns True if the media item is in the queue, false otherwise
   */
  const isMediaInQueue = (mediaId: string) => {
    return (
      mediaQueue?.current?.map((item: any) => item._id).includes(mediaId) ||
      mediaQueue?.history?.map((item: any) => item._id).includes(mediaId)
    );
  };

  // Fetch the queue items when the selected group, media type, or current user changes, and on mount
  useEffect(() => {
    const fetchQueueItems = async () => {
      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          mediaType,
          selectedGroup
        );

        setMediaQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };

    fetchQueueItems();
  }, [currentUser, mediaType, selectedGroup]);

  return {
    mediaQueue,
    setMediaQueue,
    consumedMediaIDs,
    setConsumedMediaIDs,
    selectedGroup,
    setSelectedGroup,
    queueHistorySelected,
    setQueueHistorySelected,
    selectedMedia,
    setSelectedMedia,
    addMediaToCurrentQueue,
    moveMediaFromCurrentToHistory,
    isMediaInQueue,
    showToast,
    setShowToast,
    toastMessage,
  };
};

export default useQueuePage;
