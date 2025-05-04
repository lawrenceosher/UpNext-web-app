import Image from "react-bootstrap/Image";
import "../styles/SummaryCard.css";
import { Link, useNavigate } from "react-router-dom";
import { Podcast } from "../../types/podcast";

/**
 * Displays a summary card for a podcast containing its cover art, title, publisher, and episode list.
 * The card is clickable and navigates to the PodcastDetails page when clicked.
 * @param podcast - The podcast object containing details about the podcast. 
 */
export default function PodcastSummaryCard({ podcast }: { podcast: Podcast }) {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-row text-center mh-75">
      <Image
        src={podcast.coverArt}
        id="poster-card"
        className="p-3 align-self-center"
        onClick={() => navigate(`/UpNext/Podcasts/${podcast._id}`)}
      />
      <div className="p-3 flex-grow-1">
        <Link
          to={`/UpNext/Podcasts/${podcast._id}`}
          className="fw-bold fs-1 text-decoration-none text-white"
        >
          {podcast.title}
        </Link>
        <h4 className="mt-3">Published by {podcast.publisher}</h4>
        <ol className="list-unstyled mt-3">
          {podcast.episodes.slice(0, 3).map((episode, index) => (
            <li key={index} className="text-white mb-2">
              {episode}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
