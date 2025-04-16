import Image from "react-bootstrap/Image";
import "./SummaryCard.css";
import { Link } from "react-router-dom";
import { Album } from "../types/album";

export default function AlbumSummaryCard({ album }: { album: Album }) {
  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-row text-center mh-75">
      <Image src={album.coverArt} id="poster-card" className="p-3 align-self-center" />
      <div className="p-3">
      <Link
        to={`/UpNext/Albums/${album._id}`}
        className="fw-bold fs-1 text-decoration-none text-white"
      >
        {album.title}
      </Link>
      <h4 className="mt-3">Created by {album.artist}</h4>
      <ul className="list-unstyled">
        {album.tracks.map((track, index) => (
          <li key={index} className="text-white">
            {track}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}