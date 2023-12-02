import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthAPI from '../Utils/AuthAPI';

const theme = createTheme();

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [resetRequested, setResetRequested] = useState(false);

  const handleResetPassword = () => {
    // Validate the email format (you may want to add more robust email validation)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Handle invalid email
      return;
    }

    const payload = {
      email,
    };

    // Call the resetPassword API
    AuthAPI.resetPassword(payload)
      .then(() => {
        setResetRequested(true);
      })
      .catch((error) => {
        // Handle API error (display an error message, etc.)
        console.error('Error resetting password:', error);
        alert('Error resetting password:', error);
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
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleResetPassword}
                sx={{ mt: 3 }}
              >
                Reset Password
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
