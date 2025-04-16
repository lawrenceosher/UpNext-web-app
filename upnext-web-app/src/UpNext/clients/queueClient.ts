/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const QUEUE_API = `${REMOTE_SERVER}/api/queue`;

export const retrieveTop3InCurrentQueueForUser = async (username: string) => {
  const response = await axiosWithCredentials.get(
    `${QUEUE_API}/current/${username}/top3`
  );
  return response.data;
};

export const retrieveHistorySummaryForUser = async (username: string) => {
  const response = await axiosWithCredentials.get(
    `${QUEUE_API}/history/${username}`
  );
  return response.data;
};

export const searchMedia = async (mediaType: string, query: string) => {
  const response = await axiosWithCredentials.get(
    `${QUEUE_API}/${mediaType}/search?query=${query}`
  );
  return response.data;
};

export const retrieveMediaDetails = async (mediaType: string, mediaId: string) => {
  const response = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/media/${mediaType}/${mediaId}`
  );
  return response.data;
};

export const retrieveQueueByUserAndMediaType = async (
  username: string,
  mediaType: string
) => {
  const response = await axiosWithCredentials.get(
    `${QUEUE_API}/${mediaType}/users/${username}`
  );
  return response.data;
};

export const addMediaToQueue = async (mediaType: string, queueId: string, media: any) => {
  const response = await axiosWithCredentials.put(`${QUEUE_API}/${mediaType}/${queueId}/addToCurrent`, {media: media});
  return response.data;
}

export const movieMediaFromCurrentToHistory = async (mediaType: string, queueId: string, mediaIds: any) => {
  console.log(mediaIds);
  const response = await axiosWithCredentials.put(`${QUEUE_API}/${mediaType}/${queueId}/addToHistory`, {mediaIDs: [...mediaIds]});
  return response.data;
}

export const deleteMediaFromCurrentQueue = async (mediaType: string, queueId: string, mediaId: string) => {
  const response = await axiosWithCredentials.delete(`${QUEUE_API}/${mediaType}/${queueId}/current/${mediaId}`);
  return response.data;
};

export const deleteMediaFromHistoryQueue = async (mediaType: string, queueId: string, mediaId: string) => {
  const response = await axiosWithCredentials.delete(`${QUEUE_API}/${mediaType}/${queueId}/history/${mediaId}`);
  return response.data;
}

export const findOtherUsersWithSameMedia = async (mediaType: string, mediaId: string) => { 
  const response = await axiosWithCredentials.get(
    `${QUEUE_API}/${mediaType}/${mediaId}/users`
  );
  return response.data;
}
