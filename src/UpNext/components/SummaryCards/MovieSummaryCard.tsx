import Image from "react-bootstrap/Image";
import "../styles/SummaryCard.css";
import { Link, useNavigate } from "react-router-dom";
import { Movie } from "../../types/movie";

/**
 * Displays a summary card for a movie containing its poster, title, director, and description.
 * The card is clickable and navigates to the MovieDetails page when clicked.
 * @param movie - The movie object containing details about the movie.
 */
export default function MovieSummaryCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-column flex-sm-row text-center mh-75">
      <Image
        id="poster-card"
        role="button"
        src={movie.posterPath}
        className="m-3 border border-4 border-white object-fit-cover"
        onClick={() => navigate(`/UpNext/Movies/${movie._id}`)}
      />
      <div className="p-3 flex-grow-1">
        <Link
          to={`/UpNext/Movies/${movie._id}`}
          className="fw-bold fs-1 text-decoration-none text-white"
        >
          {movie.title}
        </Link>
        <h4 className="mt-3">Directed by {movie.director}</h4>
        <p className="p-3 overflow-y-hidden">{movie.description}</p>
      </div>
    </div>
  );
}
