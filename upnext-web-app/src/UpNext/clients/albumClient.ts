import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const ALBUM_API = `${REMOTE_SERVER}/api/albums`;

export const retrievePopularAlbums = async () => {
  const response = await axiosWithCredentials.get(`${ALBUM_API}/popular`);
  return response.data;
};
