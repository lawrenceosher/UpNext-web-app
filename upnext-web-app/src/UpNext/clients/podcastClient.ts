import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const PODCAST_API = `${REMOTE_SERVER}/api/podcasts`;

export const retrievePopularPodcasts = async () => {
  const response = await axiosWithCredentials.get(`${PODCAST_API}/popular`);
  return response.data;
};
