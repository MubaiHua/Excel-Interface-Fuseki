import React, { useContext } from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router, Route, Routes, Link, useNavigate,
} from 'react-router-dom';
import { MainContext } from '../MainContext';
import { cleanJWTToken } from '../Utils/LocalStorageAccessor';
import '../App.css';

function NavBar() {
  const { hasLogin, setHasLogin } = useContext(MainContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    cleanJWTToken();
    setHasLogin(false);
    navigate('/');
  };

  if (!hasLogin) {
    return (
      <div className="navbar">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <div className="navbar-right">
          <Link to="/signup" className="navbar-link">
            Sign Up
          </Link>
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="navbar">
      <div className="navbar-right">
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default NavBar;
