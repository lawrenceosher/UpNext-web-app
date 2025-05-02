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
import { TVShow } from "../../types/tvShow";
import TVSummaryCard from "../../components/SummaryCards/TVSummaryCard";
import ListGroupSelect from "../../components/ListGroupSelect";

export default function TV() {
  const [queueHistorySelected, setQueueHistorySelected] = useState(false);
  const [selectedTV, setSelectedTV] = useState<TVShow | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [tvQueue, setTVQueue] = useState<Queue | null>();
  const [watchedTVIDs, setWatchedTVIDs] = useState<any>([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const addTVToCurrentQueue = async () => {
    if (selectedTV === null || !currentUser || !tvQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        "TV",
        tvQueue._id,
        selectedTV
      );
      setTVQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding tv show to queue:", error);
    }
  };

  const moveTVFromCurrentToHistory = async () => {
    if (!currentUser || watchedTVIDs.length === 0 || !tvQueue) return;

    try {
      const updatedQueue = await queueClient.moveMediaFromCurrentToHistory(
        "TV",
        tvQueue._id,
        watchedTVIDs
      );
      setTVQueue(updatedQueue);
    } catch (error) {
      console.error("Error moving tv shows to history:", error);
    }
  };

  useEffect(() => {
    const fetchQueueItems = async () => {
      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          "TV",
          selectedGroup
        );
        setTVQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };
    fetchQueueItems();
  }, [currentUser, selectedGroup]);

  if (!tvQueue && currentUser) return <p>Loading...</p>;

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
            mediaType="TV"
            queue={tvQueue}
            currentQueue={tvQueue && tvQueue.current}
            historyQueue={tvQueue && tvQueue.history}
            showHistory={queueHistorySelected}
            setCompletedMediaIDs={setWatchedTVIDs}
            setSelectedMedia={setSelectedTV}
            setMediaQueue={setTVQueue}
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
                  (tvQueue && tvQueue.current.length === 0) ||
                  watchedTVIDs.length === 0
                }
                onClick={() => {
                  moveTVFromCurrentToHistory();
                  setWatchedTVIDs([]);
                }}
              >
                <MdOutlineDone className="me-1 mb-1 fs-4" /> Submit
              </Button>
            </div>
          )}
        </Col>
        <Col>
          <MediaSearch mediaType="TV" setSelectedMedia={setSelectedTV} />
          {selectedTV && (
            <>
              <TVSummaryCard tv={selectedTV} />
            </>
          )}
          <Button
            size="lg"
            id="action-button"
            className="my-3 float-end purple-brand-bg border-0 w-25"
            disabled={
              !selectedTV ||
              !currentUser ||
              tvQueue?.current
                ?.map((item: any) => item._id)
                .includes(selectedTV._id) ||
              false ||
              tvQueue?.history
                ?.map((item: any) => item._id)
                .includes(selectedTV._id) ||
              false
            }
            onClick={() => {
              addTVToCurrentQueue();
              setSelectedTV(null);
            }}
          >
            <MdAdd className="me-1 mb-1 fs-4" /> Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
