import { Link } from "react-router";
import "../utils.css";
import { FaUser } from "react-icons/fa";

export default function UpNextHeader() {
  return (
    <div
      id="upnext-top-header"
      style={{ height: 75 }}
      className="d-flex flex-row p-2 position-fixed w-100 purple-brand-bg border-bottom border-white border-4 z-2"
    >
      <Link to="/UpNext/Home" className="text-white fw-bold flex-grow-1 fs-1 mb-1 text-decoration-none">UpNext</Link>
      <Link to="/Account/Profile">
        <FaUser className="fs-1 text-white mt-1 me-1" />{" "}
      </Link>
    </div>
  );
}
