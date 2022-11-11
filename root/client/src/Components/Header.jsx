import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, width: "100%"}} >
      <AppBar position="static" sx={{ flexGrow: 1, background: "green"}} >
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <RestaurantIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            CookBook
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}