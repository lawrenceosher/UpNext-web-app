import Image from "react-bootstrap/Image";
import "../styles/SummaryCard.css";
import { Link, useNavigate } from "react-router-dom";
import { Book } from "../../types/book";

/**
 * Truncate text to a specified length and add ellipsis if necessary.
 * This function is used to limit the length of the book synopsis displayed on the card
 * to ensure it fits well within the card layout.
 * @param text The text to be truncated
 * @param maxLength The maximum length of the text
 * @returns The truncated text with ellipsis if it exceeds the maxLength
 */
function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

/**
 * Displays a summary card for a book containing its cover art, title, author(s), and synopsis.
 * The card is clickable and navigates to the BookDetails page when clicked.
 * @param book - The book object containing details about the book.
 */
export default function BookSummaryCard({ book }: { book: Book }) {
  const navigate = useNavigate();
  const maxLength = 250;

  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-row text-center mh-75">
      <Image
        src={book.coverArt}
        id="poster-card"
        className="m-3 border border-4 border-white"
        onClick={() => navigate(`/UpNext/Books/${book._id}`)}
      />
      <div className="p-3 flex-grow-1">
        <Link
          to={`/UpNext/Books/${book._id}`}
          className="fw-bold fs-1 text-decoration-none text-white"
        >
          {book.title}
        </Link>
        <h4 className="mt-3">Written by {book.authors.join(", ")}</h4>
        <p className="p-3 overflow-y-hidden">
          {truncate(book.synopsis, maxLength)}
        </p>
      </div>
    </div>
  );
}
