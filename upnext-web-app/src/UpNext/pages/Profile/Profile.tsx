import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { BiMovie } from "react-icons/bi";
import { FiTv } from "react-icons/fi";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { SlMicrophone } from "react-icons/sl";
import { IoGameControllerOutline } from "react-icons/io5";
import "./Profile.css";
import { BsPeople } from "react-icons/bs";

const groups = ["Group 1", "Group 2", "Group 3", "Group 4"];
const history = [
  { category: "Movies", icon: BiMovie, value: 30 },
  { category: "TV", icon: FiTv, value: 25 },
  { category: "Albums", icon: IoMusicalNotesOutline, value: 20 },
  { category: "Books", icon: IoBookOutline, value: 15 },
  { category: "Podcasts", icon: SlMicrophone, value: 10 },
  { category: "Games", icon: IoGameControllerOutline, value: 5 },
];

export default function Profile() {
  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex align-items-center">
            <h1 className="fw-bold display-2">Username</h1>
            <FaPencil className="fs-3 ms-4" />
          </div>

          <h4>
            <MdDateRange className="mb-1" /> Joined March 2025
          </h4>

          <div className="mt-4">
            <h2 className="display-6 fw-bold">History</h2>
            <ul className="p-0">
              {history.map((category) => (
                <li
                  key={category.category}
                  className="d-flex align-items-center fs-3"
                >
                  {<category.icon className=" me-2" />} {category.category}:{" "}
                  {category.value}{" "}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <h2 className="display-6 fw-bold">Groups</h2>
            <ul className="p-0 list-unstyled">
              {groups.map((group) => (
                <li key={group} className="fs-3 text-decoration-underline">
                  <BsPeople className="me-2" />
                  {group}
                </li>
              ))}
            </ul>
          </div>
        </Col>

        <Col>
          <h4>Current Personal Queues</h4>
          <ListGroup className="mb-4 border">
            <h3
              className="fs-2 ps-2 pt-2 pb-2 rounded-top m-0 border"
              id="current-queue-header"
            >
              Movies
            </h3>
            <ListGroup>
              <ListGroupItem className="rounded-0 bg-transparent text-white">
                1. Cras justo odio
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                2. Dapibus ac facilisis in
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                3. Vestibulum at eros
              </ListGroupItem>
            </ListGroup>
          </ListGroup>
          <ListGroup className="mb-4 border">
            <h3
              className="fs-2 ps-2 pt-2 pb-2 rounded-top m-0 border"
              id="current-queue-header"
            >
              TV
            </h3>
            <ListGroup>
              <ListGroupItem className="rounded-0 bg-transparent text-white">
                1. Cras justo odio
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                2. Dapibus ac facilisis in
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                3. Vestibulum at eros
              </ListGroupItem>
            </ListGroup>
          </ListGroup>
          <ListGroup className="mb-4 border">
            <h3
              className="fs-2 ps-2 pt-2 pb-2 rounded-top m-0 border"
              id="current-queue-header"
            >
              Albums
            </h3>
            <ListGroup>
              <ListGroupItem className="rounded-0 bg-transparent text-white">
                1. Cras justo odio
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                2. Dapibus ac facilisis in
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                3. Vestibulum at eros
              </ListGroupItem>
            </ListGroup>
          </ListGroup>
        </Col>
        <Col>
          <h4>
            <br />
          </h4>
          <ListGroup className="mb-4 border">
            <h3
              className="fs-2 ps-2 pt-2 pb-2 rounded-top m-0 border"
              id="current-queue-header"
            >
              Books
            </h3>
            <ListGroup>
              <ListGroupItem className="rounded-0 bg-transparent text-white">
                1. Cras justo odio
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                2. Dapibus ac facilisis in
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                3. Vestibulum at eros
              </ListGroupItem>
            </ListGroup>
          </ListGroup>
          <ListGroup className="mb-4 border">
            <h3
              className="fs-2 ps-2 pt-2 pb-2 rounded-top m-0 border"
              id="current-queue-header"
            >
              Podcasts
            </h3>
            <ListGroup>
              <ListGroupItem className="rounded-0 bg-transparent text-white">
                1. Cras justo odio
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                2. Dapibus ac facilisis in
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                3. Vestibulum at eros
              </ListGroupItem>
            </ListGroup>
          </ListGroup>
          <ListGroup className="mb-4 border">
            <h3
              className="fs-2 ps-2 pt-2 pb-2 rounded-top m-0 border"
              id="current-queue-header"
            >
              Video Games
            </h3>
            <ListGroup>
              <ListGroupItem className="rounded-0 bg-transparent text-white">
                1. Cras justo odio
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                2. Dapibus ac facilisis in
              </ListGroupItem>
              <ListGroupItem className="bg-transparent text-white">
                3. Vestibulum at eros
              </ListGroupItem>
            </ListGroup>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
