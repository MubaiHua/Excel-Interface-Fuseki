import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { MainContext } from '../MainContext';
import '../App.css';

function UserHome() {
  const { hasLogin, isUserAdmin } = useContext(MainContext);
  if (!hasLogin) {
    return <Navigate to="/login" />;
  }
  if (!isUserAdmin) {
    return <Navigate to="/home/:uid/data_analyst" />;
  }
  return <Navigate to="/home/:uid/mapping_admin" />;
}

export default UserHome;
