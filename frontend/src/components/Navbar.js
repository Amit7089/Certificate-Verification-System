import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleLogout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Certificate Verification System
        </Typography>
        {user ? (
          <>
            <Typography variant="body1" mr={2}>
              Welcome, {user.name}
            </Typography>
            {user.role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin">Admin Dashboard</Button>
            )}
            <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;