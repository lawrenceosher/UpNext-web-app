import {
  Accordion,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import QueueGroupToggle from "../Profile/QueueGroupToggle";
import "./Home.css";

export default function Home() {
  return (
    <Container fluid>
      {/* Show what's trending for both anonymous user and logged in users */}

      <h1>Trending</h1>

      {/* Only show Current Personal Queues if logged in and not anonymous user*/}
      <Row className="mt-5">
        <h1>Current Personal Queues</h1>
      </Row>
      <Row className="mt-3">
        <Col>
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
        </Col>
        <Col>
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
        </Col>
        <Col>
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
      </Row>
      <Row>
        <Col>
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
        </Col>
        <Col>
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
        </Col>
        <Col>
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
