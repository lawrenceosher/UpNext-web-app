import { useEffect, useState } from "react";
import { Album } from "../types/album";
import { Book } from "../types/book";
import { VideoGame } from "../types/game";
import { Movie } from "../types/movie";
import { Podcast } from "../types/podcast";
import { TVShow } from "../types/tvShow";
import * as movieClient from "../clients/movieClient";
import * as tvClient from "../clients/tvClient";
import * as albumClient from "../clients/albumClient";
import * as bookClient from "../clients/bookClient";
import * as podcastClient from "../clients/podcastClient";
import * as gameClient from "../clients/gameClient";

/**
 * Custom hook to fetch trending media data.
 * It retrieves popular movies, TV shows, albums, books, podcasts, and games.
 * The data is stored in the component's state and can be accessed by the component that uses this hook.
 * @returns {
 *  popularMovies: Movie[];
 *  popularTV: TVShow[];
 *  popularAlbums: Album[];
 *  popularBooks: Book[];
 *  popularPodcasts: Podcast[];
 *  popularGames: VideoGame[];
 *  currentTrendingCategory: string;
 *  handleSelectTrendingCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
 *  categories: string[];
 * }
 */
const useTrending = () => {
  // State to manage the trending media data
  // Each state variable corresponds to a different type of media
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTV, setPopularTV] = useState<TVShow[]>([]);
  const [popularAlbums, setPopularAlbums] = useState<Album[]>([]);
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [popularPodcasts, setPopularPodcasts] = useState<Podcast[]>([]);
  const [popularGames, setPopularGames] = useState<VideoGame[]>([]);

  // State to manage the currently selected trending category
  const [currentTrendingCategory, setCurrentTrendingCategory] =
    useState("Movies");

  // Function to handle the change in selected group from the dropdown
  const handleSelectTrendingCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentTrendingCategory(event.target.value);
  };

  const categories = [
    "Movies",
    "TV Shows",
    "Albums",
    "Books",
    "Podcasts",
    "Games",
  ];

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await movieClient.retrievePopularMovies();
        setPopularMovies(response);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    const fetchPopularTVShows = async () => {
      try {
        const response = await tvClient.retrievePopularTVShows();
        setPopularTV(response);
      } catch (error) {
        console.error("Error fetching popular TV shows:", error);
      }
    };

    const fetchPopularAlbums = async () => {
      try {
        const response = await albumClient.retrievePopularAlbums();
        setPopularAlbums(response);
      } catch (error) {
        console.error("Error fetching popular albums:", error);
      }
    };
    const fetchPopularBooks = async () => {
      try {
        const response = await bookClient.retrievePopularBooks();
        setPopularBooks(response);
      } catch (error) {
        console.error("Error fetching popular books:", error);
      }
    };
    const fetchPopularPodcasts = async () => {
      try {
        const response = await podcastClient.retrievePopularPodcasts();
        setPopularPodcasts(response);
      } catch (error) {
        console.error("Error fetching popular podcasts:", error);
      }
    };
    const fetchPopularGames = async () => {
      try {
        const response = await gameClient.retrievePopularGames();
        setPopularGames(response);
      } catch (error) {
        console.error("Error fetching popular games:", error);
      }
    };

    fetchPopularMovies();
    fetchPopularTVShows();
    fetchPopularAlbums();
    fetchPopularBooks();
    fetchPopularPodcasts();
    fetchPopularGames();
  }, []);

  return {
    popularMovies,
    popularTV,
    popularAlbums,
    popularBooks,
    popularPodcasts,
    popularGames,
    currentTrendingCategory,
    handleSelectTrendingCategory,
    categories,
  };
};

export default useTrending;
