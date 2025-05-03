/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Container, Row } from "react-bootstrap";
import { MdAdd } from "react-icons/md";

import MediaSearch from "../../components/QueuePages/MediaSearch";

import "../../../utils.css";
import "../Queue/Queue.css";
import QueueList from "../../components/QueuePages/QueueList";
import { useSelector } from "react-redux";
import AlbumSummaryCard from "../../components/SummaryCards/AlbumSummaryCard";
import ListGroupSelect from "../../components/QueuePages/ListGroupSelect";
import useQueuePage from "../../hooks/useQueuePage";
import MovieSummaryCard from "../../components/SummaryCards/MovieSummaryCard";
import TVSummaryCard from "../../components/SummaryCards/TVSummaryCard";
import GameSummaryCard from "../../components/SummaryCards/GameSummaryCard";
import PodcastSummaryCard from "../../components/SummaryCards/PodcastSummaryCard";
import BookSummaryCard from "../../components/SummaryCards/BookSummaryCard";
import QueueActionButtons from "../../components/QueuePages/QueueActionButtons";

/**
 * Displays the page for the queue of a specific media type.
 * It includes a list of media items in the queue, a search bar to find new media,
 * and buttons to manage the queue.
 * @param mediaType - The type of media to be displayed in the queue (e.g., "Movie", "TV", etc.) 
 */
export default function Queue({ mediaType }: { mediaType: string }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const {
    mediaQueue,
    setMediaQueue,
    consumedMediaIDs,
    setConsumedMediaIDs,
    selectedGroup,
    setSelectedGroup,
    queueHistorySelected,
    setQueueHistorySelected,
    selectedMedia,
    setSelectedMedia,
    addMediaToCurrentQueue,
    moveMediaFromCurrentToHistory,
    isMediaInQueue,
  } = useQueuePage(currentUser, mediaType);

  if (!mediaQueue && currentUser) return <p>Loading...</p>;

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
            mediaType={mediaType}
            queue={mediaQueue}
            currentQueue={mediaQueue && mediaQueue.current}
            historyQueue={mediaQueue && mediaQueue.history}
            showHistory={queueHistorySelected}
            setCompletedMediaIDs={setConsumedMediaIDs}
            setSelectedMedia={setSelectedMedia}
            setMediaQueue={setMediaQueue}
          />
          {currentUser && (
            <QueueActionButtons
              queueHistorySelected={queueHistorySelected}
              setQueueHistorySelected={setQueueHistorySelected}
              mediaQueue={mediaQueue}
              consumedMediaIDs={consumedMediaIDs}
              setConsumedMediaIDs={setConsumedMediaIDs}
              moveMediaFromCurrentToHistory={moveMediaFromCurrentToHistory}
            />
          )}
        </Col>
        <Col>
          <MediaSearch
            mediaType={mediaType}
            setSelectedMedia={setSelectedMedia}
          />
          {selectedMedia && (
            <>
              {mediaType === "Album" && (
                <AlbumSummaryCard album={selectedMedia} />
              )}
              {mediaType === "Movie" && (
                <MovieSummaryCard movie={selectedMedia} />
              )}
              {mediaType === "TV" && <TVSummaryCard tv={selectedMedia} />}
              {mediaType === "VideoGame" && (
                <GameSummaryCard game={selectedMedia} />
              )}
              {mediaType === "Podcast" && (
                <PodcastSummaryCard podcast={selectedMedia} />
              )}
              {mediaType === "Book" && <BookSummaryCard book={selectedMedia} />}
            </>
          )}
          <Button
            size="lg"
            id="action-button"
            className="my-3 float-end purple-brand-bg border-0 w-25"
            disabled={
              !selectedMedia ||
              !currentUser ||
              isMediaInQueue(selectedMedia._id)
            }
            onClick={() => {
              addMediaToCurrentQueue();
              setSelectedMedia(null);
            }}
          >
            <MdAdd className="me-1 mb-1 fs-4" /> Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
