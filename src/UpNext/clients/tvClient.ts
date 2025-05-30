import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const TV_API = `${REMOTE_SERVER}/api/tv`;

/**
 * Fetches a list of popular TV shows from the server.
 * @returns A promise that resolves to an array of TV shows.
 */
export const retrievePopularTVShows = async () => {
  const response = await axiosWithCredentials.get(`${TV_API}/popular`);
  return response.data;
};
