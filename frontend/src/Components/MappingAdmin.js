import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { MainContext } from '../MainContext';
import '../App.css';

function MappingAdmin() {
  const { userName } = useContext(MainContext);
  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <h1>
        Welcome Mapping Administrator
        {' '}
        {userName}
      </h1>
      <p>This is the home page.</p>
    </div>
  );
}

export default MappingAdmin;
