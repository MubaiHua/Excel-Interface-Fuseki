import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../App.css';

const NavBar: React.FC = () => (
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

  export default NavBar