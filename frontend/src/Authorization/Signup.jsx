/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../Utils/AuthAPI';
import '../App.css';

// SignUp Component
function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Check for non-empty email, username, and password
    if (!email.trim() || !username.trim() || !password.trim()) {
      setError('The field cannot be empty.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Check if a role is selected
    if (!role) {
      setError('Please select a role.');
    }

    const payload = {
      email,
      name: username,
      password,
      re_password: confirmPassword,
      is_admin: role === 'mappingAdmin',
    };

    AuthAPI.signup(payload)
      .then(() => {
        alert('Please check your email to activate your account');
        navigate('/login');
      })
      .catch((err) => {
        const { response } = err;
        if (response.status === 400) {
          const { data } = response;
          let errMessage = '';
          Object.keys(data).forEach((key) => {
            errMessage += data[key][0];
            errMessage += '\n';
          });
          alert(errMessage);
        }
      });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select a role</option>
              <option value="mappingAdmin">Mapping Administrator</option>
              <option value="dataAnalyst">Data Analyst</option>
            </select>
          </div>
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
