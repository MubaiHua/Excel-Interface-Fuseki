import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MainContext } from '../MainContext';
import { cleanJWTToken } from '../Utils/LocalStorageAccessor';

function NavBar() {
  const {
    hasLogin, setHasLogin, userID, userName, isUserAdmin,
  } = useContext(MainContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    cleanJWTToken();
    setHasLogin(false);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
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
        {hasLogin && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography align="center">
            Welcome
            {' '}
            <span style={{ fontStyle: 'italic' }}>
              {isUserAdmin ? 'Mapping Administrator' : 'Data Analyst'}
            </span>
          </Typography>
          <Typography align="center" sx={{ fontWeight: 'bold' }}>
            &nbsp;
            {userName}
          </Typography>
        </div>
        )}

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
