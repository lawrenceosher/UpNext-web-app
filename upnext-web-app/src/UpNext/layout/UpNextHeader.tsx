import { Link, useLocation } from "react-router";
import "../../utils.css";
import { FaRegUser } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";

/**
 * Header for the application that is present on every page except Signup and Login.
 * Contains the logo and navigation links to the Users page and Profile page.
 */
export default function UpNextHeader() {
  // Get the current pathname from the URL
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
              // Only show the highlighted icon if the user is viewing their own profile
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
