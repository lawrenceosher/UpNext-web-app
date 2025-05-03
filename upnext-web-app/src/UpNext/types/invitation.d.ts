import { Group } from "./group";

/**
 * Represents an invitation to a group. This can be sent to users to join a specific group.
 * - `_id`: The unique id of the invitation.
 * - `group`: The group that the user is invited to.
 * - `invitedBy`: The username of the user who sent the invitation.
 * - `invitedUser`: The username of the user who is invited.
 * - `status`: The status of the invitation. Can be "pending", "accepted", or "rejected".
 * - `createdAt`: The date when the invitation was created.
 * - `updatedAt`: The date when the invitation was last updated.
 */
export interface Invitation {
  _id: string;
  group: Group;
  invitedBy: string;
  invitedUser: string;
  status: string; // "pending" | "accepted" | "rejected"
  createdAt: string;
  updatedAt: string;
}
