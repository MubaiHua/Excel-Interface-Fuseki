import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../Utils/AuthAPI';
import CommonAPI from '../Utils/CommenAPI';
import {
  setLocalStorage, JWT_TOKEN, JWT_REFRESH_TOKEN, getJWTToken,
} from '../Utils/LocalStorageAccessor';
import { MainContext } from '../MainContext';
import '../App.css';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    setUsername,
    setHasLogin,
    setUserEmail,
    setUserID,
    setIsUserAdmin,
  } = useContext(MainContext);

  useEffect(() => {
    const payload = {
      token: getJWTToken(),
    };
    AuthAPI.verifyCurrentUser(payload)
      .then(() => {
        CommonAPI.getCurrentUser()
          .then((res) => {
            const {
              email, id, is_admin, name,
            } = res;
            setUsername(name);
            setHasLogin(true);
            setUserEmail(email);
            setUserID(id);
            setIsUserAdmin(is_admin);
            return id;
          })
          .then((id) => {
            navigate(`/home/${id}`);
          })
          .catch(() => {
            alert('fail to get user information');
          });
      })
      .catch(() => {
        console.log('Need Login');
      });
  }, []); // Empty dependency array means this effect runs only once

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(''); // Reset error message

    // Check for non-empty email and password
    if (!loginEmail.trim() || !password.trim()) {
      setError('Email and password cannot be empty.');
    }

    const payload = {
      email: loginEmail,
      password,
    };

    AuthAPI.login(payload)
      .then((res) => {
        const { access, refresh } = res;
        setLocalStorage(JWT_TOKEN, access);
        setLocalStorage(JWT_REFRESH_TOKEN, refresh);
      })
      .then(() => {
        CommonAPI.getCurrentUser()
          .then((res) => {
            const {
              email, id, is_admin, name,
            } = res;
            setUsername(name);
            setHasLogin(true);
            setUserEmail(email);
            setUserID(id);
            setIsUserAdmin(is_admin);
            return id;
          })
          .then((id) => {
            navigate(`/home/${id}`);
          })
          .catch(() => {
            alert('fail to get user information');
          });
      })
      .catch(() => {
        alert('Username or Password is incorrect');
      });
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
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
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
}

export default Login;
