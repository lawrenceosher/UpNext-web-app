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
import { Podcast } from "../../types/podcast";
import PodcastSummaryCard from "../../components/SummaryCards/PodcastSummaryCard";
import ListGroupSelect from "../../components/ListGroupSelect";

export default function Podcasts() {
  const [queueHistorySelected, setQueueHistorySelected] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [podcastQueue, setPodcastQueue] = useState<Queue | null>();
  const [listenedPodcastIDs, setListenedPodcastIDs] = useState<any>([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const addPodcastToCurrentQueue = async () => {
    if (selectedPodcast === null || !currentUser || !podcastQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        "Podcast",
        podcastQueue._id,
        selectedPodcast
      );
      setPodcastQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding podcast to queue:", error);
    }
  };

  const movePodcastsFromCurrentToHistory = async () => {
    if (!currentUser || listenedPodcastIDs.length === 0 || !podcastQueue)
      return;

    try {
      const updatedQueue = await queueClient.moveMediaFromCurrentToHistory(
        "Podcast",
        podcastQueue._id,
        listenedPodcastIDs
      );
      setPodcastQueue(updatedQueue);
    } catch (error) {
      console.error("Error moving podcasts to history:", error);
    }
  };

  useEffect(() => {
    const fetchQueueItems = async () => {
      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          "Podcast",
          selectedGroup
        );
        setPodcastQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };
    fetchQueueItems();
  }, [currentUser, selectedGroup]);

  if (!podcastQueue && currentUser) return <p>Loading...</p>;

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
            mediaType="Podcast"
            queue={podcastQueue}
            currentQueue={podcastQueue && podcastQueue.current}
            historyQueue={podcastQueue && podcastQueue.history}
            showHistory={queueHistorySelected}
            setCompletedMediaIDs={setListenedPodcastIDs}
            setSelectedMedia={setSelectedPodcast}
            setMediaQueue={setPodcastQueue}
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
                  (podcastQueue && podcastQueue.current.length === 0) ||
                  listenedPodcastIDs.length === 0
                }
                onClick={() => {
                  movePodcastsFromCurrentToHistory();
                  setListenedPodcastIDs([]);
                }}
              >
                <MdOutlineDone className="me-1 mb-1 fs-4" /> Submit
              </Button>
            </div>
          )}
        </Col>
        <Col>
          <MediaSearch
            mediaType="Podcast"
            setSelectedMedia={setSelectedPodcast}
          />
          {selectedPodcast && (
            <>
              <PodcastSummaryCard podcast={selectedPodcast} />
            </>
          )}
          <Button
            size="lg"
            id="action-button"
            className="my-3 float-end purple-brand-bg border-0 w-25"
            disabled={
              !selectedPodcast ||
              !currentUser ||
              podcastQueue?.current
                ?.map((item: any) => item._id)
                .includes(selectedPodcast._id) ||
              false ||
              podcastQueue?.history
                ?.map((item: any) => item._id)
                .includes(selectedPodcast._id) ||
              false
            }
            onClick={() => {
              addPodcastToCurrentQueue();
              setSelectedPodcast(null);
            }}
          >
            <MdAdd className="me-1 mb-1 fs-4" /> Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
