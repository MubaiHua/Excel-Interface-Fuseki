import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { MainContext } from '../MainContext';
import '../App.css';

function DatabaseOverview() {
  const { userName } = useContext(MainContext);
  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <h1>
        Overview
      </h1>
    </div>
  );
}

export default DatabaseOverview;
