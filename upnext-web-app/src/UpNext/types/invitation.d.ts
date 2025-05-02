import { Group } from "./group";

export interface Invitation {
  _id: string;
  group: Group;
  invitedBy: string;
  invitedUser: string;
  status: string; // "pending" | "accepted" | "rejected"
  createdAt: string;
  updatedAt: string;
}
