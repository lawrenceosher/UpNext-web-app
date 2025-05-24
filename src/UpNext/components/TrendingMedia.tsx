import { Col, ListGroupItem, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Album } from "../types/album";
import { Book } from "../types/book";
import { VideoGame } from "../types/game";
import { Movie } from "../types/movie";
import { Podcast } from "../types/podcast";
import { TVShow } from "../types/tvShow";
import { useNavigate } from "react-router-dom";

/**
 * Displays the top 2 trending media for each of the media types based on what's been added
 * most recently and most overall. Enables users to get an idea of what to add to their queues.
 * @param popularMovies - Array of popular movies.
 * @param popularTV - Array of popular TV shows.
 * @param popularAlbums - Array of popular albums.
 * @param popularBooks - Array of popular books.
 * @param popularPodcasts - Array of popular podcasts.
 * @param popularGames - Array of popular video games.
 * @returns A component that displays the top 2 trending media for each media type.
 * Each media type is displayed in a separate column, and users can click on each item to navigate to its details page.
 */
export default function TrendingMedia({
  popularMovies,
  popularTV,
  popularAlbums,
  popularBooks,
  popularPodcasts,
  popularGames,
  currentTrendingCategory,
}: {
  popularMovies: Movie[];
  popularTV: TVShow[];
  popularAlbums: Album[];
  popularBooks: Book[];
  popularPodcasts: Podcast[];
  popularGames: VideoGame[];
  currentTrendingCategory: string;
}) {
  const navigate = useNavigate();

  return (
    <>
      {popularMovies &&
        popularMovies.length > 0 &&
        popularTV &&
        popularTV.length > 0 &&
        popularAlbums &&
        popularAlbums.length > 0 &&
        popularBooks &&
        popularBooks.length > 0 &&
        popularPodcasts &&
        popularPodcasts.length > 0 &&
        popularGames &&
        popularGames.length > 0 && (
          <Row className="mt-3">
            {currentTrendingCategory === 'Movies' && popularMovies.slice(0, 4).map((movie: Movie) => (
              <Col key={movie._id} className="mb-4">
                <ListGroupItem className="rounded-0 bg-transparent text-white">
                  <Image
                    onClick={() => navigate(`/UpNext/Movies/${movie._id}`)}
                    src={movie.posterPath}
                    className="movie-poster border border-4 border-white"
                  />
                </ListGroupItem>
              </Col>
            ))}

            {currentTrendingCategory === 'TV Shows' && popularTV.slice(0, 4).map((tv: TVShow) => (
              <Col key={tv._id} className="mb-4">
                <ListGroupItem className="rounded-0 bg-transparent text-white">
                  <Image
                    onClick={() => navigate(`/UpNext/TV/${tv._id}`)}
                    src={tv.posterPath}
                    className="movie-poster border border-4 border-white"
                  />
                </ListGroupItem>
              </Col>
            ))}

            {currentTrendingCategory === 'Albums' && popularAlbums.slice(0, 4).map((album: Album) => (
              <Col key={album._id} className="mb-4">
                <ListGroupItem className="rounded-0 bg-transparent text-white">
                  <Image
                    onClick={() => navigate(`/UpNext/Albums/${album._id}`)}
                    src={album.coverArt}
                    className="movie-poster border border-4 border-white"
                  />
                </ListGroupItem>
              </Col>
            ))}

            {currentTrendingCategory === 'Books' && popularBooks.slice(0, 4).map((book: Book) => (
              <Col key={book._id} className="mb-4">
                <ListGroupItem className="rounded-0 bg-transparent text-white">
                  <Image
                    onClick={() => navigate(`/UpNext/Books/${book._id}`)}
                    src={book.coverArt}
                    className="movie-poster border border-4 border-white"
                  />
                </ListGroupItem>
              </Col>
            ))}

            {currentTrendingCategory === 'Podcasts' && popularPodcasts.slice(0, 4).map((podcast: Podcast) => (
              <Col key={podcast._id} className="mb-4">
                <ListGroupItem className="rounded-0 bg-transparent text-white">
                  <Image
                    onClick={() => navigate(`/UpNext/Podcasts/${podcast._id}`)}
                    src={podcast.coverArt}
                    className="movie-poster border border-4 border-white"
                  />
                </ListGroupItem>
              </Col>
            ))}

            {currentTrendingCategory === 'Games' && popularGames.slice(0, 4).map((game: VideoGame) => (
              <Col key={game._id} className="mb-4">
                <ListGroupItem className="rounded-0 bg-transparent text-white">
                  <Image
                    onClick={() => navigate(`/UpNext/Games/${game._id}`)}
                    src={game.coverArt}
                    className="movie-poster border border-4 border-white"
                  />
                </ListGroupItem>
              </Col>
            ))}
          </Row>
        )}
    </>
  );
}
