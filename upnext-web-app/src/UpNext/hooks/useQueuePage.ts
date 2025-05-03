/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { MediaItem, Queue } from "../types/queue";
import { User } from "../types/user";
import * as queueClient from "../clients/queueClient";

const useQueuePage = (currentUser: User | undefined, mediaType: string) => {
  const [mediaQueue, setMediaQueue] = useState<Queue | null>();
  const [consumedMediaIDs, setConsumedMediaIDs] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [queueHistorySelected, setQueueHistorySelected] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const addMediaToCurrentQueue = async () => {
    if (selectedMedia === null || !currentUser || !mediaQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        mediaType,
        mediaQueue._id,
        selectedMedia
      );
      setMediaQueue(updatedQueue);
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

  const isMediaInQueue = (mediaId: string) => {
    return (
      mediaQueue?.current?.map((item: any) => item._id).includes(mediaId) ||
      mediaQueue?.history?.map((item: any) => item._id).includes(mediaId)
    );
  };

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
  };
};

export default useQueuePage;
