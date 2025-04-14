import { Button, Col, Container, Row } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdHistory, MdOutlineDone, MdAdd } from "react-icons/md";

import MediaSearch from "../../components/MediaSearch";
import SummaryCard from "../../components/SummaryCard";

import "../../../utils.css";
import "./Movies.css";
import QueueList from "../../components/QueueList";
import { useState } from "react";

const dpWolverine = {
  src: "dpwolverine.jpg",
  title: "Deadpool and Wolverine",
  subtitle: "Directed by Shawn Levy",
  description:
    "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
};

export default function Movies() {
  const [queueHistorySelected, setQueueHistorySelected] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mt-2">Personal Queue</h2>
          <QueueList />
          <div className="d-flex justify-content-around">
            <Button
              id="action-button"
              size="lg"
              className={`mt-3 ${
                !queueHistorySelected ? "bg-light text-dark" : "purple-brand-bg"
              } border-0 w-25 align-items-center`}
              onClick={() => setQueueHistorySelected(false)}
            >
              <IoTrendingUpSharp className="me-1 mb-1 fs-4" /> Current
            </Button>
            <Button
              id="action-button"
              size="lg"
              className={`mt-3 ${
                queueHistorySelected ? "bg-light text-dark" : "purple-brand-bg"
              }  border-0 w-25`}
              onClick={() => setQueueHistorySelected(true)}
            >
              <MdHistory className="me-1 mb-1 fs-4" /> History
            </Button>
            <Button
              id="action-button"
              size="lg"
              className="mt-3 purple-brand-bg border-0 w-25"
            >
              <MdOutlineDone className="me-1 mb-1 fs-4" /> Submit
            </Button>
          </div>
        </Col>
        <Col>
          <MediaSearch mediaType="movie" />
          <SummaryCard
            src={dpWolverine.src}
            title={dpWolverine.title}
            subtitle={dpWolverine.subtitle}
            description={dpWolverine.description}
          />
          <Button
            size="lg"
            id="action-button"
            className="my-3 float-end purple-brand-bg border-0 w-25"
          >
            <MdAdd className="me-1 mb-1 fs-4" /> Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
