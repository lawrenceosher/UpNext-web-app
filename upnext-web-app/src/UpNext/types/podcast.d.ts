/**
 * Normalized Podcast type with data aggregated from the Spotify API
 * - _id: Unique identifier for the podcast
 * - title: Title of the podcast
 * - description: Brief summary or description of the podcast
 * - coverArt: URL to the podcast's cover art
 * - publisher: Name of the publisher or creator of the podcast
 * - episodes: List of episode titles in the podcast
 * - latestEpisodeDate: Date when the latest episode was released
 */
export interface Podcast {
  _id: string;
  title: string;
  description: string;
  coverArt: string;
  publisher: string;
  episodes: string[];
  latestEpisodeDate: string;
}
