import Image from "react-bootstrap/Image";
import "./SummaryCard.css";
import { Link } from "react-router-dom";
import { Movie } from "../types/movie";

export default function MovieSummaryCard({ movie }: { movie: Movie }) {
  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-row text-center mh-75">
      <Image src={movie.posterPath} id="movie-poster-card" className="p-3 align-self-center" />
      <div className="p-3">
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
