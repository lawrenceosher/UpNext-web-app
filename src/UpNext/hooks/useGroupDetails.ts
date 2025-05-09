/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { User } from "../types/user";
import * as groupClient from "../clients/groupClient";
import * as userClient from "../clients/userClient";
import * as invitationClient from "../clients/invitationClient";

/**
 * Manages group details and user invitations.
 * It provides functions to send, cancel invitations, and remove group members.
 * It also fetches all users and pending invitations for the group.
 * @param groupDetails The details of the group being managed.
 * @param setGroupDetails Function to update the group details.
 * @returns An object containing all users, editing state, and functions to manage invitations and group members.
 */
const useGroupDetails = (
  groupDetails: any,
  setGroupDetails: (group: any) => void
) => {
  // All users in the application besides the currently logged in user
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // State to manage the editing state of the group name
  // This is used to toggle the edit mode for the group name
  const [isEditing, setIsEditing] = useState(false);

  // State to manage the invited users
  // This is used to keep track of users who have been invited to the group
  // and are waiting for their response
  const [invitedUsers, setInvitedUsers] = useState<any>([]);

  const sendNewInvitationToGroup = async (
    groupId: string,
    invitedUser: string
  ) => {
    try {
      const sentInvitation = await invitationClient.sendInvitation(
        groupId,
        groupDetails.creator,
        invitedUser
      );

      setInvitedUsers((prevInvitations: any) => [
        ...prevInvitations,
        sentInvitation,
      ]);
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  const cancelSentInvitation = async (invitationId: string) => {
    try {
      await invitationClient.deleteSentInvitation(invitationId);

      setInvitedUsers((prevInvitations: any) =>
        prevInvitations.filter((invite: any) => invite._id !== invitationId)
      );
    } catch (error) {
      console.error("Error canceling invitation:", error);
    }
  };

  const removeGroupMember = async (username: string) => {
    try {
      await groupClient.removeGroupMember(groupDetails._id, username);

      setGroupDetails((prevGroup: any) => ({
        ...prevGroup,
        members: prevGroup.members.filter(
          (member: string) => member !== username
        ),
      }));

      // Remove the user from the invited users list if they are present since need to reset their invitations if removed from the group
      setInvitedUsers((prevInvitations: any) =>
        prevInvitations.filter((invite: any) => invite.invitedUser !== username)
      );
    } catch (error) {
      console.error("Error removing group member:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userClient.getAllUsers();

        // Filter out the current user and group members from the list of all users
        const filteredUsers = users.filter(
          (user: any) => !groupDetails.members.includes(user.username)
        );

        setAllUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setAllUsers([]);
      }
    };

    fetchUsers();
  }, [groupDetails.creator, groupDetails.members]);

  useEffect(() => {
    const fetchPendingInvitationsForGroup = async () => {
      try {
        const invitations =
          await invitationClient.getPendingInvitationsForGroup(
            groupDetails._id
          );

        setInvitedUsers(invitations);
      } catch (error) {
        console.error("Error fetching pending invitations:", error);
      }
    };

    fetchPendingInvitationsForGroup();
  }, [groupDetails._id]);

  return {
    allUsers,
    isEditing,
    setIsEditing,
    sendNewInvitationToGroup,
    cancelSentInvitation,
    removeGroupMember,
    invitedUsers,
    setInvitedUsers,
  };
};

export default useGroupDetails;
