import { Link, useLocation } from "react-router";
import "../../utils.css";
import { FaRegUser } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";

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
        className="text-white fw-bold flex-grow-1 display-5 my-auto text-decoration-none"
      >
        UpNext
      </Link>

      <div className="d-flex my-auto">
        <Link to="/UpNext/Users">
          <BsPeople
            id="icon-button"
            className={`display-5 me-3 ${
              pathname.includes("Users") ? "text-dark" : "text-white"
            }`}
          />
        </Link>
        <Link to="/UpNext/Account/Profile">
          <FaRegUser
            id="icon-button"
            className={`display-6 mt-1 ${
              pathname === "/UpNext/Account/Profile"
                ? "text-dark"
                : "text-white"
            }`}
          />{" "}
        </Link>
      </div>
    </div>
  );
}
