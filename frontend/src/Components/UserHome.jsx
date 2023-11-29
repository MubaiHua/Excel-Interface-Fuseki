import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { MainContext } from '../MainContext';
import '../App.css';

function UserHome() {
  const { hasLogin, userName } = useContext(MainContext);
  if (!hasLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>
        Welcome
        {' '}
        {userName}
      </h1>
      <p>This is the home page.</p>
    </div>
  );
}

export default UserHome;
