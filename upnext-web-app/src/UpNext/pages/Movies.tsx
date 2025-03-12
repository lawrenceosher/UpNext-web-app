import { Button, Col, Container, Row } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdHistory, MdOutlineDone, MdAdd } from "react-icons/md";

import MediaSearch from "../components/MediaSearch";
import SummaryCard from "../components/SummaryCard";

import "../../utils.css";
import "./Movies.css";
import ListGroupSelect from "../components/ListGroupSelect";
import QueueList from "../components/QueueList";
import { useState } from "react";

export default function Movies() {
  const [queueHistorySelected, setQueueHistorySelected] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <ListGroupSelect />
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
          <MediaSearch />
          <SummaryCard />
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
