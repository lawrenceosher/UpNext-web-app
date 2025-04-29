import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const GROUPS_API = `${REMOTE_SERVER}/api/groups`;

export const getAllGroups = async () => {
  const response = await axiosWithCredentials.get(`${GROUPS_API}`);
  return response.data;
};

export const createGroup = async (groupName: string, creator: string) => {
  const response = await axiosWithCredentials.post(`${GROUPS_API}`, {
    groupName,
    creator,
  });
  return response.data;
};

export const deleteGroup = async (groupId: string) => {
  const response = await axiosWithCredentials.delete(
    `${GROUPS_API}/${groupId}`
  );
  return response.data;
};

export const updateGroup = async (
  groupId: string,
  groupName: string,
  users: string[]
) => {
  const response = await axiosWithCredentials.put(`${GROUPS_API}/${groupId}`, {
    groupName,
    users,
  });
  return response.data;
};

export const getGroupsForUser = async (username: string) => {
  const response = await axiosWithCredentials.get(`${GROUPS_API}/${username}`);
  return response.data;
};
