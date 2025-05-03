/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const QUEUE_API = `${REMOTE_SERVER}/api/queue`;

/**
 * Retrieves the top 3 media items in the current personal queue for each media types for a user.
 * @param username - The username of the user whose queue is being retrieved
 * @returns The queue of the user
 */
export const retrieveTop3InCurrentQueueForUser = async (username: string) => {
  const response = await axiosWithCredentials.get(
    `${QUEUE_API}/current/${username}/top3`
  );
  return response.data;
};

/**
 * Retrieves the media items in the history queue for each media types for a user.
 * @param username - The username of the user whose queue is being retrieved
 * @returns The queue of the user
 */
export const retrieveHistorySummaryForUser = async (username: string) => {
  const response = await axiosWithCredentials.get(
    `${QUEUE_API}/history/${username}`
  );
  return response.data;
};

/**
 * Searches for media items based on the provided media type and query - connected to external APIs
 * @param mediaType The type of media to search for (e.g., "Movie", "TV", etc.)
 * @param query The search query string entered by the user
 * @returns The search results containing media items that match the query
 */
export const searchMedia = async (mediaType: string, query: string) => {
  const response = await axiosWithCredentials.get(
    `${QUEUE_API}/${mediaType}/search?query=${query}`
  );
  return response.data;
};

/**
 * Retrieves the details of a specific media item based on its type and ID - connected to external APIs
 * @param mediaType The type of media (e.g., "Movie", "TV", etc.)
 * @param mediaId The ID of the media item to retrieve
 * @returns The details of the specified media item
 */
export const retrieveMediaDetails = async (
  mediaType: string,
  mediaId: string
) => {
  const response = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/media/${mediaType}/${mediaId}`
  );
  return response.data;
};

/**
 * Retrieves the queue for a specific user and media type and optionally a group.
 * @param username The username of the user whose queue is being retrieved
 * @param mediaType The type of media (e.g., "Movie", "TV", etc.)
 * @param group The group name (optional)
 * @returns The queue of the user
 */
export const retrieveQueueByUserAndMediaType = async (
  username: string,
  mediaType: string,
  group?: string,
) => {

  if (group === undefined) {
    group = "";
  }

  const response = await axiosWithCredentials.get(
    `${QUEUE_API}/${mediaType}/users/${username}?group=${group}`
  );
  return response.data;
};

/**
 * Adds a media item to the current queue for a specific user and media type.
 * @param mediaType The type of media (e.g., "Movie", "TV", etc.)
 * @param queueId The ID of the queue to which the media is being added
 * @param media The media item to be added to the queue
 * @returns The updated queue after adding the media item
 */
export const addMediaToQueue = async (
  mediaType: string,
  queueId: string,
  media: any
) => {
  const response = await axiosWithCredentials.put(
    `${QUEUE_API}/${mediaType}/${queueId}/addToCurrent`,
    { media: media }
  );
  return response.data;
};

/**
 * Moves media items from the current queue to the history queue for a specific user and media type.
 * @param mediaType The type of media (e.g., "Movie", "TV", etc.)
 * @param queueId The ID of the queue from which the media is being moved
 * @param mediaIds The IDs of the media items to be moved to history
 * @returns The updated queue after moving the media items
 */
export const moveMediaFromCurrentToHistory = async (
  mediaType: string,
  queueId: string,
  mediaIds: any
) => {
  const response = await axiosWithCredentials.put(
    `${QUEUE_API}/${mediaType}/${queueId}/addToHistory`,
    { mediaIDs: [...mediaIds] }
  );
  return response.data;
};

/**
 * Deletes a media item from the current queue for a specific user and media type.
 * @param mediaType The type of media (e.g., "Movie", "TV", etc.)
 * @param queueId The ID of the queue from which the media is being deleted
 * @param mediaId The ID of the media item to be deleted
 * @returns The updated queue after deleting the media item
 */
export const deleteMediaFromCurrentQueue = async (
  mediaType: string,
  queueId: string,
  mediaId: string
) => {
  const response = await axiosWithCredentials.delete(
    `${QUEUE_API}/${mediaType}/${queueId}/current/${mediaId}`
  );
  return response.data;
};

/**
 * Deletes a media item from the history queue for a specific user and media type.
 * @param mediaType The type of media (e.g., "Movie", "TV", etc.)
 * @param queueId The ID of the queue from which the media is being deleted
 * @param mediaId The ID of the media item to be deleted
 * @returns The updated queue after deleting the media item
 */
export const deleteMediaFromHistoryQueue = async (
  mediaType: string,
  queueId: string,
  mediaId: string
) => {
  const response = await axiosWithCredentials.delete(
    `${QUEUE_API}/${mediaType}/${queueId}/history/${mediaId}`
  );
  return response.data;
};
