import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const GAME_API = `${REMOTE_SERVER}/api/games`;

/**
 * Fetches a list of popular games from the server.
 * @returns A promise that resolves to an array of games.
 */
export const retrievePopularGames = async () => {
  const response = await axiosWithCredentials.get(`${GAME_API}/popular`);
  return response.data;
};
