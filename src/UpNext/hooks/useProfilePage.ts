/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as invitationClient from "../clients/invitationClient";
import * as queueClient from "../clients/queueClient";
import * as userClient from "../clients/userClient";
import * as groupClient from "../clients/groupClient";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { BiMovie } from "react-icons/bi";
import { FiTv } from "react-icons/fi";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { SlMicrophone } from "react-icons/sl";
import { IoGameControllerOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/accountReducer";
import { setErrorMessage } from "../redux/errorReducer";

/**
 * Fetches and manages user profile data, including invitations, notifications, and account settings.
 * Provides functions to accept/reject invitations and handle user sign-out.
 * @param userId The ID of the user whose profile is being viewed. If undefined, it means the current user's profile.
 * @param currentUser The currently logged-in user - can be null if not logged in.
 * @returns An object containing user data, functions to accept/reject invitations, and state management for notifications and account settings.
 */
const useProfilePage = (userId: any, currentUser: User) => {
  const [userData, setUserData] = useState<any | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for managing notifications offcanvas
  const [showNotifications, setShowNotifications] = useState(false);
  const handleCloseNotifications = () => setShowNotifications(false);
  const handleShowNotifcations = () => setShowNotifications(true);

  // State for managing account settings offcanvas
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const handleCloseAccountSettings = () => setShowAccountSettings(false);
  const handleShowAccountSettings = () => setShowAccountSettings(true);

  // Check if the user is viewing their own profile
  const isViewingOwnProfile = userId === undefined && currentUser !== null;

  // Allows the user to accept an invitation and join a group
  const acceptInvitation = async (invitationId: string) => {
    try {
      await invitationClient.respondToInvitation(invitationId, true);
      setUserData((prevState: any) => ({
        ...prevState,
        pendingInvitations: prevState.pendingInvitations.filter(
          (invitation: any) => invitation._id !== invitationId
        ),
      }));
    } catch (error) {
      console.error("Error accepting invitation:", error);
      dispatch(setErrorMessage("Failed to accept invitation"));
    }
  };

  // Allows the user to reject an invitation and not join a group
  const rejectInvitation = async (invitationId: string) => {
    try {
      await invitationClient.respondToInvitation(invitationId, false);
      setUserData((prevState: any) => ({
        ...prevState,
        pendingInvitations: prevState.pendingInvitations.filter(
          (invitation: any) => invitation._id !== invitationId
        ),
      }));
    } catch (error) {
      console.error("Error rejecting invitation:", error);
      dispatch(setErrorMessage("Failed to reject invitation"));
    }
  };

  // Allows the user to sign out and navigate to the login page
  const signout = async () => {
    await userClient.signout();
    dispatch(setCurrentUser(null));
    navigate("/UpNext/LogIn");
  };

  // Fetch user data, history summary, personal history queues, current personal queues, and pending invitations when the component mounts or when userId changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let user;
        if (userId === undefined) {
          const profile = await userClient.getProfile();
          user = profile;
        } else {
          if (currentUser && userId === currentUser._id) {
            navigate("/UpNext/Account/Profile");
            return;
          } else {
            user = await userClient.getUserById(userId);
          }
        }
        setUserData({
          ...user,
          historySummary: [],
          currentQueues: {
            movies: [],
            tv: [],
            albums: [],
            books: [],
            podcasts: [],
            games: [],
          },
          historyQueues: {
            movies: [],
            tv: [],
            albums: [],
            books: [],
            podcasts: [],
            games: [],
          },
          groups: [],
          pendingInvitations: [],
        });

        // Fetch history queues after user data is set
        const historySummary = await queueClient.retrieveHistorySummaryForUser(
          user.username
        );
        setUserData((prevState: any) => ({
          ...prevState,
          historySummary: [
            {
              category: "Movies",
              icon: BiMovie,
              value: historySummary.movie.history,
            },
            { category: "TV", icon: FiTv, value: historySummary.tv.history },
            {
              category: "Albums",
              icon: IoMusicalNotesOutline,
              value: historySummary.album.history,
            },
            {
              category: "Books",
              icon: IoBookOutline,
              value: historySummary.book.history,
            },
            {
              category: "Podcasts",
              icon: SlMicrophone,
              value: historySummary.podcast.history,
            },
            {
              category: "Games",
              icon: IoGameControllerOutline,
              value: historySummary.game.history,
            },
          ],
          historyQueues: {
            movies: historySummary.movie.history,
            tv: historySummary.tv.history,
            albums: historySummary.album.history,
            books: historySummary.book.history,
            podcasts: historySummary.podcast.history,
            games: historySummary.game.history,
          },
        }));

        // Fetch current queues after user data is set
        const currentQueues =
          await queueClient.retrieveTop3InCurrentQueueForUser(user.username);
        setUserData((prevState: any) => ({
          ...prevState,
          currentQueues: {
            movies: currentQueues.movie.current,
            tv: currentQueues.tv.current,
            albums: currentQueues.album.current,
            books: currentQueues.book.current,
            podcasts: currentQueues.podcast.current,
            games: currentQueues.game.current,
          },
        }));

        // Fetch groups
        const groups = await groupClient.getGroupsForUser(user.username);
        setUserData((prevState: any) => ({
          ...prevState,
          groups: groups,
        }));

        // Fetch pending invitations
        const invitations = await invitationClient.getPendingInvitationsForUser(
          user.username
        );
        setUserData((prevState: any) => ({
          ...prevState,
          pendingInvitations: invitations,
        }));
      } catch (error) {
        console.error("Error fetching user data or history summary:", error);
      }
    };

    fetchUserData();
  }, [currentUser, navigate, setUserData, userId]);

  return {
    userData,
    setUserData,
    acceptInvitation,
    rejectInvitation,
    showNotifications,
    handleCloseNotifications,
    handleShowNotifcations,
    showAccountSettings,
    handleCloseAccountSettings,
    handleShowAccountSettings,
    isViewingOwnProfile,
    signout,
  };
};

export default useProfilePage;
