import Image from "react-bootstrap/Image";
import "../styles/SummaryCard.css";
import { Link, useNavigate } from "react-router-dom";
import { TVShow } from "../../types/tvShow";

/**
 * Displays a summary card for a TV show containing its poster, title, creator, and description.
 * The card is clickable and navigates to the TVDetails page when clicked.
 * @param tv - The TV show object containing details about the TV show. 
 */
export default function TVSummaryCard({ tv }: { tv: TVShow }) {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-row text-center mh-75">
      <Image
        src={tv.posterPath}
        id="poster-card"
        className="m-3 border border-4 border-white"
        onClick={() => navigate(`/UpNext/TV/${tv._id}`)}
      />
      <div className="p-3">
        <Link
          to={`/UpNext/TV/${tv._id}`}
          className="fw-bold fs-1 text-decoration-none text-white"
        >
          {tv.title}
        </Link>
        <h4 className="mt-3">Created by {tv.creator}</h4>
        <p className="p-3 overflow-y-hidden">{tv.description}</p>
      </div>
    </div>
  );
}
