import Image from "react-bootstrap/Image";
import "./SummaryCard.css";
import { Link, useNavigate } from "react-router-dom";
import { VideoGame } from "../types/game";

export default function GameSummaryCard({ game }: { game: VideoGame }) {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-row text-center mh-75">
      <Image
        src={game.coverArt}
        id="poster-card"
        className="p-3 align-self-center"
        onClick={() => navigate(`/UpNext/Games/${game._id}`)}
      />
      <div className="p-3 flex-grow-1">
        <Link
          to={`/UpNext/Games/${game._id}`}
          className="fw-bold fs-1 text-decoration-none text-white"
        >
          {game.title}
        </Link>
        <h4 className="mt-3">Created by {game.companies.join(", ")}</h4>
        <p className="p-3 overflow-y-hidden">{game.summary}</p>
      </div>
    </div>
  );
}
