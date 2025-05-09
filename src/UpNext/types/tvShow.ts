/**
 * Normalized TVShow type with data aggregated from TMDB (The Movie Database) API
 * - _id: Unique identifier for the TV show
 * - title: Title of the TV show
 * - posterPath: URL to the TV show's poster
 * - description: Brief summary or description of the TV show
 * - firstAirDate: Date when the TV show first aired
 * - lastAirDate: Date when the TV show last aired (optional)
 * - genres: List of genres associated with the TV show
 * - cast: List of actors in the TV show
 * - creator: Name of the creator or showrunner
 * - totalEpisodes: Total number of episodes in the TV show
 * - totalSeasons: Total number of seasons in the TV show
 */
export interface TVShow {
  _id: string;
  title: string;
  posterPath: string;
  description: string;
  firstAirDate: string;
  lastAirDate?: string;
  genres: string[];
  cast: string[];
  creator: string;
  totalEpisodes: number;
  totalSeasons: number;
}