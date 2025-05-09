import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const BOOK_API = `${REMOTE_SERVER}/api/books`;

/**
 * Fetches a list of popular books from the server.
 * @returns A promise that resolves to an array of books.
 */
export const retrievePopularBooks = async () => {
  const response = await axiosWithCredentials.get(`${BOOK_API}/popular`);
  return response.data;
};
