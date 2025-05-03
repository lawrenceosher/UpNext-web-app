import { Movie } from "./Movie";
import { TVShow } from "./tvShow";
import { Album } from "./album";
import { Book } from "./book";
import { Podcast } from "./podcast";
import { VideoGame } from "./game";

// Union type for the different types of media that can be enqueued
export type MediaItem = Movie | TVShow | Album | Book | Podcast | VideoGame;

/**
 * Represents a list of media items that users have yet to watch or have watched.
 * - `_id`: The unique id of the queue.
 * - `mediaType`: The type of media corresponding to the queue. Either 'Movie', 'TV Show', 'Album', 'Book', 'Podcast', or 'Video Game'.
 * - `users`: The users that this Queue belongs to. Can either be a single user or multiple if the group is defined. Represented as an array of unique usernames.
 * - `group`: Optional field that contains the ID of the group if this is a group queue.
 * - `current`: A list of the current media items the user has yet to watch.
 * - `history`: A list of the past media items that the user has already watched.
 */
export interface Queue {
  _id: string;
  mediaType: string;
  users: string[];
  group?: string;
  current: MediaItem[];
  history: MediaItem[];
}
