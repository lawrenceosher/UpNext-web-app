import { Form } from "react-bootstrap";

export default function ListGroupSelect() {
  return (
    <Form.Select aria-label="Default select example" size="lg">
      <option value="Personal">Personal</option>
      <option value="Family">Family</option>
      <option value="Friends">Friends</option>
    </Form.Select>
  );
}
