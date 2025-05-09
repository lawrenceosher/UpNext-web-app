/* eslint-disable @typescript-eslint/no-explicit-any */
import * as userClient from "../clients/userClient";
import { useEffect, useState } from "react";
import { setCurrentUser } from "../redux/accountReducer";
import { useDispatch } from "react-redux";

/**
 * Session component to fetch and set the current user session
 * @param children The child components to render after fetching the user session
 */
export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = await userClient.getProfile();
        
        dispatch(setCurrentUser(currentUser));
      } catch (err: any) {
        console.error(err);
      }
      setPending(false);
    };

    fetchProfile();
  }, [dispatch]);

  if (!pending) {
    return children;
  }
}
