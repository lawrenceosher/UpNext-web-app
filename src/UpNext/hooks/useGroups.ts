import { useState, useEffect } from "react";
import { Group } from "../types/group";
import { User } from "../types/user";
import * as groupClient from "../clients/groupClient";

/**
 * Manages the state and actions related to groups such as fetching all groups, creating a new group,
 * deleting a group, and updating group details.
 * It also handles the visibility of various modals for group management.
 * @param currentUser The current user that is logged in
 * @returns An object containing the state and functions to manage groups.
 */
const useGroups = (currentUser: User) => {
  // All groups that the user is a member of
  // This includes groups that the user has created and groups that the user is a member of
  const [groups, setGroups] = useState<Group[]>([]);

  // New group that the user is creating
  const [newGroup, setNewGroup] = useState({
    name: "",
    creator: currentUser ? currentUser.username : "",
  });

  // Group that is being edited in the modal
  const [groupForModal, setGroupForModal] = useState<Group>({
    name: "",
    _id: "",
    creator: "",
    members: [],
  });

  // State for delete group modal
  const [showDeleteGroup, setShowDeleteGroup] = useState(false);
  const handleCloseDeleteGroup = () => setShowDeleteGroup(false);
  const handleShowDeleteGroup = () => setShowDeleteGroup(true);

  // State for create group modal
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const handleCloseCreateGroup = () => setShowCreateGroup(false);
  const handleShowCreateGroup = () => setShowCreateGroup(true);

  // State for group details modal
  const [showGroupDetailsModal, setShowGroupDetailsModal] = useState(false);
  const handleCloseGroupDetailsModal = () => setShowGroupDetailsModal(false);
  const handleShowGroupDetailsModal = () => setShowGroupDetailsModal(true);

  // State for leave group modal
  const [showLeaveGroupModal, setShowLeaveGroupModal] = useState(false);
  const handleCloseLeaveGroupModal = () => setShowLeaveGroupModal(false);
  const handleShowLeaveGroupModal = () => setShowLeaveGroupModal(true);

  const handleCreateGroup = async () => {
    try {
      const createdGroup = await groupClient.createGroup(
        newGroup.name,
        newGroup.creator
      );
      setGroups((prevGroups) => [...prevGroups, createdGroup]);

      // Reset newGroup state after creating a group
      setNewGroup({
        name: "",
        creator: currentUser ? currentUser.username : "",
      });

      // Close the create group modal
      handleCloseCreateGroup();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await groupClient.deleteGroup(groupId);

      setGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupId)
      );
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const handleUpdateGroup = async () => {
    try {
      const updatedGroupData = await groupClient.updateGroup(
        groupForModal._id,
        groupForModal.name
      );

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupForModal._id ? updatedGroupData : group
        )
      );
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  // Leave a group or remove a group member
  const handleLeaveGroup = async (groupId: string) => {
    try {
      await groupClient.removeGroupMember(groupId, currentUser.username);

      setGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupId)
      );
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        if (!currentUser) return;

        const groupRes = await groupClient.getGroupsForUser(
          currentUser.username
        );

        setGroups(groupRes);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    
    fetchGroups();
  }, [currentUser, groupForModal]);

  return {
    groups,
    setGroups,
    newGroup,
    setNewGroup,
    groupForModal,
    setGroupForModal,
    showDeleteGroup,
    handleCloseDeleteGroup,
    handleShowDeleteGroup,
    showCreateGroup,
    handleCloseCreateGroup,
    handleShowCreateGroup,
    showGroupDetailsModal,
    handleCloseGroupDetailsModal,
    handleShowGroupDetailsModal,
    showLeaveGroupModal,
    handleCloseLeaveGroupModal,
    handleShowLeaveGroupModal,
    handleCreateGroup,
    handleDeleteGroup,
    handleUpdateGroup,
    handleLeaveGroup,
  };
};

export default useGroups;
