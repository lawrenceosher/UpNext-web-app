import { Link, useLocation } from "react-router";
import "../../utils.css";
import "./UpNextHeader.css";
import { RiUserLine, RiGroupLine } from "react-icons/ri";
import { Container, ListGroup, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { BiMovie } from "react-icons/bi";
import { FiTv } from "react-icons/fi";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { SlMicrophone } from "react-icons/sl";
import { IoGameControllerOutline } from "react-icons/io5";
import { useState } from "react";

/**
 * Header for the application that is present on every page except Signup and Login.
 * Contains the logo and navigation links to each page in mobile view.
 * Users and their profile are also displayed in the header in desktop view.
 */
export default function UpNextHeader() {
  // Get the current pathname from the URL
  const { pathname } = useLocation();

  // State to control the offcanvas visibility
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // Functions to handle offcanvas state
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const links = [
    { path: "Movies", icon: BiMovie },
    { path: "TV", icon: FiTv },
    { path: "Albums", icon: IoMusicalNotesOutline },
    { path: "Books", icon: IoBookOutline },
    { path: "Podcasts", icon: SlMicrophone },
    { path: "Games", icon: IoGameControllerOutline },
    { path: "Users", icon: RiGroupLine },
    { path: "Account/Profile", icon: RiUserLine },
  ];

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
        <div className="d-none d-md-block">
          <Link to="/UpNext/Users">
            <RiGroupLine
              id="icon-button"
              className={`display-5 me-3 ${
                pathname.includes("Users") ? "text-dark" : "text-white"
              }`}
            />
          </Link>
          <Link to="/UpNext/Account/Profile">
            <RiUserLine
              id="icon-button"
              className={`display-5 ${
                // Only show the highlighted icon if the user is viewing their own profile
                pathname === "/UpNext/Account/Profile"
                  ? "text-dark"
                  : "text-white"
              }`}
            />{" "}
          </Link>
        </div>

        <Navbar expand={false} className="d-block d-md-none">
          <Container fluid>
            <Navbar.Toggle onClick={handleShow} />
            <Navbar.Offcanvas
              placement="end"
              className="bg-dark text-white"
              show={showOffcanvas}
              onHide={handleClose}
            >
              <Offcanvas.Header
                closeButton
                closeVariant="white"
              ></Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {links.map((link) => (
                    <ListGroup.Item
                      id="icon-button"
                      key={link.path}
                      as={Link}
                      to={`/UpNext/${link.path}`}
                      className="d-flex align-items-center bg-transparent border-0 text-white "
                      onClick={handleClose}
                    >
                      <link.icon id="icon-nav" className="me-3" />
                      <span className="fs-2">{link.path === 'Account/Profile' ? 'Profile' : link.path}</span>
                    </ListGroup.Item>
                  ))}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
