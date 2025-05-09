/**
 * Represents a user for the application.
 * - `_id`: The unique id of the user.
 * - `username`: The unique username of the user.
 * - `password`: The user's password.
 * - `dateJoined`: The date when the user registered.
 */
export interface User {
  _id: string;
  username: string;
  password: string;
  dateJoined: Date;
}
