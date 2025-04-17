import Image from "react-bootstrap/Image";
import "./SummaryCard.css";
import { Link } from "react-router-dom";
import { TVShow } from "../types/tvShow";

export default function TVSummaryCard({ tv }: { tv: TVShow }) {
  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-row text-center mh-75">
      <Image src={tv.posterPath} id="poster-card" className="p-3 align-self-center" />
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