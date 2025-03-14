import {
  Accordion,
  Carousel,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import QueueGroupToggle from "../Profile/QueueGroupToggle";

export default function Home() {
  return (
    <Container fluid>
      {/* Show what's trending for both anonymous user and logged in users */}

      <Carousel className="text-white">
        <Carousel.Item>
          <h1 className="mb-4">First slide</h1>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <h1>Second slide</h1>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <h1>Third slide</h1>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

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
