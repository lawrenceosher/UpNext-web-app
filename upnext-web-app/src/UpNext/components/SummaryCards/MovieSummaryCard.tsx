import Image from "react-bootstrap/Image";
import "./SummaryCard.css";
import { Link, useNavigate } from "react-router-dom";
import { Movie } from "../types/movie";

export default function MovieSummaryCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-row text-center mh-75">
      <Image
        src={movie.posterPath}
        id="poster-card"
        className="p-3 align-self-center"
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
