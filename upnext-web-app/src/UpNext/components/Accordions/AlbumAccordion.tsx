import { Accordion, ListGroup, ListGroupItem } from "react-bootstrap";
import QueueGroupToggle from "../../pages/Profile/QueueGroupToggle";
import { Album } from "../../types/album";
import { useNavigate } from "react-router-dom";

export default function AlbumAccordion({ albums }: { albums: Album[] }) {
  const navigate = useNavigate();

  return (
    <Accordion>
      <ListGroup className="mb-4 border">
        <QueueGroupToggle eventKey="2">Albums</QueueGroupToggle>
        <Accordion.Collapse eventKey="2">
          <ListGroup>
            {albums.map((album: Album, index: number) => (
              <ListGroupItem
                key={album._id}
                className="rounded-0 bg-transparent text-white"
                onClick={() => navigate(`/UpNext/Albums/${album._id}`)}
              >
                {index + 1}. {album.title} ({album.releaseDate.slice(0, 4)})
              </ListGroupItem>
            ))}
          </ListGroup>
        </Accordion.Collapse>
      </ListGroup>
    </Accordion>
  );
}
