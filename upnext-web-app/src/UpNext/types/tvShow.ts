// Normalized TVShow type with data aggregated from TMDB (The Movie Database) API 
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

// Response from UpNext API
export type TVShowResponse = TVShow | { error: string };