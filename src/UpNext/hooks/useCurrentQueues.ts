import { useEffect, useState } from "react";
import * as queueClient from "../clients/queueClient";
import { User } from "../types/user";

/**
 * Retrieves the current queues for the logged-in user.
 * The queues include movies, TV shows, albums, books, podcasts, and games.
 * @param currentUser - The current user object, which contains the currently logged-in user's information.
 * @returns An object containing the current queues for the user, including movies, TV shows, albums, books, podcasts, and games.
 */
const useCurrentQueues = (currentUser: User) => {
  const [currentQueues, setCurrentQueues] = useState({
    movies: [],
    tv: [],
    albums: [],
    books: [],
    podcasts: [],
    games: [],
  });

  useEffect(() => {
    const fetchCurrentQueues = async () => {
      if (currentUser) {
        const username = currentUser.username;
        try {
          const response = await queueClient.retrieveTop3InCurrentQueueForUser(
            username
          );
          setCurrentQueues({
            movies: response.movie.current,
            tv: response.tv.current,
            albums: response.album.current,
            books: response.book.current,
            podcasts: response.podcast.current,
            games: response.game.current,
          });
        } catch (error) {
          console.error("Error fetching current queues:", error);
        }
      }
    };

    fetchCurrentQueues();
  }, [currentUser]);

  return { currentQueues };
};

export default useCurrentQueues;
