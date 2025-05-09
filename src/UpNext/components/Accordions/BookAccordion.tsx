import { Accordion, ListGroup, ListGroupItem } from "react-bootstrap";
import QueueGroupToggle from "../QueueGroupToggle";
import { Book } from "../../types/book";
import { useNavigate } from "react-router-dom";

/**
 * Displays a list of books in an accordion format.
 * Each book is clickable and navigates to the book's details page.
 *
 * @param {Book[]} books - Array of book objects to display.
 */
export default function BookAccordion({ books }: { books: Book[] }) {
  const navigate = useNavigate();

  return (
    <Accordion>
      <ListGroup className="mb-4 border">
        <QueueGroupToggle eventKey="3">Books</QueueGroupToggle>
        <Accordion.Collapse eventKey="3">
          <ListGroup>
            {books.map((book: Book, index: number) => (
              <ListGroupItem
                key={book._id}
                className="rounded-0 bg-transparent text-white"
                onClick={() => navigate(`/UpNext/Books/${book._id}`)}
              >
                {index + 1}. {book.title}{" "}
                {book.datePublished !== ""
                  ? `(${book.datePublished.slice(0, 4)})`
                  : ""}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Accordion.Collapse>
      </ListGroup>
    </Accordion>
  );
}
