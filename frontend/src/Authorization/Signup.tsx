import React, { useState } from 'react';
import '../App.css';

// SignUp Component
const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [error, setError] = useState<string>('');
  
    const handleSubmit = (e: React.FormEvent) => {
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
  
      // Handle sign up logic later
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
  };

export default SignUp