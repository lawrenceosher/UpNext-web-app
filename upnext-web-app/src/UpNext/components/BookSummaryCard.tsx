import Image from "react-bootstrap/Image";
import "./SummaryCard.css";
import { Link } from "react-router-dom";
import { Book } from "../types/book";

function truncate(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

export default function BookSummaryCard({ book }: { book: Book }) {
  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-row text-center mh-75">
      <Image src={book.coverArt} id="poster-card" className="p-3 align-self-center" />
      <div className="p-3 flex-grow-1">
      <Link
        to={`/UpNext/Books/${book._id}`}
        className="fw-bold fs-1 text-decoration-none text-white"
      >
        {book.title}
      </Link>
      <h4 className="mt-3">Written by {book.authors.join(", ")}</h4>
      <p className="p-3 overflow-y-hidden">{truncate(book.synopsis, 250)}</p>
      </div>
    </div>
  );
}
