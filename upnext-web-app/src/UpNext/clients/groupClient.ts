import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const GROUPS_API = `${REMOTE_SERVER}/api/groups`;

export const getAllGroups = async () => {
  const response = await axiosWithCredentials.get(`${GROUPS_API}`);
  return response.data;
};

export const createGroup = async (groupName: string, users: string[]) => {
  const response = await axiosWithCredentials.post(`${GROUPS_API}`, {
    groupName,
    users,
  });
  return response.data;
}