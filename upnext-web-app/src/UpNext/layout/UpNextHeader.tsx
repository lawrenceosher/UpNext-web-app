import { Link, useLocation } from "react-router";
import "../../utils.css";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export default function UpNextHeader() {
  const { pathname } = useLocation();

  return (
    <div
      id="upnext-top-header"
      style={{ height: 75 }}
      className="d-flex flex-row px-2 position-fixed w-100 purple-brand-bg border-bottom border-white border-4 z-2"
    >
      <Link
        to="/UpNext/Home"
        className="text-white fw-bold flex-grow-1 fs-1 my-auto text-decoration-none"
      >
        UpNext
      </Link>

      <div className="d-flex my-auto">
        <Link to="/UpNext/Users">
          <IoSettingsOutline
            className={`fs-1 me-3 ${
              pathname.includes("Users") ? "text-dark" : "text-white"
            }`}
          />
        </Link>
        <Link to="/UpNext/Account/Profile">
          <FaRegUser
            className={`fs-1 ${
              pathname.includes("Profile") ? "text-dark" : "text-white"
            }`}
          />{" "}
        </Link>
      </div>
    </div>
  );
}
