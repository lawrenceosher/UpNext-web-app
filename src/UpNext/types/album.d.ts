/**
 *  Normalized Album type with data aggregated from the Spotify API 
 * - _id: Unique identifier for the album
 * - title: Title of the album
 * - artist: Name of the artist or band
 * - label: Record label that released the album
 * - coverArt: URL to the album's cover art
 * - releaseDate: Date when the album was released
 * - tracks: List of track titles in the album
 * */

export interface Album {
  _id: string;
  title: string;
  artist: string;
  label: string;
  coverArt: string;
  releaseDate: string;
  tracks: string[];
}