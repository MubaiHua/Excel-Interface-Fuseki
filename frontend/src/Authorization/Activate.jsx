import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthAPI from '../Utils/AuthAPI';

const theme = createTheme();

function Activate() {
  const [verified, setVerified] = useState(false);
  const { uid, token } = useParams();

  const verifyAccount = () => {
    const payload = {
      uid,
      token,
    };

    AuthAPI.activation(payload)
      .then(() => {
        setVerified(true);
      })
      .catch((err) => {
        console.error('Error verifying account:', err);
        alert('Error verifying account:', err);
      });
  };

  if (verified) {
    return <Navigate to="/login" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ marginTop: '50px' }}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Verify your Account
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={verifyAccount}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Verify
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Activate;
