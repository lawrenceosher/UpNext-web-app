/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Row } from "react-bootstrap";
import "./Home.css";
import { useSelector } from "react-redux";
import CurrentPersonalQueues from "../../components/CurrentPersonalQueues";
import TrendingMedia from "../../components/TrendingMedia";
import useTrending from "../../hooks/useTrending";
import useCurrentQueues from "../../hooks/useCurrentQueues";

/**
 * Home component that displays the trending media and current personal queues.
 * It retrieves the current user and their queues, as well as the trending media
 * for both anonymous users and logged-in users.
 * @returns A component that displays the trending media and current personal queues.
 */
export default function Home() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { currentQueues } = useCurrentQueues(currentUser);
  const {
    popularMovies,
    popularTV,
    popularAlbums,
    popularBooks,
    popularPodcasts,
    popularGames,
  } = useTrending();

  return (
    <Container fluid>
      {/* Show what's trending for both anonymous user and logged in users */}
      <h1>Trending</h1>
      <TrendingMedia
        popularMovies={popularMovies}
        popularTV={popularTV}
        popularAlbums={popularAlbums}
        popularBooks={popularBooks}
        popularPodcasts={popularPodcasts}
        popularGames={popularGames}
      />

      {/* Only show Current Personal Queues if logged in and not anonymous user*/}
      {currentUser && (
        <>
          <Row className="mt-3">
            <h1>Current Personal Queues</h1>
          </Row>
          <CurrentPersonalQueues currentQueues={currentQueues} />
        </>
      )}
    </Container>
  );
}
