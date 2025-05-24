/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Container, Form, Row } from "react-bootstrap";
import "./Home.css";
import { useSelector } from "react-redux";
import TrendingMedia from "../../components/TrendingMedia";
import useTrending from "../../hooks/useTrending";
import useCurrentQueues from "../../hooks/useCurrentQueues";
import MovieAccordion from "../../components/Accordions/MovieAccordion";
import TVAccordion from "../../components/Accordions/TVAccordion";
import AlbumAccordion from "../../components/Accordions/AlbumAccordion";
import BookAccordion from "../../components/Accordions/BookAccordion";
import PodcastAccordion from "../../components/Accordions/PodcastAccordion";
import GameAccordion from "../../components/Accordions/GameAccordion";

/**
 * Home component that displays the trending media and current personal queues.
 * It retrieves the current user and their queues, as well as the trending media
 * for both anonymous users and logged-in users. Default landing page for the app.
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
    currentTrendingCategory,
    handleSelectTrendingCategory,
    categories,
  } = useTrending();

  return (
    <Container fluid>
      {/* Show what's trending for both anonymous user and logged in users */}
      <div className="d-flex align-items-center">
        <h1>Trending</h1>
        <Form.Select
          id="category-select"
          className="ms-3"
          value={currentTrendingCategory}
          onChange={handleSelectTrendingCategory}
        >
          {categories.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
      </div>

      <TrendingMedia
        popularMovies={popularMovies}
        popularTV={popularTV}
        popularAlbums={popularAlbums}
        popularBooks={popularBooks}
        popularPodcasts={popularPodcasts}
        popularGames={popularGames}
        currentTrendingCategory={currentTrendingCategory}
      />

      {/* Only show Current Personal Queues if logged in and not anonymous user*/}
      {currentUser && (
        <>
          <Row className="mt-3">
            <h1>Current Personal Queues</h1>
          </Row>

          {/* Display the current personal queues for the user */}
          <Row className="mt-3">
            <Col xs={12} md={4}>
              <MovieAccordion movies={currentQueues.movies} />
            </Col>
            <Col xs={12} md={4}>
              <TVAccordion shows={currentQueues.tv} />
            </Col>
            <Col xs={12} md={4}>
              <AlbumAccordion albums={currentQueues.albums} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <BookAccordion books={currentQueues.books} />
            </Col>
            <Col xs={12} md={4}>
              <PodcastAccordion podcasts={currentQueues.podcasts} />
            </Col>
            <Col xs={12} md={4}>
              <GameAccordion games={currentQueues.games} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
