/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Container, Row } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdHistory, MdOutlineDone, MdAdd } from "react-icons/md";

import MediaSearch from "../../components/QueuePages/MediaSearch";

import "../../../utils.css";
import "../Movies/Movies.css";
import QueueList from "../../components/QueuePages/QueueList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as queueClient from "../../clients/queueClient";
import { Queue } from "../../types/queue";
import { Book } from "../../types/book";
import BookSummaryCard from "../../components/SummaryCards/BookSummaryCard";
import ListGroupSelect from "../../components/QueuePages/ListGroupSelect";

export default function Books() {
  const [queueHistorySelected, setQueueHistorySelected] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [bookQueue, setBookQueue] = useState<Queue | null>();
  const [readBookIDs, setReadBookIDs] = useState<any>([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const addBookToCurrentQueue = async () => {
    if (selectedBook === null || !currentUser || !bookQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        "Book",
        bookQueue._id,
        selectedBook
      );
      setBookQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding book to queue:", error);
    }
  };

  const moveBookFromCurrentToHistory = async () => {
    if (!currentUser || readBookIDs.length === 0 || !bookQueue) return;

    try {
      const updatedQueue = await queueClient.moveMediaFromCurrentToHistory(
        "Book",
        bookQueue._id,
        readBookIDs
      );
      setBookQueue(updatedQueue);
    } catch (error) {
      console.error("Error moving books to history:", error);
    }
  };

  useEffect(() => {
    const fetchQueueItems = async () => {
      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          "Book",
          selectedGroup
        );
        setBookQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };
    fetchQueueItems();
  }, [currentUser, selectedGroup]);

  if (!bookQueue && currentUser) return <p>Loading...</p>;

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
            mediaType="Book"
            queue={bookQueue}
            currentQueue={bookQueue && bookQueue.current}
            historyQueue={bookQueue && bookQueue.history}
            showHistory={queueHistorySelected}
            setCompletedMediaIDs={setReadBookIDs}
            setSelectedMedia={setSelectedBook}
            setMediaQueue={setBookQueue}
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
                  (bookQueue && bookQueue.current.length === 0) ||
                  readBookIDs.length === 0
                }
                onClick={() => {
                  moveBookFromCurrentToHistory();
                  setReadBookIDs([]);
                }}
              >
                <MdOutlineDone className="me-1 mb-1 fs-4" /> Submit
              </Button>
            </div>
          )}
        </Col>
        <Col>
          <MediaSearch mediaType="Book" setSelectedMedia={setSelectedBook} />
          {selectedBook && (
            <>
              <BookSummaryCard book={selectedBook} />
            </>
          )}
          <Button
            size="lg"
            id="action-button"
            className="my-3 float-end purple-brand-bg border-0 w-25"
            disabled={
              !selectedBook ||
              !currentUser ||
              bookQueue?.current
                ?.map((item: any) => item._id)
                .includes(selectedBook._id) ||
              false ||
              bookQueue?.history
                ?.map((item: any) => item._id)
                .includes(selectedBook._id) ||
              false
            }
            onClick={() => {
              addBookToCurrentQueue();
              setSelectedBook(null);
            }}
          >
            <MdAdd className="me-1 mb-1 fs-4" /> Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
