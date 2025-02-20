import { Button, Col, Container, Row } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdHistory } from "react-icons/md";

import MediaSearch from "../components/MediaSearch";
import SummaryCard from "../components/SummaryCard";

import "../../utils.css";
import "./Movies.css";
import ListGroupSelect from "../components/ListGroupSelect";
import QueueList from "../components/QueueList";

export default function Movies() {
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
              className="mt-3 purple-brand-bg border-0 w-25 align-items-center"
            >
              <IoTrendingUpSharp className="me-1 mb-1 fs-4" /> Current
            </Button>
            <Button
              id="action-button"
              size="lg"
              className="mt-3 purple-brand-bg border-0 w-25"
            >
              <MdHistory className="me-1 mb-1 fs-4" /> History
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
            + Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
