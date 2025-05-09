/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { CiCalendar } from "react-icons/ci";
import { MdAdd, MdOutlineDescription } from "react-icons/md";
import { Alert, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoBookOutline } from "react-icons/io5";
import { BiLabel } from "react-icons/bi";
import { Book } from "../../types/book";
import { TiPencil } from "react-icons/ti";
import { LuBookText } from "react-icons/lu";
import useDetails from "../../hooks/useDetails";
import { formatDateString, stripHtml } from "../../utils";

/**
 * Displays the details of a specific book.
 * It fetches the book data using the bookId from the URL parameters,
 * and allows the user to add the book to their current queue.
 */
export default function BookDetails() {
  const { bookId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const {
    media: book,
    addMediaToCurrentQueue: addBookToCurrentQueue,
    showAlert,
    setShowAlert,
    isMediaInQueue,
  } = useDetails(currentUser, bookId, "Book") as {
    media: Book;
    mediaQueue: any;
    addMediaToCurrentQueue: () => void;
    showAlert: boolean;
    setShowAlert: (value: boolean) => void;
    isMediaInQueue: (mediaId: string) => boolean;
  };

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
          <p>Successfully added {book.title} to your current personal queue!</p>
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
            {formatDateString(book.datePublished)}
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

          <div>
            <Form className="d-flex align-items-center flex-fill justify-content-end me-4">
              <Button
                size="lg"
                id="action-button"
                className="my-3 float-end purple-brand-bg border-0 w-25"
                disabled={!currentUser || isMediaInQueue(bookId ?? "")}
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
