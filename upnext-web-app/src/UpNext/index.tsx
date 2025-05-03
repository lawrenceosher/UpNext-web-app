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
import Queue from "./pages/Queue/Queue";
import AlbumDetails from "./pages/Albums/AlbumDetails";
import BookDetails from "./pages/Books/BookDetails";
import PodcastDetails from "./pages/Podcasts/PodcastDetails";
import GameDetails from "./pages/Games/GameDetails";

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
            <Route path="/Movies" element={<Queue mediaType="Movie" />} />
            <Route path="/Movies/:movieId" element={<MovieDetails />} />
            <Route path="/TV" element={<Queue mediaType="TV" />} />
            <Route path="/TV/:tvId" element={<TVDetails />} />
            <Route path="/Albums" element={<Queue mediaType="Album" />} />
            <Route path="/Albums/:albumId" element={<AlbumDetails />} />
            <Route path="/Books" element={<Queue mediaType="Book" />} />
            <Route path="/Books/:bookId" element={<BookDetails />} />
            <Route path="/Podcasts" element={<Queue mediaType="Podcast" />} />
            <Route path="/Podcasts/:podcastId" element={<PodcastDetails />} />
            <Route path="/Games" element={<Queue mediaType="VideoGame" />} />
            <Route path="/Games/:gameId" element={<GameDetails />} />
            <Route path="/Users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
