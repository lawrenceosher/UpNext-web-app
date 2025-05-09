/**
 * Normalized VideoGame type with data aggregated from the IGDB API
 * - _id: Unique identifier for the video game
 * - title: Title of the video game
 * - summary: Brief summary or description of the video game
 * - releaseDate: Date when the video game was released
 * - coverArt: URL to the video game's cover art
 * - genres: List of genres associated with the video game
 * - companies: List of companies involved in the development or publishing of the video game
 * - platforms: List of platforms on which the video game is available
 */
export interface VideoGame {
  _id: string;
  title: string;
  summary: string;
  releaseDate: string;
  coverArt: string;
  genres: string[];
  companies: string[];
  platforms: string[];
}
