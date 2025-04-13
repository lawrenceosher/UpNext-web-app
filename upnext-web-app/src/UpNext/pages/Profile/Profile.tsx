import {
  Accordion,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
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
import QueueGroupToggle from "./QueueGroupToggle";

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
            <h1 className="fw-bold display-2">losher33</h1>
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
                <li key={group} id="group" className="fs-3 w-fit">
                  <BsPeople className="me-2" />
                  {group}
                </li>
              ))}
            </ul>
          </div>
        </Col>

        {/* Only show the current personal queues if you're viewing another user's profile*/}
        <Col>
          <h4>Current Personal Queues</h4>

          <Accordion>
            <ListGroup className="mb-4 border">
              <QueueGroupToggle eventKey="0">Movies</QueueGroupToggle>
              <Accordion.Collapse eventKey="0">
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
              </Accordion.Collapse>
            </ListGroup>
          </Accordion>

          <Accordion>
            <ListGroup className="mb-4 border">
              <QueueGroupToggle eventKey="1">TV</QueueGroupToggle>
              <Accordion.Collapse eventKey="1">
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
              </Accordion.Collapse>
            </ListGroup>
          </Accordion>

          <Accordion>
            <ListGroup className="mb-4 border">
              <QueueGroupToggle eventKey="2">Albums</QueueGroupToggle>
              <Accordion.Collapse eventKey="2">
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
              </Accordion.Collapse>
            </ListGroup>
          </Accordion>
        </Col>

        <Col>
          <h4>
            <br />
          </h4>

          <Accordion>
            <ListGroup className="mb-4 border">
              <QueueGroupToggle eventKey="3">Books</QueueGroupToggle>
              <Accordion.Collapse eventKey="3">
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
              </Accordion.Collapse>
            </ListGroup>
          </Accordion>

          <Accordion>
            <ListGroup className="mb-4 border">
              <QueueGroupToggle eventKey="4">Podcasts</QueueGroupToggle>
              <Accordion.Collapse eventKey="4">
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
              </Accordion.Collapse>
            </ListGroup>
          </Accordion>

          <Accordion>
            <ListGroup className="mb-4 border">
              <QueueGroupToggle eventKey="5">Games</QueueGroupToggle>
              <Accordion.Collapse eventKey="5">
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
              </Accordion.Collapse>
            </ListGroup>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}
