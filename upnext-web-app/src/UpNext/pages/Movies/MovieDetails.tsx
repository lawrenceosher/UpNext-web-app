/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { BiMovie } from "react-icons/bi";
import { TbChairDirector } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { MdAccessTime, MdAdd, MdOutlineDescription } from "react-icons/md";
import { FaMasksTheater } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as queueClient from "../../clients/queueClient";
import { Movie } from "../../types/movie";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MovieDetails() {
  const { movieId } = useParams();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieQueue, setMovieQueue] = useState<any>(null);

  const readableDate = (dateString: string) => {
    return `${dateString.slice(5, 7)}/${dateString.slice(
      8,
      10
    )}/${dateString.slice(0, 4)}`;
  };

  const convertRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

    const addMovieToCurrentQueue = async () => {
      if (!currentUser || !movieQueue) return;
  
      try {
        const updatedQueue = await queueClient.addMediaToQueue(
          "Movie",
          movieQueue._id,
          movie
        );
        setMovieQueue(updatedQueue);
      } catch (error) {
        console.error("Error adding movie to queue:", error);
      }
    };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (!movieId) return;
        const movieResult = await queueClient.retrieveMediaDetails(
          "Movie",
          movieId
        );
        setMovie(movieResult);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }

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

    fetchMovieDetails();
  }, [currentUser, movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="d-flex">
      <Image
        src={movie.posterPath}
        width={400}
        className="border border-4 border-white mb-4"
      />
      <div className="ps-4">
        <h1 className="fw-bold d-flex align-items-center display-4">
          <BiMovie className="me-2" /> {movie.title}
        </h1>
        <h4 className="mt-3 d-flex align-items-center">
          <TbChairDirector className="me-2 fs-3" /> Directed by {movie.director}
        </h4>
        <h4 className="mt-3 d-flex align-items-center">
          <CiCalendar className="me-2 fs-3" /> {readableDate(movie.releaseDate)}
        </h4>
        <h4 className="mt-3 d-flex align-items-center">
          <MdAccessTime className="me-2 fs-3" /> {convertRuntime(movie.runtime)}
        </h4>
        <h4 className="mt-3 d-flex align-items-center">
          <FaMasksTheater className="me-2 fs-3" />{" "}
          {movie && movie.genres.join(", ")}
        </h4>
        <h5 className="mt-3 d-flex align-items-center">
          <IoIosPeople className="me-2 fs-2" /> {movie && movie.cast.join(", ")}
        </h5>
        <h5 className="mt-5 fw-bold d-flex align-items center">
          <MdOutlineDescription className="me-2 fs-3" /> Description
        </h5>
        <p className="mt-3 text-start pe-3">{movie.description}</p>

        <div>
          <Form className="d-flex align-items-center flex-fill justify-content-end me-4">
            <Button
              size="lg"
              id="action-button"
              className="my-3 float-end purple-brand-bg border-0 w-25"
              disabled={
                !currentUser ||
                movieQueue && movieQueue.current
                  .map((item: any) => item._id)
                  .includes(movieId) ||
                movieQueue && movieQueue.history
                  .map((item: any) => item._id)
                  .includes(movieId)
              }
              onClick={() => {
                addMovieToCurrentQueue();
              }}
            >
              <MdAdd className="me-1 mb-1 fs-4" /> Add
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
