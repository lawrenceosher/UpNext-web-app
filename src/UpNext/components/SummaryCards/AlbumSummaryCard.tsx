import Image from "react-bootstrap/Image";
import "../styles/SummaryCard.css";
import { Link, useNavigate } from "react-router-dom";
import { Album } from "../../types/album";

/**
 * Displays a summary card for an album containing its cover art, title, artist, and track list.
 * The card is clickable and navigates to the AlbumDetails page when clicked.
 * @param album - The album object containing details about the album. 
 */
export default function AlbumSummaryCard({ album }: { album: Album }) {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-column flex-sm-row text-center mh-75">
      <Image
        src={album.coverArt}
        id="poster-card"
        role="button"
        className="m-3 border border-4 border-white object-fit-cover"
        onClick={() => navigate(`/UpNext/Albums/${album._id}`)}
      />
      <div className="p-3 flex-grow-1">
        <Link
          to={`/UpNext/Albums/${album._id}`}
          className="fw-bold fs-1 text-decoration-none text-white"
        >
          {album.title}
        </Link>
        <h4 className="mt-3">Created by {album.artist}</h4>
        <ol className="text-start mt-3">
          {album.tracks.map((track, index) => (
            <li key={index} className="text-white">
              {track}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
