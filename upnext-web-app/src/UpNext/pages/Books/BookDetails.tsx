/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { CiCalendar } from "react-icons/ci";
import { MdAdd, MdOutlineDescription } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { Alert, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as queueClient from "../../clients/queueClient";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoBookOutline } from "react-icons/io5";
import { BiLabel } from "react-icons/bi";
import { Book } from "../../types/book";
import { TiPencil } from "react-icons/ti";
import { LuBookText } from "react-icons/lu";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function BookDetails() {
  const { bookId } = useParams();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [book, setBook] = useState<Book | null>(null);
  const [otherUsers, setOtherUsers] = useState<any>(null);
  const [bookQueue, setBookQueue] = useState<any>(null);

  const [showAlert, setShowAlert] = useState(false);

  const readableDate = (dateString: string) => {
    return `${dateString.slice(5, 7)}/${dateString.slice(
      8,
      10
    )}/${dateString.slice(0, 4)}`;
  };

  const addBookToCurrentQueue = async () => {
    if (!currentUser || !bookQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        "Book",
        bookQueue._id,
        book
      );
      setBookQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding book to queue:", error);
    }
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (!bookId) return;
        const bookResult = await queueClient.retrieveMediaDetails(
          "Book",
          bookId
        );
        setBook(bookResult);
      } catch (error) {
        console.error("Error fetching book:", error);
      }

      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          "Book"
        );
        setBookQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };

    const fetchOtherUsers = async () => {
      if (!bookId) return;

      try {
        const otherUsers = await queueClient.findOtherUsersWithSameMedia(
          "Book",
          bookId
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

    fetchBookDetails();
    fetchOtherUsers();
  }, [currentUser, bookId]);

  if (!book) return <div>Loading...</div>;

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Add Book</Alert.Heading>
          <p>Successfully added {book.title} to your current queue!</p>
        </Alert>
      )}
      <div className="d-flex">
        <Image
          src={book.coverArt}
          height={550}
          className="border border-4 border-white mb-4"
        />
        <div className="ps-4 flex-grow-1">
          <h1 className="fw-bold d-flex align-items-center display-4">
            <IoBookOutline className="me-4" /> {book.title}
          </h1>
          <h4 className="mt-3 d-flex align-items-center">
            <TiPencil className="me-2 fs-3" /> Written by{" "}
            {book.authors.join(", ")}
          </h4>
          <h4 className="mt-3 d-flex align-items-center">
            <CiCalendar className="me-2 fs-3" />{" "}
            {readableDate(book.datePublished)}
          </h4>
          <h4 className="mt-3 d-flex align-items-center">
            <LuBookText className="me-2 fs-3" /> {book.pages} Pages
          </h4>
          <h5 className="mt-3 d-flex align-items-center">
            <BiLabel className="me-2 fs-2" /> {book.publisher}
          </h5>
          <h5 className="mt-3 fw-bold d-flex align-items-center">
            <MdOutlineDescription className="me-2 fs-3" /> Description
          </h5>
          <p className="mt-3 text-start pe-3">{stripHtml(book.synopsis)}</p>

          {currentUser && (
            <>
              <h5 className="mt-3 fw-bold d-flex align-items-center">
                <IoIosPeople className="me-2 fs-2" /> Other Users Who Read
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
                  (bookQueue &&
                    bookQueue.current
                      .map((item: any) => item._id)
                      .includes(bookId)) ||
                  (bookQueue &&
                    bookQueue.history
                      .map((item: any) => item._id)
                      .includes(bookId))
                }
                onClick={() => {
                  addBookToCurrentQueue();
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
