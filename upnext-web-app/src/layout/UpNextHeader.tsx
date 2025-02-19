import { Link } from "react-router";
import "../utils.css";
import { FaUser } from "react-icons/fa";

export default function UpNextHeader() {
  return (
    <div
      id="upnext-top-header"
      className="d-flex flex-row p-2 position-fixed w-100 purple-brand-bg border-bottom border-white border-4 z-2"
    >
      <h1 className="text-white fw-bold flex-grow-1">UpNext</h1>
      <Link to="/Account/Profile">
        <FaUser className="fs-1 text-white mt-1 me-1" />{" "}
      </Link>
    </div>
  );
}
