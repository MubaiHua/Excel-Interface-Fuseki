import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthAPI from '../Utils/AuthAPI';

const theme = createTheme();

function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetConfirmed, setResetConfirmed] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState('');

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

  const handleResetPasswordConfirm = () => {
    // Validate password and confirm password
    if (!password || !confirmPassword || password !== confirmPassword) {
      alert('Please enter your password and the same confirm password');
    }

    const payload = {
      uid,
      token,
      new_password: password,
      re_new_password: confirmPassword,
    };

    // Call the resetPasswordConfirm API
    AuthAPI.resetPasswordConfirm(payload)
      .then(() => {
        setResetConfirmed(true);
      })
      .catch((error) => {
        // Handle API error (display an error message, etc.)
        console.error('Error confirming password reset:', error);
        alert('Error confirming password reset:', error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          {resetConfirmed ? (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ marginTop: 2 }}>
              Password has been successfully reset. You can now login with your new password.
            </Typography>
          ) : (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="password"
                label="New Password"
                name="password"
                type="password"
                autoComplete="new-password"
                autoFocus
                onChange={handlePasswordChange}
                error={!!passwordMatchError}
                helperText={passwordMatchError}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="confirmPassword"
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                onChange={handleConfirmPasswordChange}
                error={!!passwordMatchError}
                helperText={passwordMatchError}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleResetPasswordConfirm}
                sx={{ mt: 3 }}
              >
                Reset Password
              </Button>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ResetPasswordConfirm;
