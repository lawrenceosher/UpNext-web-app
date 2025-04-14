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
import { useNavigate } from "react-router-dom";

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
    fetchCurrentQueues();
  }, [currentUser]);

  return (
    <Container fluid>
      {/* Show what's trending for both anonymous user and logged in users */}

      <h1>Trending</h1>

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
