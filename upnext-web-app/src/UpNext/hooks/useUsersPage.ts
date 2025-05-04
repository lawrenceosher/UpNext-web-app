/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { User } from "../types/user";
import * as userClient from "../clients/userClient";

/**
 * Allows for the fetching and filtering of users.
 * @returns { allUsers: User[], filter: string, setFilter: (filter: string) => void }
 * allUsers - The list of all users.
 * filter - The current filter string.
 * setFilter - Function to update the filter string.
 */
const useUsersPage = () => {
  const [allUsers, setAllUsers] = useState<any>([]);

  // The filter string used to search for users.
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setAllUsers((prevUsers: User[]) =>
      prevUsers.filter((user: User) =>
        user.username.toLowerCase().includes(filter.toLowerCase())
      )
    );

    // Fetch all users if the filter is empty.
    // Ensures that the list of users is reset when the filter is cleared.
    if (filter === "") {
      const fetchUsers = async () => {
        try {
          const users = await userClient.getAllUsers();
          setAllUsers(users);
        } catch (error) {
          console.error("Error fetching users:", error);
          setAllUsers([]);
        }
      };
      fetchUsers();
    }
  }, [filter]);

  return { allUsers, filter, setFilter };
};

export default useUsersPage;
