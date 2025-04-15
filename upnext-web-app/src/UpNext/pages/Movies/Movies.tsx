/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Container, Row } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdHistory, MdOutlineDone, MdAdd } from "react-icons/md";

import MediaSearch from "../../components/MediaSearch";
import MovieSummaryCard from "../../components/MovieSummaryCard";

import "../../../utils.css";
import "./Movies.css";
import QueueList from "../../components/QueueList";
import { useEffect, useState } from "react";
import { Movie } from "../../types/movie";
import { useSelector } from "react-redux";
import * as queueClient from "../../clients/queueClient";
import { Queue } from "../../types/queue";

export default function Movies() {
  const [queueHistorySelected, setQueueHistorySelected] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [movieQueue, setMovieQueue] = useState<Queue | null>();
  const [watchedMovieIDs, setWatchedMovieIDs] = useState<any>([]);

  const addMovieToCurrentQueue = async () => {
    if (selectedMovie === null || !currentUser || !movieQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        "Movie",
        movieQueue._id,
        selectedMovie
      );
      setMovieQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding movie to queue:", error);
    }
  };

  const moveMoviesFromCurrentToHistory = async () => {
    if (!currentUser || watchedMovieIDs.length === 0 || !movieQueue) return;

    console.log(watchedMovieIDs);

    try {
      const updatedQueue = await queueClient.movieMediaFromCurrentToHistory(
        "Movie",
        movieQueue._id,
        watchedMovieIDs
      );
      setMovieQueue(updatedQueue);
    } catch (error) {
      console.error("Error moving movies to history:", error);
    }
  };

  useEffect(() => {
    const fetchQueueItems = async () => {
      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          "Movie"
        );
        setMovieQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };
    fetchQueueItems();
  }, [currentUser]);

  if (!movieQueue) return <p>Loading...</p>;

  return (
    <Container>
      <Row>
        <Col>
          {currentUser && <h1 className="mt-2">Personal Queue</h1>}
          <QueueList
            mediaType="Movie"
            currentQueue={movieQueue.current}
            historyQueue={movieQueue.history}
            showHistory={queueHistorySelected}
            setCompletedMediaIDs={setWatchedMovieIDs}
            setSelectedMedia={setSelectedMovie}
          />
          {currentUser && (
            <div className="d-flex justify-content-around">
              <Button
                id="action-button"
                size="lg"
                className={`mt-3 ${
                  !queueHistorySelected
                    ? "bg-light text-dark"
                    : "purple-brand-bg"
                } border-0 w-25 align-items-center`}
                onClick={() => setQueueHistorySelected(false)}
              >
                <IoTrendingUpSharp className="me-1 mb-1 fs-4" /> Current
              </Button>
              <Button
                id="action-button"
                size="lg"
                className={`mt-3 ${
                  queueHistorySelected
                    ? "bg-light text-dark"
                    : "purple-brand-bg"
                }  border-0 w-25`}
                onClick={() => setQueueHistorySelected(true)}
              >
                <MdHistory className="me-1 mb-1 fs-4" /> History
              </Button>
              <Button
                id="action-button"
                size="lg"
                className="mt-3 purple-brand-bg border-0 w-25"
                disabled={
                  (movieQueue && movieQueue.current.length === 0) ||
                  watchedMovieIDs.length === 0
                }
                onClick={() => {
                  moveMoviesFromCurrentToHistory();
                  setWatchedMovieIDs([]);
                }}
              >
                <MdOutlineDone className="me-1 mb-1 fs-4" /> Submit
              </Button>
            </div>
          )}
        </Col>
        <Col>
          <MediaSearch mediaType="Movie" setSelectedMovie={setSelectedMovie} />
          {selectedMovie && (
            <>
              <MovieSummaryCard movie={selectedMovie} />
            </>
          )}
          <Button
            size="lg"
            id="action-button"
            className="my-3 float-end purple-brand-bg border-0 w-25"
            disabled={
              !selectedMovie ||
              !currentUser ||
              movieQueue.current
                .map((item: any) => item._id)
                .includes(selectedMovie._id) ||
              movieQueue.history
                .map((item: any) => item._id)
                .includes(selectedMovie._id)
            }
            onClick={() => {
              addMovieToCurrentQueue();
              setSelectedMovie(null);
            }}
          >
            <MdAdd className="me-1 mb-1 fs-4" /> Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
