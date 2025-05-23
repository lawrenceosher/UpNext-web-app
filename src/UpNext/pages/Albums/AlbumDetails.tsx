/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { CiCalendar } from "react-icons/ci";
import {
  MdAccessTime,
  MdAdd,
  MdOutlineDescription,
  MdOutlineHeadphones,
} from "react-icons/md";
import { Alert, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Album } from "../../types/album";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { BiLabel } from "react-icons/bi";
import useDetails from "../../hooks/useDetails";
import { formatDateString } from "../../utils";

/**
 * Displays the details of a specific album.
 * It fetches the album data using the albumId from the URL parameters,
 * and allows the user to add the album to their current queue.
 */
export default function AlbumDetails() {
  const { albumId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const {
    media: album,
    addMediaToCurrentQueue: addAlbumToCurrentQueue,
    showAlert,
    setShowAlert,
    isMediaInQueue,
  } = useDetails(currentUser, albumId, "Album") as {
    media: Album;
    mediaQueue: any;
    addMediaToCurrentQueue: () => void;
    showAlert: boolean;
    setShowAlert: (value: boolean) => void;
    isMediaInQueue: (mediaId: string) => boolean;
  };

  if (!album) return <div>Loading...</div>;

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          className="me-3"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Add Album</Alert.Heading>
          <p>
            Successfully added {album.title} to your current personal queue!
          </p>
        </Alert>
      )}
      <div className="d-flex flex-column flex-sm-row">
        <Image
          src={album.coverArt}
          height={500}
          className="border border-4 border-white mb-4 object-fit-cover"
        />
        <div className="ps-4 flex-grow-1">
          <h1 className="fw-bold d-flex align-items-center display-4">
            <IoMusicalNotesOutline className="me-2" /> {album.title}
          </h1>

          <h4 className="mt-3 d-flex align-items-center">
            <MdOutlineHeadphones className="me-2 fs-3" /> Created by{" "}
            {album.artist}
          </h4>

          <h4 className="mt-3 d-flex align-items-center">
            <CiCalendar className="me-2 fs-3" />{" "}
            {formatDateString(album.releaseDate)}
          </h4>

          <h4 className="mt-3 d-flex align-items-center">
            <MdAccessTime className="me-2 fs-3" /> {album.tracks.length} Tracks
          </h4>

          <h5 className="mt-3 d-flex align-items-center">
            <BiLabel className="me-2 fs-2" /> {album.label}
          </h5>
          
          <h5 className="mt-3 fw-bold d-flex align-items-center">
            <MdOutlineDescription className="me-2 fs-3" /> Tracks
          </h5>
          <ol className="mt-3 text-start pe-3 ps-4">
            {album.tracks.map((track, index) => (
              <li key={index} className="text-white">
                {track}
              </li>
            ))}
          </ol>

          <div>
            <Form className="d-flex align-items-center flex-fill justify-content-end me-4">
              <Button
                size="lg"
                id="action-button"
                className="my-3 float-end purple-brand-bg border-0 py-3 px-4"
                disabled={!currentUser || isMediaInQueue(albumId ?? "")}
                onClick={() => {
                  addAlbumToCurrentQueue();
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
