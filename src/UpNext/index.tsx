/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, Navigate } from "react-router";
import UpNextHeader from "./layout/UpNextHeader";
import "../utils.css";
import UpNextNavigation from "./layout/Navigation";
import MovieDetails from "./pages/Movies/MovieDetails";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Session from "./auth/Session";
import ProtectedRoute from "./auth/ProtectedRoute";
import TVDetails from "./pages/TV/TVDetails";
import AlbumDetails from "./pages/Albums/AlbumDetails";
import BookDetails from "./pages/Books/BookDetails";
import PodcastDetails from "./pages/Podcasts/PodcastDetails";
import GameDetails from "./pages/Games/GameDetails";
import Movies from "./pages/Movies/Movies";
import TV from "./pages/TV/TV";
import Albums from "./pages/Albums/Albums";
import Books from "./pages/Books/Books";
import Podcasts from "./pages/Podcasts/Podcasts";
import Games from "./pages/Games/Games";
import { Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage } from "./redux/errorReducer";

export default function UpNext() {
  const { errorMessage } = useSelector((state: any) => state.errorReducer);
  const dispatch = useDispatch();

  return (
    <Session>
      <div>
        <UpNextHeader />
        <UpNextNavigation />
        <div className="main-content-offset">
          {errorMessage && (
            <div className="d-block z-3 vw-25 mx-auto position-absolute top-5 start-50 translate-middle">
              <Toast
                bg="danger"
                className="mt-5 mb-3 z-3"
                onClose={() => dispatch(clearErrorMessage())}
                show={!!errorMessage}
              >
                <Toast.Header>
                  <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body className="text-center">{errorMessage}</Toast.Body>
              </Toast>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Navigate to="/UpNext/Home" />} />
            <Route
              path="/Account/Profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/Account/Profile/:userId" element={<Profile />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/Movies/:movieId" element={<MovieDetails />} />
            <Route path="/TV" element={<TV />} />
            <Route path="/TV/:tvId" element={<TVDetails />} />
            <Route path="/Albums" element={<Albums />} />
            <Route path="/Albums/:albumId" element={<AlbumDetails />} />
            <Route path="/Books" element={<Books />} />
            <Route path="/Books/:bookId" element={<BookDetails />} />
            <Route path="/Podcasts" element={<Podcasts />} />
            <Route path="/Podcasts/:podcastId" element={<PodcastDetails />} />
            <Route path="/Games" element={<Games />} />
            <Route path="/Games/:gameId" element={<GameDetails />} />
            <Route path="/Users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
