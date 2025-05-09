import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const GROUPS_API = `${REMOTE_SERVER}/api/groups`;

/**
 * Creates a new group with the given name and creator.
 * @param groupName The name of the group to be created
 * @param creator The username of the user creating the group
 * @returns The created group object
 */
export const createGroup = async (groupName: string, creator: string) => {
  const response = await axiosWithCredentials.post(`${GROUPS_API}`, {
    groupName,
    creator,
  });
  return response.data;
};

/**
 * Deletes a group with the given ID.
 * @param groupId The ID of the group to be deleted
 * @returns The deleted group object
 */
export const deleteGroup = async (groupId: string) => {
  const response = await axiosWithCredentials.delete(
    `${GROUPS_API}/${groupId}`
  );
  return response.data;
};

/**
 * Updates the name of a group with the given ID.
 * @param groupId The ID of the group to be updated
 * @param groupName The new name of the group
 * @returns The updated group object
 */
export const updateGroup = async (
  groupId: string,
  groupName: string,
) => {
  const response = await axiosWithCredentials.put(`${GROUPS_API}/${groupId}`, {
    name: groupName,
  });
  return response.data;
};

/**
 * Retrieves a list of groups for a given user.
 * @param username The username of the user whose groups are to be fetched
 * @returns A list of groups the user is a member of
 */
export const getGroupsForUser = async (username: string) => {
  const response = await axiosWithCredentials.get(`${GROUPS_API}/${username}`);
  return response.data;
};

/**
 * Removes a user from a group with the given ID. Also used for a user to leave a group.
 * @param groupId The ID of the group to be updated
 * @param username The username of the user to be removed
 * @returns The updated group object
 */
export const removeGroupMember = async (groupId: string, username: string) => {
  const response = await axiosWithCredentials.put(`${GROUPS_API}/${groupId}/remove`, {
    username,
  });
  return response.data;
}
