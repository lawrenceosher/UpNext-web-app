/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute component to protect routes that require authentication
 * @param children The child components to render if the user is authenticated
 */
export default function ProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Check if the user is authenticated
  // If authenticated, render the children components
  // If not authenticated, redirect to the login page
  if (currentUser) {
    return children;
  } else {
    return <Navigate to="/UpNext/LogIn" />;
}}
