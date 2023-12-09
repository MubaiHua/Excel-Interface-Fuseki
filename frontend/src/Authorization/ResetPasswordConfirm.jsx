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

/**
 * ResetPasswordConfirm component handles the process of confirming a user's password reset.
 * @returns {JSX.Element} The JSX element representing the ResetPasswordConfirm component.
 */
function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetConfirmed, setResetConfirmed] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState('');

  /**
   * Handles the password input change and checks if the passwords match.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    const isMatch = enteredPassword === confirmPassword;
    setPasswordMatchError(isMatch ? '' : 'Passwords do not match.');
    setPassword(enteredPassword);
  };

  /**
   * Handles the confirm password input change and checks if the passwords match.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleConfirmPasswordChange = (e) => {
    const enteredConfirmPassword = e.target.value;
    const isMatch = enteredConfirmPassword === password;
    setPasswordMatchError(isMatch ? '' : 'Passwords do not match.');
    setConfirmPassword(enteredConfirmPassword);
  };

  /**
   * Handles the reset password confirm action.
   * Validates the password and confirm password, triggers the resetPasswordConfirm API call,
   * and updates the state accordingly.
   */
  const handleResetPasswordConfirm = () => {
    // Validate password and confirm password
    if (!password || !confirmPassword || password !== confirmPassword) {
      alert('Please enter your password and the same confirm password');
      return;
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
      .catch((err) => {
        // Handle API error (display an error message, etc.)
        console.error('Error confirming password reset:', err);
        alert('Error confirming password reset:', err);
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
