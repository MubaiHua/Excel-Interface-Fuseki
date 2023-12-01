import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MainContext } from '../MainContext';
import { cleanJWTToken } from '../Utils/LocalStorageAccessor';

function NavBar() {
  const { hasLogin, setHasLogin, userID } = useContext(MainContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    cleanJWTToken();
    setHasLogin(false);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {hasLogin ? (
            <RouterLink to={`/home/${userID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </RouterLink>
          ) : (
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </RouterLink>
          )}
        </Typography>
        {hasLogin ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/signup">
              Sign Up
            </Button>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
