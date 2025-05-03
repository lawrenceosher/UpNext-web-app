/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { MediaItem, Queue } from "../types/queue";
import * as queueClient from "../clients/queueClient";
import { User } from "../types/user";

const useDetails = (
  currentUser: User | undefined,
  mediaId: string | undefined,
  mediaType: string
) => {
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [mediaQueue, setMediaQueue] = useState<Queue | undefined>(undefined);

  const [showAlert, setShowAlert] = useState(false);

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
