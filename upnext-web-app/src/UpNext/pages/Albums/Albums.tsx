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
import { Album } from "../../types/album";
import AlbumSummaryCard from "../../components/AlbumSummaryCard";
import ListGroupSelect from "../../components/ListGroupSelect";

export default function Albums() {
  const [queueHistorySelected, setQueueHistorySelected] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [albumQueue, setAlbumQueue] = useState<Queue | null>();
  const [listenedAlbumIDs, setListenedAlbumIDs] = useState<any>([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const addAlbumToCurrentQueue = async () => {
    if (selectedAlbum === null || !currentUser || !albumQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        "Album",
        albumQueue._id,
        selectedAlbum
      );
      setAlbumQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding album to queue:", error);
    }
  };

  const moveAlbumFromCurrentToHistory = async () => {
    if (!currentUser || listenedAlbumIDs.length === 0 || !albumQueue) return;

    try {
      const updatedQueue = await queueClient.moveMediaFromCurrentToHistory(
        "Album",
        albumQueue._id,
        listenedAlbumIDs
      );
      setAlbumQueue(updatedQueue);
    } catch (error) {
      console.error("Error moving albums to history:", error);
    }
  };

  useEffect(() => {
    const fetchQueueItems = async () => {
      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          "Album",
          selectedGroup
        );
        setAlbumQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };
    fetchQueueItems();
  }, [currentUser, selectedGroup]);

  if (!albumQueue && currentUser) return <p>Loading...</p>;

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
            mediaType="Album"
            queue={albumQueue}
            currentQueue={albumQueue && albumQueue.current}
            historyQueue={albumQueue && albumQueue.history}
            showHistory={queueHistorySelected}
            setCompletedMediaIDs={setListenedAlbumIDs}
            setSelectedMedia={setSelectedAlbum}
            setMediaQueue={setAlbumQueue}
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
                  (albumQueue && albumQueue.current.length === 0) ||
                  listenedAlbumIDs.length === 0
                }
                onClick={() => {
                  moveAlbumFromCurrentToHistory();
                  setListenedAlbumIDs([]);
                }}
              >
                <MdOutlineDone className="me-1 mb-1 fs-4" /> Submit
              </Button>
            </div>
          )}
        </Col>
        <Col>
          <MediaSearch mediaType="Album" setSelectedMedia={setSelectedAlbum} />
          {selectedAlbum && (
            <>
              <AlbumSummaryCard album={selectedAlbum} />
            </>
          )}
          <Button
            size="lg"
            id="action-button"
            className="my-3 float-end purple-brand-bg border-0 w-25"
            disabled={
              !selectedAlbum ||
              !currentUser ||
              albumQueue?.current
                ?.map((item: any) => item._id)
                .includes(selectedAlbum._id) ||
              false ||
              albumQueue?.history
                ?.map((item: any) => item._id)
                .includes(selectedAlbum._id) ||
              false
            }
            onClick={() => {
              addAlbumToCurrentQueue();
              setSelectedAlbum(null);
            }}
          >
            <MdAdd className="me-1 mb-1 fs-4" /> Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
