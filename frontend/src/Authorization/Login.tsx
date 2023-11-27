import React, { useState } from 'react';
import '../App.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError(''); // Reset error message
  
      // Check for non-empty email and password
      if (!email.trim() || !password.trim()) {
        setError('Email and password cannot be empty.')
      }
  
      // Handle login logic later
    };
  
    return (
      <div className="form-container">
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
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
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login