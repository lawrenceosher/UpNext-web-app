/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { CiCalendar } from "react-icons/ci";
import { MdAdd, MdOutlineDescription } from "react-icons/md";
import { FaMasksTheater } from "react-icons/fa6";
import { Alert, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { VideoGame } from "../../types/game";
import { IoGameControllerOutline } from "react-icons/io5";
import { BiLabel } from "react-icons/bi";
import { GiPlatform } from "react-icons/gi";
import useDetails from "../../hooks/useDetails";
import { formatDateString } from "../../utils";

/**
 * Displays the details of a specific video game.
 * It fetches the game data using the gameId from the URL parameters,
 * and allows the user to add the game to their current queue.
 */
export default function GameDetails() {
  const { gameId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const {
    media: game,
    addMediaToCurrentQueue: addGameToCurrentQueue,
    showAlert,
    setShowAlert,
    isMediaInQueue,
  } = useDetails(currentUser, gameId, "VideoGame") as {
    media: VideoGame;
    mediaQueue: any;
    addMediaToCurrentQueue: () => void;
    showAlert: boolean;
    setShowAlert: (value: boolean) => void;
    isMediaInQueue: (mediaId: string) => boolean;
  };

  if (!game) return <div>Loading...</div>;

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          className="me-3"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Add Video Game</Alert.Heading>
          <p>Successfully added {game.title} to your current personal queue!</p>
        </Alert>
      )}
      <div className="d-flex">
        <Image
          src={game.coverArt}
          height={500}
          width={500}
          className="border border-4 border-white mb-4"
        />
        <div className="ps-4 flex-grow-1">
          <h1 className="fw-bold d-flex align-items-center display-4">
            <IoGameControllerOutline className="me-2" /> {game.title}
          </h1>
          <h4 className="mt-3 d-flex align-items-center">
            <BiLabel className="me-2 fs-3" /> Created by{" "}
            {game.companies.join(", ")}
          </h4>
          <h4 className="mt-3 d-flex align-items-center">
            <CiCalendar className="me-2 fs-3" />{" "}
            {formatDateString(game.releaseDate)}
          </h4>
          <h4 className="mt-3 d-flex align-items-center">
            <FaMasksTheater className="me-2 fs-3" />{" "}
            {game && game.genres.join(", ")}
          </h4>
          <h5 className="mt-3 d-flex align-items-center">
            <GiPlatform className="me-2 fs-2" /> {game.platforms.join(", ")}
          </h5>
          <h5 className="mt-5 fw-bold d-flex align-items-center">
            <MdOutlineDescription className="me-2 fs-3" /> Summary
          </h5>
          <p className="mt-3 text-start pe-3">{game.summary}</p>

          <div>
            <Form className="d-flex align-items-center flex-fill justify-content-end me-4">
              <Button
                size="lg"
                id="action-button"
                className="my-3 float-end purple-brand-bg border-0 w-25"
                disabled={!currentUser || isMediaInQueue(gameId ?? "")}
                onClick={() => {
                  addGameToCurrentQueue();
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
