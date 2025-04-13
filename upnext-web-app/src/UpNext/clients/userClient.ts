/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signin = async (credentials: any) => {
  try {
    const response = await axiosWithCredentials.post(
      `${USERS_API}/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Error during sign-in:", error);
    return null;
  }
};

export const signout = async () => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/logout`);
    return response.data;
  } catch (error) {
    console.error("Error during sign-out:", error);
    return null;
  }
};

export const getAllUsers = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}`);
  return response.data;
}

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
}

export const getProfile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
}

export const getUserById = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
  return response.data;
}

export const updateUser = async (userId: string, user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${userId}`, user);
  return response.data;
}
