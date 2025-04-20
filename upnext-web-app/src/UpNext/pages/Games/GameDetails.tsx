/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { CiCalendar } from "react-icons/ci";
import { MdAdd, MdOutlineDescription } from "react-icons/md";
import { FaMasksTheater } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { Alert, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as queueClient from "../../clients/queueClient";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { VideoGame } from "../../types/game";
import { IoGameControllerOutline } from "react-icons/io5";
import { BiLabel } from "react-icons/bi";
import { GiPlatform } from "react-icons/gi";

export default function GameDetails() {
  const { gameId } = useParams();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [game, setGame] = useState<VideoGame | null>(null);
  const [otherUsers, setOtherUsers] = useState<any>(null);
  const [gameQueue, setGameQueue] = useState<any>(null);

  const [showAlert, setShowAlert] = useState(false);

  const readableDate = (dateString: string) => {
    return `${dateString.slice(5, 7)}/${dateString.slice(
      8,
      10
    )}/${dateString.slice(0, 4)}`;
  };

  const addGameToCurrentQueue = async () => {
    if (!currentUser || !gameQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        "VideoGame",
        gameQueue._id,
        game
      );
      setGameQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding video game to queue:", error);
    }
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        if (!gameId) return;
        const gameResult = await queueClient.retrieveMediaDetails(
          "VideoGame",
          gameId
        );
        setGame(gameResult);
      } catch (error) {
        console.error("Error fetching video game:", error);
      }

      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          "VideoGame"
        );
        setGameQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };

    const fetchOtherUsers = async () => {
      if (!gameId) return;

      try {
        const otherUsers = await queueClient.findOtherUsersWithSameMedia(
          "VideoGame",
          gameId
        );
        if (!currentUser) {
          setOtherUsers(otherUsers);
        } else {
          const otherUsersExceptCurrent = otherUsers.filter(
            (user: any) => user.username !== currentUser.username
          );
          setOtherUsers(otherUsersExceptCurrent);
        }
      } catch (error) {
        console.error("Error fetching other users:", error);
      }
    };

    fetchGameDetails();
    fetchOtherUsers();
  }, [currentUser, gameId]);

  if (!game) return <div>Loading...</div>;

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
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
            {readableDate(game.releaseDate)}
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
          {currentUser && (
            <>
              <h5 className="mt-5 fw-bold d-flex align-items-center">
                <IoIosPeople className="me-2 fs-2" /> Other Users Who Played
              </h5>
              <ul className="list-unstyled">
                {otherUsers &&
                  otherUsers.map((u: any) => (
                    <li key={u._id}>
                      <Link to={`/UpNext/Account/Profile/${u._id}`}>
                        {u.username}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}

          <div>
            <Form className="d-flex align-items-center flex-fill justify-content-end me-4">
              <Button
                size="lg"
                id="action-button"
                className="my-3 float-end purple-brand-bg border-0 w-25"
                disabled={
                  !currentUser ||
                  (gameQueue &&
                    gameQueue.current
                      .map((item: any) => item._id)
                      .includes(gameId)) ||
                  (gameQueue &&
                    gameQueue.history
                      .map((item: any) => item._id)
                      .includes(gameId))
                }
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
