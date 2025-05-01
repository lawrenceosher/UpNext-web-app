/**
 * Represents user credentials for authentication.
 * - `username`: The unique username of the user.
 * - `password`: The user's password.
 */
export interface UserCredentials {
  username: string;
  password: string;
}

/**
 * Represents a user document, including user credentials and additional details.
 * - `username`: The unique username of the user.
 * - `password`: The user's password.
 * - `dateJoined`: The date when the user registered.
 */
export interface User extends UserCredentials {
  _id: string;
  dateJoined: Date;

}
