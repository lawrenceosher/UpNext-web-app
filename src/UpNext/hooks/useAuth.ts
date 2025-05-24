/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setCurrentUser } from "../redux/accountReducer";
import * as userClient from "../clients/userClient";

/**
 * Hook that manages authentication logic.
 * It provides functions for logging in and signing up users,
 * as well as managing the state of user credentials and error messages.
 * @returns An object containing authentication-related state and functions.
 */
const useAuth = () => {
  // Get the current user from the Redux store
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // State for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);

  // State for login credentials
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // State for signup user information
  const [user, setUser] = useState({
    username: "",
    password: "",
    verifyPassword: "",
  });

  // State for updating existing user information
  const [updatedUser, setUpdatedUser] = useState({
    _id: currentUser?._id || "",
    password: "",
    verifyPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const logIn = async () => {
    // Disallow login if username or password is empty
    if (!credentials.username || !credentials.password) {
      setErrorMessage("Please enter a username and password");
      return;
    }

    const user = await userClient.signin(credentials);
    // If the login fails, display an error message
    if (!user) {
      setErrorMessage("Invalid username or password");
      return;
    }

    dispatch(setCurrentUser(user));
    navigate("/UpNext/Home");
  };

  const signUp = async () => {
    // Disallow signup if username or password is empty
    if (!user.username || !user.password) {
      setErrorMessage("Please enter a username and password");
      return;
    }

    // Disallow signup if password and verifyPassword do not match
    if (user.password !== user.verifyPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    let currentUser;
    try {
      currentUser = await userClient.signup(user);
    } catch (error) {
      setErrorMessage((error as Error).message);
      return;
    }

    dispatch(setCurrentUser(currentUser));
    navigate("/UpNext/Home");
  };

  const updateExistingUser = async () => {
    if (updatedUser.password !== updatedUser.verifyPassword) {
      setErrorMessage("Passwords do not match");
      setSuccessMessage(null);
      return;
    }

    const resultingUser = await userClient.updateUser(
      updatedUser._id,
      updatedUser
    );

    dispatch(setCurrentUser(resultingUser));
    setSuccessMessage("Password updated successfully");

    // Reset the updatedUser state
    setUpdatedUser({
      _id: currentUser._id,
      password: "",
      verifyPassword: "",
    });
  };

  return {
    showPassword,
    setShowPassword,
    credentials,
    setCredentials,
    logIn,
    errorMessage,
    setErrorMessage,
    user,
    setUser,
    signUp,
    updatedUser,
    setUpdatedUser,
    updateExistingUser,
    successMessage,
    setSuccessMessage,
  };
};

export default useAuth;
