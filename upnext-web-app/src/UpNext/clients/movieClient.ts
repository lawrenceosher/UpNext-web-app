import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const MOVIE_API = `${REMOTE_SERVER}/api/movies`;

export const retrieveAllMovies = async () => {
  const response = await axiosWithCredentials.get(`${MOVIE_API}`);
  return response.data;
};
