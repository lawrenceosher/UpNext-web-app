// Normalized Album type with data aggregated from the Spotify API
export interface Album {
  _id: string;
  name: string;
  artist: string;
  label: string;
  totalTracks: number;
  coverArt: string;
  releaseDate: string;
  tracks: string[];
}

// Response from UpNext API
export type AlbumResponse = Album | { error: string };