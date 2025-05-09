import { Accordion, ListGroup, ListGroupItem } from "react-bootstrap";
import QueueGroupToggle from "../QueueGroupToggle";
import { TVShow } from "../../types/tvShow";
import { useNavigate } from "react-router-dom";

/**
 * Displays a list of TV shows in an accordion format.
 * Each show is clickable and navigates to the show's details page.
 *
 * @param {TVShow[]} shows - Array of TV show objects to display.
 */
export default function TVAccordion({ shows }: { shows: TVShow[] }) {
  const navigate = useNavigate();

  return (
    <Accordion>
      <ListGroup className="mb-4 border">
        <QueueGroupToggle eventKey="1">TV</QueueGroupToggle>
        <Accordion.Collapse eventKey="1">
          <ListGroup>
            {shows.map((tv: TVShow, index: number) => (
              <ListGroupItem
                key={tv._id}
                className="rounded-0 bg-transparent text-white"
                onClick={() => navigate(`/UpNext/TV/${tv._id}`)}
              >
                {index + 1}. {tv.title} ({tv.firstAirDate.slice(0, 4)})
              </ListGroupItem>
            ))}
          </ListGroup>
        </Accordion.Collapse>
      </ListGroup>
    </Accordion>
  );
}
