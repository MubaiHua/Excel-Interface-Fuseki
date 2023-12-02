import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { MainContext } from '../MainContext';
import DefineMappings from './DefineMappings';
import DataAnalyst from './DataAnalyst';
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
  if (isUserAdmin) {
    return <Dashboard userID={userID} userName={userName} />;
  }
  return <DataAnalyst />;
}

export default UserHome;
