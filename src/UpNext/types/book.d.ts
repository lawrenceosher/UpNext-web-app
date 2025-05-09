/**
 * Normalized book object with data aggregated from the Google Books API
 * - `_id`: Unique identifier for the book
 * - `title`: Title of the book
 * - `authors`: List of authors who wrote the book
 * - `synopsis`: Brief summary or description of the book
 * - `publisher`: Name of the publisher that published the book
 * - `coverArt`: URL to the book's cover art
 * - `datePublished`: Date when the book was published
 * - `pages`: Number of pages in the book
 */
export interface Book {
  _id: string;
  title: string;
  authors: string[];
  synopsis: string;
  publisher: string;
  coverArt: string;
  datePublished: string;
  pages: number;
}
