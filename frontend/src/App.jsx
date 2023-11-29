import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Authorization/Login';
import SignUp from './Authorization/Signup';
import ResetPassword from './Authorization/ResetPassword';
import ResetPasswordConfirm from './Authorization/ResetPasswordConfirm';
import Activate from './Authorization/Activate';
import NavBar from './Components/NavBar';
import UserHome from './Components/UserHome';
import MainContextProvider from './MainContext';
import './App.css';

function App() {
  return (
    <MainContextProvider>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home/:uid" element={<UserHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
            <Route path="/activate/:uid/:token" element={<Activate />} />
          </Routes>
        </div>
      </Router>
    </MainContextProvider>

  );
}

export default App;
