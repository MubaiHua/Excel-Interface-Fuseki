import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { MainContext } from '../MainContext';
import Dashboard from './DashBoard';

function UserHome() {
  const {
    hasLogin, isUserAdmin, userID, userName,
  } = useContext(MainContext);

  useEffect(() => {
    console.log(userID);
  }, [hasLogin, userID, isUserAdmin]);

  if (!hasLogin) {
    return <Navigate to="/login" />;
  }
  return <Dashboard userID={userID} userName={userName} isUserAdmin={isUserAdmin} />;
}

export default UserHome;
