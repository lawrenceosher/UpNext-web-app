import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const MOVIE_API = `${REMOTE_SERVER}/api/movies`;

/**
 * Fetches a list of popular movies from the server.
 * @returns A promise that resolves to an array of movies.
 */
export const retrievePopularMovies = async () => {
  const response = await axiosWithCredentials.get(`${MOVIE_API}/popular`);
  return response.data;
};
