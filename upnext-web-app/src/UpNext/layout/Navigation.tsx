import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { BiMovie } from "react-icons/bi";
import { FiTv } from "react-icons/fi";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { SlMicrophone } from "react-icons/sl";
import { IoGameControllerOutline } from "react-icons/io5";

import "../../utils.css";
import "./Navigation.css";

export default function UpNextNavigation() {
  const { pathname } = useLocation();

  const links = [
    { path: "Movies", icon: BiMovie },
    { path: "TV", icon: FiTv },
    { path: "Albums", icon: IoMusicalNotesOutline },
    { path: "Books", icon: IoBookOutline },
    { path: "Podcasts", icon: SlMicrophone },
    { path: "Games", icon: IoGameControllerOutline },
  ];

  return (
    <ListGroup
      id="upnext-navigation"
      className="rounded-0 position-fixed purple-brand-bg bottom-0 top-0 border-end border-white border-4 z-2"
    >
      {links.map((link) => (
        <ListGroup.Item
          id="icon-button"
          key={link.path}
          as={Link}
          to={`/UpNext/${link.path}`}
          className="list-group-item text-center bg-transparent border-0 text-white "
        >
          <link.icon
            id="icon-nav"
            className={`${
              pathname.includes(link.path) ? "text-dark" : "text-white"
            }`}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
