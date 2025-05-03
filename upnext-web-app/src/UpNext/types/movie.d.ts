/**
 * Normalized Movie type with data aggregated from TMDB (The Movie Database) API
 * - _id: Unique identifier for the movie
 * - title: Title of the movie
 * - director: Name of the director
 * - description: Brief summary or description of the movie
 * - releaseDate: Date when the movie was released
 * - posterPath: URL to the movie's poster
 * - runtime: Duration of the movie in minutes
 * - cast: List of actors in the movie
 * - genres: List of genres associated with the movie
 */
export interface Movie {
  _id: string;
  title: string;
  director: string;
  description: string;
  releaseDate: string;
  posterPath: string;
  runtime: number;
  cast: string[];
  genres: string[];
};