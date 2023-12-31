/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../Utils/AuthAPI';
import CommonAPI from '../Utils/CommenAPI';
import {
  setLocalStorage, JWT_TOKEN, JWT_REFRESH_TOKEN, getJWTToken,
} from '../Utils/LocalStorageAccessor';
import { MainContext } from '../MainContext';

/**
 * React component for displaying copyright information.
 * @component
 * @param {Object} props - React props for the Copyright component.
 * @returns {JSX.Element} Copyright component.
 */
function Copyright(props) {
  /**
   * Generates the current URL and the home page URL based on the current URL.
   * @returns {string} Home page URL.
   */
  const getHomePageURL = () => {
    const currentURL = window.location.href;
    const homePageURL = currentURL.split('/').slice(0, 3).join('/');
    return homePageURL;
  };

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={getHomePageURL()}>
        Excel Interface Fuseki
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Create a MUI theme
const defaultTheme = createTheme();

/**
 * React component for the login page.
 * @component
 * @returns {JSX.Element} Login component.
 */
function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const currentURL = window.location.href;
  const signupPageURL = currentURL.replace(/\/login$/, '/signup');
  const {
    setUsername,
    setHasLogin,
    setUserEmail,
    setUserID,
    setIsUserAdmin,
  } = useContext(MainContext);

  useEffect(() => {
    if (getJWTToken() !== 'djwt') {
      const payload = {
        token: getJWTToken(),
      };
      AuthAPI.verifyCurrentUser(payload).then((response) => {
        if (response) {
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
            });
        }
      }).catch(() => {
        console.log('here');
        console.log('Need Login');
      });
    }
  }, []); // Empty dependency array means this effect runs only once

  /**
   * Handles the form submission, sends a request to the server for user authentication.
   * Updates the state and redirects to the home page on successful login.
   * Displays an alert on login failure.
   * @param {React.SyntheticEvent} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!loginEmail.trim() || !password.trim()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/reset_password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={signupPageURL} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
