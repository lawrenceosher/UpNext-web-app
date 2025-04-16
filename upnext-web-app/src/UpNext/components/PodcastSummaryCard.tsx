import Image from "react-bootstrap/Image";
import "./SummaryCard.css";
import { Link } from "react-router-dom";
import { Podcast } from "../types/podcast";

export default function PodcastSummaryCard({ podcast }: { podcast: Podcast }) {
  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-row text-center mh-75">
      <Image src={podcast.coverArt} id="poster-card" className="p-3 align-self-center" />
      <div className="p-3 flex-grow-1">
      <Link
        to={`/UpNext/Podcasts/${podcast._id}`}
        className="fw-bold fs-1 text-decoration-none text-white"
      >
        {podcast.title}
      </Link>
      <h4 className="mt-3">Published by {podcast.publisher}</h4>
      <ul className="list-unstyled mt-3">
        {podcast.episodes.slice(0, 3).map((episode, index) => (
          <li key={index} className="text-white mb-2">
            {episode}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}