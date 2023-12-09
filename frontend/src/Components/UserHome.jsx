import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { MainContext } from '../MainContext';
import Dashboard from './DashBoard';

/**
 * Component representing the user's home page.
 * @function UserHome
 * @returns {JSX.Element} The rendered React component.
 */
function UserHome() {
  // Destructuring values from the MainContext
  const {
    hasLogin, isUserAdmin, userID, userName,
  } = useContext(MainContext);

  /**
   * Effect that logs the user ID when hasLogin, userID, or isUserAdmin changes.
   */
  useEffect(() => {
    console.log(userID);
  }, [hasLogin, userID, isUserAdmin]);

  /**
   * If the user is not logged in, redirect them to the login page.
   */
  if (!hasLogin) {
    return <Navigate to="/login" />;
  }

  // Render the Dashboard component with user information.
  return <Dashboard userID={userID} userName={userName} isUserAdmin={isUserAdmin} />;
}

export default UserHome;
