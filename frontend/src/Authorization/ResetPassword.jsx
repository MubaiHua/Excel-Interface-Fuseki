import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthAPI from '../Utils/AuthAPI';

/**
 * ResetPassword component handles the process of resetting a user's password.
 * @returns {JSX.Element} The JSX element representing the ResetPassword component.
 */
function ResetPassword() {
  const [email, setEmail] = useState('');
  const [resetRequested, setResetRequested] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Handles the reset password action.
   * Validates the email, triggers the resetPassword API call, and updates the state accordingly.
   */
  const handleResetPassword = () => {
    setError(null);

    // Validate the email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const payload = {
      email,
    };

    setLoading(true);

    // Call the resetPassword API
    AuthAPI.resetPassword(payload)
      .then(() => {
        setResetRequested(true);
      })
      .catch((err) => {
        console.error('Error resetting password:', err);
        setError('Failed to reset password. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={createTheme()}>
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
          {resetRequested ? (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ marginTop: 2 }}>
              Password reset email has been sent. Please check your email to complete the process.
            </Typography>
          ) : (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error)}
                helperText={error}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleResetPassword}
                sx={{ mt: 3 }}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Reset Password'}
              </Button>
            </>
          )}
          <Box sx={{ mt: 2 }}>
            <Link to="/login" variant="body2">
              Back to Login
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ResetPassword;
