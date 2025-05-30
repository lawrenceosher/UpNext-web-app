/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { TbChairDirector } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { MdAdd, MdOutlineDescription } from "react-icons/md";
import { LuListVideo, LuTvMinimalPlay } from "react-icons/lu";
import { FaMasksTheater } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { Alert, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TVShow } from "../../types/tvShow";
import { FiTv } from "react-icons/fi";
import useDetails from "../../hooks/useDetails";
import { formatDateString } from "../../utils";

/**
 * Displays the details of a specific TV show.
 * It fetches the TV show data using the tvId from the URL parameters,
 * and allows the user to add the TV show to their current queue.
 */
export default function TVDetails() {
  const { tvId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const {
    media: tvShow,
    addMediaToCurrentQueue: addTVShowToCurrentQueue,
    showAlert,
    setShowAlert,
    isMediaInQueue,
  } = useDetails(currentUser, tvId, "TV") as {
    media: TVShow;
    mediaQueue: any;
    addMediaToCurrentQueue: () => void;
    showAlert: boolean;
    setShowAlert: (value: boolean) => void;
    isMediaInQueue: (mediaId: string) => boolean;
  };

  if (!tvShow) return <div>Loading...</div>;

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          className="me-3"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Add TV Show</Alert.Heading>
          <p>
            Successfully added {tvShow.title} to your current personal queue!
          </p>
        </Alert>
      )}
      <div className="d-flex flex-column flex-sm-row">
        <Image
          src={tvShow.posterPath}
          height={500}
          className="border border-4 border-white mb-4 object-fit-cover"
        />
        <div className="ps-4 flex-grow-1">
          <h1 className="fw-bold d-flex align-items-center display-4">
            <FiTv className="me-2" /> {tvShow.title}
          </h1>

          <h4 className="mt-3 d-flex align-items-center">
            <TbChairDirector className="me-2 fs-3" /> Created by{" "}
            {tvShow.creator}
          </h4>

          <h4 className="mt-3 d-flex align-items-center">
            <CiCalendar className="me-2 fs-3" />
            {formatDateString(tvShow.firstAirDate)}{" "}
            {tvShow.lastAirDate &&
              tvShow.lastAirDate.length > 0 &&
              `-
            ${formatDateString(tvShow.lastAirDate)}`}
          </h4>

          <h4 className="mt-3 d-flex align-items-center">
            <LuTvMinimalPlay className="me-2 fs-3" /> {tvShow.totalEpisodes}{" "}
            Episodes
          </h4>

          <h4 className="mt-3 d-flex align-items-center">
            <LuListVideo className="me-2 fs-3" /> {tvShow.totalSeasons} Seasons
          </h4>

          <h4 className="mt-3 d-flex align-items-center">
            <FaMasksTheater className="me-2 fs-3" />{" "}
            {tvShow && tvShow.genres.join(", ")}
          </h4>

          <h5 className="mt-3 d-sm-none">
            <IoIosPeople className="me-2 fs-2" />
            Cast:
          </h5>
          <h5 className="mt-0 mt-sm-3 d-flex align-items-center">
            <IoIosPeople className="me-2 fs-2 d-none d-sm-block" />{" "}
            {tvShow && tvShow.cast.join(", ")}
          </h5>

          <h5 className="mt-5 fw-bold d-flex align-items-center">
            <MdOutlineDescription className="me-2 fs-3" /> Description
          </h5>
          <p className="mt-3 text-start pe-3">{tvShow.description}</p>

          <div>
            <Form className="d-flex align-items-center flex-fill justify-content-end me-4">
              <Button
                size="lg"
                id="action-button"
                className="my-3 float-end purple-brand-bg border-0 py-3 px-4"
                disabled={!currentUser || isMediaInQueue(tvId ?? "")}
                onClick={() => {
                  addTVShowToCurrentQueue();
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
