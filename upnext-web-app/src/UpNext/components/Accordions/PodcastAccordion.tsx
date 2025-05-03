import { Accordion, ListGroup, ListGroupItem } from "react-bootstrap";
import QueueGroupToggle from "../QueueGroupToggle";
import { Podcast } from "../../types/podcast";
import { useNavigate } from "react-router-dom";

export default function PodcastAccordion({
  podcasts,
}: {
  podcasts: Podcast[];
}) {
  const navigate = useNavigate();

  return (
    <Accordion>
      <ListGroup className="mb-4 border">
        <QueueGroupToggle eventKey="4">Podcasts</QueueGroupToggle>
        <Accordion.Collapse eventKey="4">
          <ListGroup>
            {podcasts.map((podcast: Podcast, index: number) => (
              <ListGroupItem
                key={podcast._id}
                className="rounded-0 bg-transparent text-white"
                onClick={() => navigate(`/UpNext/Podcasts/${podcast._id}`)}
              >
                {index + 1}. {podcast.title} (
                {podcast.latestEpisodeDate.slice(0, 4)})
              </ListGroupItem>
            ))}
          </ListGroup>
        </Accordion.Collapse>
      </ListGroup>
    </Accordion>
  );
}
