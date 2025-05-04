import { useState, useEffect } from "react";
import { Group } from "../types/group";
import * as groupClient from "../clients/groupClient";
import { User } from "../types/user";

/**
 * Manage the selection of groups for a user.
 * It fetches the list of groups for the current user and provides
 * a function to handle group selection changes.
 * @param currentUser - The current user object
 * @param setSelectedGroup - Function to set the selected group ID
 * @returns An object containing the list of groups and a function to handle group changes
 */
const useListGroupSelect = (
  currentUser: User | undefined,
  setSelectedGroup: (groupId: string) => void
) => {
  // State to hold the list of groups for the current user
  const [groupsForUser, setGroupsForUser] = useState<Group[]>([]);

  // Function to handle the change in selected group from the dropdown
  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(event.target.value);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      if (!currentUser) return;
      try {
        const groups = await groupClient.getGroupsForUser(currentUser.username);
        setGroupsForUser(groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
        setGroupsForUser([]);
      }
    };
    fetchGroups();
  }, [currentUser]);

  return { groupsForUser, handleGroupChange };
};

export default useListGroupSelect;
