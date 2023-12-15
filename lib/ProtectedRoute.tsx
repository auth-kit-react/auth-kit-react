import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useProtectedRoute } from "./utility/authUtils";

/**
 * ProtectedRoute: A React component that acts as a guard for protected routes.
 * It checks if the user is authenticated using the `useProtectedRoute` hook.
 * If authenticated, it renders the nested Outlet (children components).
 * If not authenticated, it redirects the user to the login page.
 * @returns {React.ReactElement} - JSX element representing the ProtectedRoute.
 */
const ProtectedRoute: React.FC = () => {
  /**
   * Boolean indicating whether the user is authenticated.
   * @type {boolean}
   */
  const isAuthenticated = useProtectedRoute();

  /**
   * Render the Outlet if the user is authenticated, otherwise redirect to the login page.
   * @returns {React.ReactElement} - JSX element representing Outlet or Navigate component.
   */
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
