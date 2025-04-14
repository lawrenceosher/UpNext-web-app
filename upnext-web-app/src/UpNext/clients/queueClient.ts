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
