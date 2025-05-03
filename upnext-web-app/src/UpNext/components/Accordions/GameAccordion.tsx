import { Accordion, ListGroup, ListGroupItem } from "react-bootstrap";
import QueueGroupToggle from "../QueueGroupToggle";
import { VideoGame } from "../../types/game";
import { useNavigate } from "react-router-dom";

export default function GameAccordion({ games }: { games: VideoGame[] }) {
  const navigate = useNavigate();

  return (
    <Accordion>
      <ListGroup className="mb-4 border">
        <QueueGroupToggle eventKey="5">Games</QueueGroupToggle>
        <Accordion.Collapse eventKey="5">
          <ListGroup>
            {games.map((game: VideoGame, index: number) => (
              <ListGroupItem
                key={game._id}
                className="rounded-0 bg-transparent text-white"
                onClick={() => navigate(`/UpNext/Games/${game._id}`)}
              >
                {index + 1}. {game.title} ({game.releaseDate.slice(0, 4)})
              </ListGroupItem>
            ))}
          </ListGroup>
        </Accordion.Collapse>
      </ListGroup>
    </Accordion>
  );
}
