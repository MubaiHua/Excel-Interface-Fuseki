import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
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
import DefineMappings from './Components/DefineMappings';
import './App.css';

/**
 * Main component representing the entire application.
 * @function App
 * @returns {JSX.Element} The rendered React component.
 */
function App() {
  return (
    <MainContextProvider>
      <Router>
        <div>
          <NavBar />
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* User Home Route */}
            <Route path="/home/:uid" element={<UserHome />} />

            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Signup Route */}
            <Route path="/signup" element={<SignUp />} />

            {/* Reset Password Route */}
            <Route path="/reset_password" element={<ResetPassword />} />

            {/* Reset Password Confirm Route */}
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />

            {/* Activate Route */}
            <Route path="/activate/:uid/:token" element={<Activate />} />

            {/* Define Mappings Route */}
            <Route path="/define_mappings" element={<DefineMappings />} />
          </Routes>
        </div>
      </Router>
    </MainContextProvider>
  );
}

export default App;
