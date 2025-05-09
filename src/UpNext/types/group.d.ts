/**
 * Represents a group composed of multiple users. These groups can be used to share media queues and recommendations.
 * - `_id`: The unique id of the group.
 * - `name`: The name of the group.
 * - `creator`: The username of the user who created the group.
 * - `members`: An array of users who are members of the group.
 */
export interface Group {
  _id: string;
  name: string;
  creator: string;
  members: User[];
}
