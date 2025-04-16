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
            <Route path="/Books/:bookId" element={<h1>Book Details Page</h1>} />
            <Route path="/Podcasts" element={<h1>Podcasts</h1>} />
            <Route
              path="/Podcasts/:podcastId"
              element={<h1>Podcast Details Page</h1>}
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
