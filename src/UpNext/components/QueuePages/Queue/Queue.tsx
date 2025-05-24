/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  Container,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { MdAdd } from "react-icons/md";

import MediaSearch from "../MediaSearch";

import "../../../../utils.css";
import "./Queue.css";
import QueueList from "../QueueList";
import { useSelector } from "react-redux";
import AlbumSummaryCard from "../../SummaryCards/AlbumSummaryCard";
import ListGroupSelect from "../ListGroupSelect";
import useQueuePage from "../../../hooks/useQueuePage";
import MovieSummaryCard from "../../SummaryCards/MovieSummaryCard";
import TVSummaryCard from "../../SummaryCards/TVSummaryCard";
import GameSummaryCard from "../../SummaryCards/GameSummaryCard";
import PodcastSummaryCard from "../../SummaryCards/PodcastSummaryCard";
import BookSummaryCard from "../../SummaryCards/BookSummaryCard";
import QueueActionButtons from "../QueueActionButtons";
import { Album } from "../../../types/album";
import { Movie } from "../../../types/movie";
import { TVShow } from "../../../types/tvShow";
import { VideoGame } from "../../../types/game";
import { Podcast } from "../../../types/podcast";
import { Book } from "../../../types/book";

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
    showToast,
    setShowToast,
    toastMessage,
  } = useQueuePage(currentUser, mediaType);

  if (!mediaQueue && currentUser) return <p>Loading...</p>;

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-5">
          {currentUser && (
            <ListGroupSelect
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
          )}
          <QueueList
            mediaType={mediaType}
            mediaQueue={mediaQueue}
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
                <AlbumSummaryCard album={selectedMedia as Album} />
              )}
              {mediaType === "Movie" && (
                <MovieSummaryCard movie={selectedMedia as Movie} />
              )}
              {mediaType === "TV" && (
                <TVSummaryCard tv={selectedMedia as TVShow} />
              )}
              {mediaType === "VideoGame" && (
                <GameSummaryCard game={selectedMedia as VideoGame} />
              )}
              {mediaType === "Podcast" && (
                <PodcastSummaryCard podcast={selectedMedia as Podcast} />
              )}
              {mediaType === "Book" && (
                <BookSummaryCard book={selectedMedia as Book} />
              )}
            </>
          )}
          <Button
            size="lg"
            id="action-button"
            className="my-3 float-end purple-brand-bg border-0 py-3 px-4"
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

          <ToastContainer className="p-3" position="top-center">
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              bg="success"
              delay={4000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Success!</strong>
              </Toast.Header>
              <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
          </ToastContainer>
        </Col>
      </Row>
    </Container>
  );
}
