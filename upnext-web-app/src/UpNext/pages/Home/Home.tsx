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
import SummaryCard from "../../components/SummaryCard";
import "./Home.css";

const dpWolverine = {
  src: "dpwolverine.jpg",
  title: "Deadpool and Wolverine",
  subtitle: "Directed by Shawn Levy",
  description:
    "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
};

const penguin = {
  src: "penguin.jpg",
  title: "The Penguin",
  subtitle: "Directed by Matt Reeves",
  description:
    "Witness the The Penguin's rise to power in Gotham's criminal underworld in the aftermath of the Riddler killings.",
};

const randomAccessMemories = {
  src: "randomAccessMemories.png",
  title: "Random Access Memories",
  subtitle: "Daft Punk",
  description:
    "Random Access Memories, the fourth and final studio album by Daft Punk, released in 2013, is a tribute to the sounds of late 1970s and early 1980s American music, particularly from Los Angeles, and features guest vocals from artists like Pharrell Williams and Giorgio Moroder. ",
};

export default function Home() {
  return (
    <Container fluid>
      {/* Show what's trending for both anonymous user and logged in users */}

      <h1>Trending</h1>
      <Carousel className="text-white mh-50">
        <Carousel.Item>
          <div className="w-50 mb-5">
            <SummaryCard
              src={penguin.src}
              title={penguin.title}
              subtitle={penguin.subtitle}
              description={penguin.description}
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="w-50 mb-5">
            <SummaryCard
              src={dpWolverine.src}
              title={dpWolverine.title}
              subtitle={dpWolverine.subtitle}
              description={dpWolverine.description}
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="w-50 mb-5">
            <SummaryCard
              src={randomAccessMemories.src}
              title={randomAccessMemories.title}
              subtitle={randomAccessMemories.subtitle}
              description={randomAccessMemories.description}
            />
          </div>
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
