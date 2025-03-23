import { Avatar, Typography, Box, Toolbar, AppBar, Button, IconButton } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';

export default function NavBar() {
  const username = localStorage.getItem('username') || 'Guest';
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)'); 

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); 
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}

          <Avatar sx={{ height: 35, width: 35, marginRight: 2, bgcolor: deepPurple[500] }} onClick={()=>navigate('/dashboard')}>
            {username.charAt(0).toUpperCase()}
          </Avatar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {username}
          </Typography>

          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
