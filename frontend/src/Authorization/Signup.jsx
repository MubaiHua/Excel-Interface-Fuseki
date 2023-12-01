/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../Utils/AuthAPI';

const defaultTheme = createTheme();

function Copyright(props) {
  const currentURL = window.location.href;
  const homePageURL = currentURL.split('/').slice(0, 3).join('/');
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={homePageURL}>
        Excel Interface Fuseki
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

// SignUp Component
function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const navigate = useNavigate();

  const currentURL = window.location.href;
  const loginPageURL = currentURL.replace(/\/signup$/, '/login');

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    const isMatch = enteredPassword === confirmPassword;
    setPasswordMatchError(isMatch ? '' : 'Passwords do not match.');
    setPassword(enteredPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const enteredConfirmPassword = e.target.value;
    const isMatch = enteredConfirmPassword === password;
    setPasswordMatchError(isMatch ? '' : 'Passwords do not match.');
    setConfirmPassword(enteredConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for non-empty email, username, and password
    if (!email.trim() || !username.trim() || !password.trim()) {
      alert('The field cannot be empty.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Check if a role is selected
    if (!role) {
      alert('Please select a role.');
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                  error={!!passwordMatchError}
                  helperText={passwordMatchError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={handleConfirmPasswordChange}
                  error={!!passwordMatchError}
                  helperText={passwordMatchError}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="select-role-label">Select Role</InputLabel>
                  <Select
                    labelId="select-role-label"
                    id="select-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="Select Role"
                  >
                    <MenuItem value="" disabled>
                      Select role
                    </MenuItem>
                    <MenuItem value="mappingAdmin">Mapping Administrator</MenuItem>
                    <MenuItem value="dataAnalyst">Data Analyst</MenuItem>
                  </Select>
                  <FormHelperText>Please select your role</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={loginPageURL} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
