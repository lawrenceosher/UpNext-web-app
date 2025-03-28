// Normalized Podcast type with data aggregated from the Spotify API
export interface Podcast {
  _id: string;
  title: string;
  description: string;
  totalEpisodes: number;
  coverArt: string;
  publisher: string;
  episodes: string[];
}

// Response from UpNext API
export type PodcastResponse = Podcast | { error: string };
