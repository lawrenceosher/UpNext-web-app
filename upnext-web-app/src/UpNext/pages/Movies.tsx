import { Col, Container, Row } from "react-bootstrap";
import MediaSearch from "../components/MediaSearch";

export default function Movies() {
  return (
    <Container className="text-center">
      <Row>
        <Col>Column</Col>
        <Col><MediaSearch /></Col>
      </Row>
    </Container>
  );
}
