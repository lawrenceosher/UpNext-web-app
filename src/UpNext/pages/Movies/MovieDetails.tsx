/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { BiMovie } from "react-icons/bi";
import { TbChairDirector } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { MdAccessTime, MdAdd, MdOutlineDescription } from "react-icons/md";
import { FaMasksTheater } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { Alert, Button, Form } from "react-bootstrap";
import { Movie } from "../../types/movie";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useDetails from "../../hooks/useDetails";
import { convertRuntime, formatDateString } from "../../utils";

/**
 * Displays the details of a specific movie.
 * It fetches the movie data using the movieId from the URL parameters,
 * and allows the user to add the movie to their current queue.
 */
export default function MovieDetails() {
  const { movieId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const {
    media: movie,
    addMediaToCurrentQueue: addMovieToCurrentQueue,
    showAlert,
    setShowAlert,
    isMediaInQueue,
  } = useDetails(currentUser, movieId, "Movie") as {
    media: Movie;
    mediaQueue: any;
    addMediaToCurrentQueue: () => void;
    showAlert: boolean;
    setShowAlert: (value: boolean) => void;
    isMediaInQueue: (mediaId: string) => boolean;
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Add Movie</Alert.Heading>
          <p>
            Successfully added {movie.title} to your current personal queue!
          </p>
        </Alert>
      )}

      <div className="d-flex">
        <Image
          src={movie.posterPath}
          width={400}
          className="border border-4 border-white mb-4"
        />
        <div className="ps-4 flex-grow-1">
          <h1 className="fw-bold d-flex align-items-center display-4">
            <BiMovie className="me-2" /> {movie.title}
          </h1>
          <h4 className="mt-3 d-flex align-items-center">
            <TbChairDirector className="me-2 fs-3" /> Directed by{" "}
            {movie.director}
          </h4>
          <h4 className="mt-3 d-flex align-items-center">
            <CiCalendar className="me-2 fs-3" />{" "}
            {formatDateString(movie.releaseDate)}
          </h4>
          <h4 className="mt-3 d-flex align-items-center">
            <MdAccessTime className="me-2 fs-3" />{" "}
            {convertRuntime(movie.runtime)}
          </h4>
          <h4 className="mt-3 d-flex align-items-center">
            <FaMasksTheater className="me-2 fs-3" />{" "}
            {movie && movie.genres.join(", ")}
          </h4>
          <h5 className="mt-3 d-flex align-items-center">
            <IoIosPeople className="me-2 fs-2" />{" "}
            {movie && movie.cast.join(", ")}
          </h5>
          <h5 className="mt-5 fw-bold d-flex align-items-center">
            <MdOutlineDescription className="me-2 fs-3" /> Description
          </h5>
          <p className="mt-3 text-start pe-3">{movie.description}</p>

          <div>
            <Form className="d-flex align-items-center flex-fill justify-content-end me-4">
              <Button
                size="lg"
                id="action-button"
                className="my-3 float-end purple-brand-bg border-0 w-25"
                disabled={!currentUser || isMediaInQueue(movieId ?? "")}
                onClick={() => {
                  addMovieToCurrentQueue();
                  setShowAlert(true);
                }}
              >
                <MdAdd className="me-1 mb-1 fs-4" /> Add
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
