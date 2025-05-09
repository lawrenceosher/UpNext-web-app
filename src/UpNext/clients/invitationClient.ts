import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const INVITATIONS_API = `${REMOTE_SERVER}/api/invitation`;

/**
 * Sends an invitation to a user to join a group.
 * @param groupId The ID of the group for the invitation
 * @param invitedBy The username of the user sending the invitation
 * @param invitedUser The username of the user being invited
 * @returns The created invitation object
 */
export const sendInvitation = async (
  groupId: string,
  invitedBy: string,
  invitedUser: string
) => {
  const response = await axiosWithCredentials.post(`${INVITATIONS_API}`, {
    groupId,
    invitedBy,
    invitedUser,
  });
  return response.data;
};

/**
 * Retrieves a list of pending invitations for a given user.
 * @param username The username of the user whose invitations are to be fetched
 * @returns A list of pending invitations for the user
 */
export const getPendingInvitationsForUser = async (username: string) => {
  const response = await axiosWithCredentials.get(
    `${INVITATIONS_API}/${username}`
  );
  return response.data;
};

/**
 * Retrieves a list of pending invitations for a given group.
 * @param groupId The ID of the group whose invitations are to be fetched
 * @returns A list of pending invitations for the group
 */
export const getPendingInvitationsForGroup = async (groupId: string) => {
  {
    const response = await axiosWithCredentials.get(
      `${INVITATIONS_API}/group/${groupId}`
    );
    return response.data;
  }
};

/**
 * Responds to an invitation with the given ID.
 * @param invitationId The ID of the invitation to be responded to
 * @param hasAccepted A boolean indicating whether the invitation was accepted or declined
 * @returns The updated invitation object
 */
export const respondToInvitation = async (
  invitationId: string,
  hasAccepted: boolean
) => {
  const response = await axiosWithCredentials.put(
    `${INVITATIONS_API}/${invitationId}`,
    { status: hasAccepted ? "accepted" : "declined" }
  );
  return response.data;
};

/**
 * Deletes an invitation with the given ID.
 * @param invitationId The ID of the invitation to be deleted
 * @returns The deleted invitation object
 */
export const deleteSentInvitation = async (invitationId: string) => {
  const response = await axiosWithCredentials.delete(
    `${INVITATIONS_API}/${invitationId}`
  );
  return response.data;
};
