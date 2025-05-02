import { Row, Col, Accordion, ListGroup, ListGroupItem } from "react-bootstrap";
import QueueGroupToggle from "../pages/Profile/QueueGroupToggle";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types/movie";
import { TVShow } from "../types/tvShow";
import { Album } from "../types/album";
import { Book } from "../types/book";
import { Podcast } from "../types/podcast";
import { VideoGame } from "../types/game";

/**
 * Displays the current personal queues for the user for each of the media types
 * so users can get a quick overview of what they have in their queue
 * and click on each media item to go to the respective details page
 * @param currentQueues - The current queues for the user, including movies, TV shows, albums, books, podcasts, and games.
 * @returns A component that displays the current personal queues for the user.
 * Each media type is displayed in a separate accordion group, and users can click on each item to navigate to its details page.
 */
export default function CurrentPersonalQueues({
  currentQueues,
}: {
  currentQueues: {
    movies: Movie[];
    tv: TVShow[];
    albums: Album[];
    books: Book[];
    podcasts: Podcast[];
    games: VideoGame[];
  };
}) {
  const navigate = useNavigate();

  return (
    <>
      <Row className="mt-3">
        <Col>
          <Accordion>
            <ListGroup className="mb-4 border">
              <QueueGroupToggle eventKey="0">Movies</QueueGroupToggle>
              <Accordion.Collapse eventKey="0">
                <ListGroup>
                  {currentQueues.movies.map((movie: Movie, index: number) => (
                    <ListGroupItem
                      key={movie._id}
                      className="rounded-0 bg-transparent text-white"
                      onClick={() => navigate(`/UpNext/Movies/${movie._id}`)}
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
                  {currentQueues.tv.map((tv: TVShow, index: number) => (
                    <ListGroupItem
                      key={tv._id}
                      className="rounded-0 bg-transparent text-white"
                      onClick={() => navigate(`/UpNext/TV/${tv._id}`)}
                    >
                      {index + 1}. {tv.title} ({tv.firstAirDate.slice(0, 4)})
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
                  {currentQueues.albums.map((album: Album, index: number) => (
                    <ListGroupItem
                      key={album._id}
                      className="rounded-0 bg-transparent text-white"
                      onClick={() => navigate(`/UpNext/Albums/${album._id}`)}
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
                  {currentQueues.books.map((book: Book, index: number) => (
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
                    (podcast: Podcast, index: number) => (
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
                  {currentQueues.games.map((game: VideoGame, index: number) => (
                    <ListGroupItem
                      key={game._id}
                      className="rounded-0 bg-transparent text-white"
                      onClick={() => navigate(`/UpNext/Games/${game._id}`)}
                    >
                      {index + 1}. {game.title} ({game.releaseDate.slice(0, 4)})
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Accordion.Collapse>
            </ListGroup>
          </Accordion>
        </Col>
      </Row>
    </>
  );
}
