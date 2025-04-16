import { Routes, Route, Navigate } from "react-router";
import UpNextHeader from "./layout/UpNextHeader";
import "../utils.css";
import UpNextNavigation from "./layout/Navigation";
import Movies from "./pages/Movies/Movies";
import MovieDetails from "./pages/Movies/MovieDetails";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Session from "./auth/Session";
import ProtectedRoute from "./auth/ProtectedRoute";
import TV from "./pages/TV/TV";
import TVDetails from "./pages/TV/TVDetails";
import Albums from "./pages/Albums/Albums";
import AlbumDetails from "./pages/Albums/AlbumDetails";
import Books from "./pages/Books/Books";
import BookDetails from "./pages/Books/BookDetails";
import Podcasts from "./pages/Podcasts/Podcasts";
import PodcastDetails from "./pages/Podcasts/PodcastDetails";

export default function UpNext() {
  return (
    <Session>
      <div>
        <UpNextHeader />
        <UpNextNavigation />
        <div className="main-content-offset">
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
            <Route
              path="/Podcasts/:podcastId"
              element={<PodcastDetails />}
            />
            <Route path="/Games" element={<h1>Video Games</h1>} />
            <Route
              path="/Games/:gameId"
              element={<h1>Video Game Details Page</h1>}
            />
            <Route path="/Users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
