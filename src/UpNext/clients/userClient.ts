/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

/**
 * Creates a new user with the given information.
 * @param user The user object containing the user's information
 * @returns The created user object
 */
export const signup = async (user: any) => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.data}`);
    }
  }
};

/**
 * Logs in a user with the given credentials.
 * @param credentials The credentials object containing the user's login information
 * @returns The logged-in user object
 */
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

/**
 * Logs out the currently logged-in user.
 * @returns The logged-in user object
 */
export const signout = async () => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
  } catch (error) {
    console.error("Error during sign-out:", error);
    return null;
  }
};

/**
 * Retrieves a list of all users
 * @returns A list of all users
 */
export const getAllUsers = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}`);
  return response.data;
}

/**
 * Deletes a user with the given ID.
 * @param userId The ID of the user to be deleted
 * @returns The deleted user object
 */
export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
}

/**
 * Retrieves the profile of the currently logged-in user.
 * @returns The logged-in user object
 */
export const getProfile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
}

/**
 * Retrieves a user by their ID.
 * @param userId The ID of the user to be retrieved
 * @returns The user object
 */
export const getUserById = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
  return response.data;
}

/**
 * Updates a user with the given ID.
 * @param userId The ID of the user to be updated
 * @param user The user object containing the updated information
 * @returns The updated user object
 */
export const updateUser = async (userId: string, user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${userId}`, user);
  return response.data;
}
