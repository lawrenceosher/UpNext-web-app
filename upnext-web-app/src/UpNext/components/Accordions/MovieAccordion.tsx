import { Accordion, ListGroup, ListGroupItem } from "react-bootstrap";
import QueueGroupToggle from "../QueueGroupToggle";
import { Movie } from "../../types/movie";
import { useNavigate } from "react-router-dom";

export default function MovieAccordion({ movies }: { movies: Movie[] }) {
  const navigate = useNavigate();

  return (
    <Accordion>
      <ListGroup className="mb-4 border">
        <QueueGroupToggle eventKey="0">Movies</QueueGroupToggle>
        <Accordion.Collapse eventKey="0">
          <ListGroup>
            {movies.map((movie: Movie, index: number) => (
              <ListGroupItem
                key={movie._id}
                className="rounded-0 bg-transparent text-white"
                onClick={() => navigate(`/UpNext/Movies/${movie._id}`)}
              >
                {index + 1}. {movie.title} ({movie.releaseDate.slice(0, 4)})
              </ListGroupItem>
            ))}
          </ListGroup>
        </Accordion.Collapse>
      </ListGroup>
    </Accordion>
  );
}
