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
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          <Route path="/activate/:uid/:token" element={<Activate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
