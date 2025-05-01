import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const INVITATIONS_API = `${REMOTE_SERVER}/api/invitation`;

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

export const getPendingInvitationsForUser = async (username: string) => {
  const response = await axiosWithCredentials.get(
    `${INVITATIONS_API}/${username}`
  );
  return response.data;
};

export const getPendingInvitationsForGroup = async (groupId: string) => {
  {
    const response = await axiosWithCredentials.get(
      `${INVITATIONS_API}/group/${groupId}`
    );
    return response.data;
  }
};

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

export const deleteSentInvitation = async (invitationId: string) => {
  const response = await axiosWithCredentials.delete(
    `${INVITATIONS_API}/${invitationId}`
  );
  return response.data;
};
