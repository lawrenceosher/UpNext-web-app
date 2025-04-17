/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import QueueGroupToggle from "../Profile/QueueGroupToggle";
import "./Home.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as queueClient from "../../clients/queueClient";
import * as movieClient from "../../clients/movieClient";
import * as tvClient from "../../clients/tvClient";
import * as albumClient from "../../clients/albumClient";
import * as bookClient from "../../clients/bookClient";
import * as podcastClient from "../../clients/podcastClient";
import * as gameClient from "../../clients/gameClient";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../types/movie";
import Image from "react-bootstrap/Image";
import { TVShow } from "../../types/tvShow";
import { Album } from "../../types/album";
import { Book } from "../../types/book";
import { Podcast } from "../../types/podcast";
import { VideoGame } from "../../types/game";

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [currentQueues, setCurrentQueues] = useState({
    movies: [],
    tv: [],
    albums: [],
    books: [],
    podcasts: [],
    games: [],
  });
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTV, setPopularTV] = useState<TVShow[]>([]);
  const [popularAlbums, setPopularAlbums] = useState<Album[]>([]);
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [popularPodcasts, setPopularPodcasts] = useState<Podcast[]>([]);
  const [popularGames, setPopularGames] = useState<VideoGame[]>([]);
  const navigate = useNavigate();

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

    fetchCurrentQueues();
    fetchPopularMovies();
    fetchPopularTVShows();
    fetchPopularAlbums();
    fetchPopularBooks();
    fetchPopularPodcasts();
    fetchPopularGames();
  }, [currentUser]);

  return (
    <Container fluid>
      {/* Show what's trending for both anonymous user and logged in users */}

      <h1>Trending</h1>
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
            {popularMovies.slice(0, 2).map((movie: Movie) => (
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

            {popularTV.slice(0, 2).map((tv: TVShow) => (
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

            {popularAlbums.slice(0, 2).map((album: Album) => (
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

            {popularBooks.slice(0, 2).map((book: Book) => (
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

            {popularPodcasts.slice(0, 2).map((podcast: Podcast) => (
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

            {popularGames.slice(0, 2).map((game: VideoGame) => (
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

      {/* Only show Current Personal Queues if logged in and not anonymous user*/}
      {currentUser && (
        <>
          <Row className="mt-5">
            <h1>Current Personal Queues</h1>
          </Row>
          <Row className="mt-3">
            <Col>
              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="0">Movies</QueueGroupToggle>
                  <Accordion.Collapse eventKey="0">
                    <ListGroup>
                      {currentQueues.movies.map((movie: any, index: number) => (
                        <ListGroupItem
                          key={movie._id}
                          className="rounded-0 bg-transparent text-white"
                          onClick={() =>
                            navigate(`/UpNext/Movies/${movie._id}`)
                          }
                        >
                          {index + 1}. {movie.title} (
                          {movie.releaseDate.slice(0, 4)})
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>
            </Col>
            <Col>
              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="1">TV</QueueGroupToggle>
                  <Accordion.Collapse eventKey="1">
                    <ListGroup>
                      {currentQueues.tv.map((tv: any, index: number) => (
                        <ListGroupItem
                          key={tv._id}
                          className="rounded-0 bg-transparent text-white"
                          onClick={() => navigate(`/UpNext/TV/${tv._id}`)}
                        >
                          {index + 1}. {tv.title} ({tv.firstAirDate.slice(0, 4)}
                          )
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>
            </Col>
            <Col>
              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="2">Albums</QueueGroupToggle>
                  <Accordion.Collapse eventKey="2">
                    <ListGroup>
                      {currentQueues.albums.map((album: any, index: number) => (
                        <ListGroupItem
                          key={album._id}
                          className="rounded-0 bg-transparent text-white"
                          onClick={() =>
                            navigate(`/UpNext/Albums/${album._id}`)
                          }
                        >
                          {index + 1}. {album.title} (
                          {album.releaseDate.slice(0, 4)})
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>
            </Col>
          </Row>
          <Row>
            <Col>
              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="3">Books</QueueGroupToggle>
                  <Accordion.Collapse eventKey="3">
                    <ListGroup>
                      {currentQueues.books.map((book: any, index: number) => (
                        <ListGroupItem
                          key={book._id}
                          className="rounded-0 bg-transparent text-white"
                          onClick={() => navigate(`/UpNext/Books/${book._id}`)}
                        >
                          {index + 1}. {book.title}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>
            </Col>
            <Col>
              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="4">Podcasts</QueueGroupToggle>
                  <Accordion.Collapse eventKey="4">
                    <ListGroup>
                      {currentQueues.podcasts.map(
                        (podcast: any, index: number) => (
                          <ListGroupItem
                            key={podcast._id}
                            className="rounded-0 bg-transparent text-white"
                            onClick={() =>
                              navigate(`/UpNext/Podcasts/${podcast._id}`)
                            }
                          >
                            {index + 1}. {podcast.title} (
                            {podcast.latestEpisodeDate.slice(0, 4)})
                          </ListGroupItem>
                        )
                      )}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>
            </Col>
            <Col>
              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="5">Games</QueueGroupToggle>
                  <Accordion.Collapse eventKey="5">
                    <ListGroup>
                      {currentQueues.games.map((game: any, index: number) => (
                        <ListGroupItem
                          key={game._id}
                          className="rounded-0 bg-transparent text-white"
                          onClick={() => navigate(`/UpNext/Games/${game._id}`)}
                        >
                          {index + 1}. {game.title} (
                          {game.releaseDate.slice(0, 4)})
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
