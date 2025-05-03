/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { CiCalendar } from "react-icons/ci";
import { MdAdd, MdOutlineDescription } from "react-icons/md";
import { Alert, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Podcast } from "../../types/podcast";
import { SlMicrophone } from "react-icons/sl";
import { BiLabel } from "react-icons/bi";
import { FaRegListAlt } from "react-icons/fa";
import useDetails from "../../hooks/useDetails";
import { formatDateString } from "../../utils";

export default function PodcastDetails() {
  const { podcastId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const {
    media: podcast,
    addMediaToCurrentQueue: addPodcastToCurrentQueue,
    showAlert,
    setShowAlert,
    isMediaInQueue,
  } = useDetails(currentUser, podcastId, "Podcast") as {
    media: Podcast;
    mediaQueue: any;
    addMediaToCurrentQueue: () => void;
    showAlert: boolean;
    setShowAlert: (value: boolean) => void;
    isMediaInQueue: (mediaId: string) => boolean;
  };

  if (!podcast) return <div>Loading...</div>;

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Add Podcast</Alert.Heading>
          <p>
            Successfully added {podcast.title} to your current personal queue!
          </p>
        </Alert>
      )}
      <div className="d-flex">
        <Image
          src={podcast.coverArt}
          height={550}
          className="border border-4 border-white mb-4"
        />
        <div className="ps-4 flex-grow-1">
          <h1 className="fw-bold d-flex align-items-center display-5">
            <SlMicrophone className="me-2" /> {podcast.title}
          </h1>
          <h4 className="mt-3 d-flex align-items-center">
            <BiLabel className="me-2 fs-3" /> Published by {podcast.publisher}
          </h4>
          <h4 className="mt-3 d-flex align-items-center">
            <CiCalendar className="me-2 fs-3" />{" "}
            {formatDateString(podcast.latestEpisodeDate)}
          </h4>
          <h5 className="mt-3 fw-bold d-flex align-items-center">
            <MdOutlineDescription className="me-2 fs-3" /> Description
          </h5>
          <p className="mt-3 text-start pe-3">{podcast.description}</p>
          <h5 className="mt-3 fw-bold d-flex align-items-center">
            <FaRegListAlt className="me-2 fs-3" /> Most Recent Episodes
          </h5>
          <ol className="mt-3 text-start pe-3">
            {podcast.episodes.map((episode, index) => (
              <li key={index} className="text-white mb-3">
                {episode}
              </li>
            ))}
          </ol>

          <div>
            <Form className="d-flex align-items-center flex-fill justify-content-end me-4">
              <Button
                size="lg"
                id="action-button"
                className="my-3 float-end purple-brand-bg border-0 w-25"
                disabled={!currentUser || isMediaInQueue(podcastId ?? "")}
                onClick={() => {
                  addPodcastToCurrentQueue();
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
