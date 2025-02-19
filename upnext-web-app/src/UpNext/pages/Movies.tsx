import { Col, Container, Row } from "react-bootstrap";
import MediaSearch from "../components/MediaSearch";
import SummaryCard from "../components/SummaryCard";

export default function Movies() {
  return (
    <Container className="text-center">
      <Row>
        <Col>Column</Col>
        <Col>
          <MediaSearch />
          <SummaryCard />
        </Col>
      </Row>
    </Container>
  );
}
