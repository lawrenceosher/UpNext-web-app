/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Container, Row } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdHistory, MdOutlineDone, MdAdd } from "react-icons/md";

import MediaSearch from "../../components/MediaSearch";

import "../../../utils.css";
import "../Movies/Movies.css";
import QueueList from "../../components/QueueList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as queueClient from "../../clients/queueClient";
import { Queue } from "../../types/queue";
import { VideoGame } from "../../types/game";
import GameSummaryCard from "../../components/GameSummaryCard";
import ListGroupSelect from "../../components/ListGroupSelect";

export default function Games() {
  const [queueHistorySelected, setQueueHistorySelected] = useState(false);
  const [selectedGame, setSelectedGame] = useState<VideoGame | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [gameQueue, setGameQueue] = useState<Queue | null>();
  const [playedGameIDs, setPlayedGameIDs] = useState<any>([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const addGameToCurrentQueue = async () => {
    if (selectedGame === null || !currentUser || !gameQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        "VideoGame",
        gameQueue._id,
        selectedGame
      );
      setGameQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding video game to queue:", error);
    }
  };

  const moveGamesFromCurrentToHistory = async () => {
    if (!currentUser || playedGameIDs.length === 0 || !gameQueue) return;

    try {
      const updatedQueue = await queueClient.moveMediaFromCurrentToHistory(
        "VideoGame",
        gameQueue._id,
        playedGameIDs
      );
      setGameQueue(updatedQueue);
    } catch (error) {
      console.error("Error moving video games to history:", error);
    }
  };

  useEffect(() => {
    const fetchQueueItems = async () => {
      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          "VideoGame",
          selectedGroup
        );
        setGameQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };
    fetchQueueItems();
  }, [currentUser, selectedGroup]);

  if (!gameQueue && currentUser) return <p>Loading...</p>;

  return (
    <Container>
      <Row>
        <Col>
          {currentUser && (
            <ListGroupSelect
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
          )}
          <QueueList
            mediaType="VideoGame"
            queue={gameQueue}
            currentQueue={gameQueue && gameQueue.current}
            historyQueue={gameQueue && gameQueue.history}
            showHistory={queueHistorySelected}
            setCompletedMediaIDs={setPlayedGameIDs}
            setSelectedMedia={setSelectedGame}
            setMediaQueue={setGameQueue}
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
                  (gameQueue && gameQueue.current.length === 0) ||
                  playedGameIDs.length === 0
                }
                onClick={() => {
                  moveGamesFromCurrentToHistory();
                  setPlayedGameIDs([]);
                }}
              >
                <MdOutlineDone className="me-1 mb-1 fs-4" /> Submit
              </Button>
            </div>
          )}
        </Col>
        <Col>
          <MediaSearch
            mediaType="VideoGame"
            setSelectedMedia={setSelectedGame}
          />
          {selectedGame && (
            <>
              <GameSummaryCard game={selectedGame} />
            </>
          )}
          <Button
            size="lg"
            id="action-button"
            className="my-3 float-end purple-brand-bg border-0 w-25"
            disabled={
              !selectedGame ||
              !currentUser ||
              gameQueue?.current
                ?.map((item: any) => item._id)
                .includes(selectedGame._id) ||
              false ||
              gameQueue?.history
                ?.map((item: any) => item._id)
                .includes(selectedGame._id) ||
              false
            }
            onClick={() => {
              addGameToCurrentQueue();
              setSelectedGame(null);
            }}
          >
            <MdAdd className="me-1 mb-1 fs-4" /> Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
