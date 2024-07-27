// AppBar.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Wifi as WifiIcon } from '@mui/icons-material';

const AppBarComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            '&:hover': {
              color: 'secondary.main',
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          IoT Monitoring systems
        </Typography>
        <IconButton
          color="inherit"
          sx={{
            '&:hover': {
              color: 'secondary.main',
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          color="inherit"
          sx={{
            '&:hover': {
              color: 'secondary.main',
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          <WifiIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
