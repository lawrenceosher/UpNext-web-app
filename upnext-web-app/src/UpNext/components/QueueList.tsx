import { FormCheck, ListGroup } from "react-bootstrap";
import { CiCircleRemove } from "react-icons/ci";
import "./QueueList.css";

export default function QueueList() {
  return (
    <ListGroup className="mt-4 fs-4" id="queue">
      <ListGroup.Item className="d-flex align-items-center" id="queue-item">
        <FormCheck
          type="checkbox"
          label="Pacific Rim"
          className="flex-grow-1"
        />
        <CiCircleRemove className="fs-2" />
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center" id="queue-item">
        <FormCheck
          type="checkbox"
          label="Ferris Bueller's Day Off"
          className="flex-grow-1"
        />
        <CiCircleRemove className="fs-2" />
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center" id="queue-item">
        <FormCheck
          type="checkbox"
          label="Mad Max Fury Road"
          className="flex-grow-1"
        />
        <CiCircleRemove className="fs-2" />
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center" id="queue-item">
        <FormCheck
          type="checkbox"
          label="Big Lebowski"
          className="flex-grow-1"
        />
        <CiCircleRemove className="fs-2" />
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center" id="queue-item">
        <FormCheck type="checkbox" label="Rango" className="flex-grow-1" />
        <CiCircleRemove className="fs-2" />
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center" id="queue-item">
        <FormCheck
          type="checkbox"
          label="Mad Max Fury Road"
          className="flex-grow-1"
        />
        <CiCircleRemove className="fs-2" />
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center" id="queue-item">
        <FormCheck
          type="checkbox"
          label="Big Lebowski"
          className="flex-grow-1"
        />
        <CiCircleRemove className="fs-2" />
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center" id="queue-item">
        <FormCheck type="checkbox" label="Rango" className="flex-grow-1" />
        <CiCircleRemove className="fs-2" />
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center" id="queue-item">
        <FormCheck
          type="checkbox"
          label="Mad Max Fury Road"
          className="flex-grow-1"
        />
        <CiCircleRemove className="fs-2" />
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center" id="queue-item">
        <FormCheck
          type="checkbox"
          label="Big Lebowski"
          className="flex-grow-1"
        />
        <CiCircleRemove className="fs-2" />
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center" id="queue-item">
        <FormCheck type="checkbox" label="Rango" className="flex-grow-1" />
        <CiCircleRemove className="fs-2" />
      </ListGroup.Item>
    </ListGroup>
  );
}
