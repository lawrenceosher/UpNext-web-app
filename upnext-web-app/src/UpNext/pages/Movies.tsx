import { Button, Col, Container, Row } from "react-bootstrap";
import MediaSearch from "../components/MediaSearch";
import SummaryCard from "../components/SummaryCard";

import "../../utils.css";

export default function Movies() {
  return (
    <Container>
      <Row>
        <Col>Column</Col>
        <Col>
          <MediaSearch />
          <SummaryCard />
          <Button
            size="lg"
            className="mt-3 float-end purple-brand-bg border-0 w-25"
          >
            + Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
