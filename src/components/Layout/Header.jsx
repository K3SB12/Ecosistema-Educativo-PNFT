// src/components/Layout/Header.jsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BackupIcon from '@mui/icons-material/Backup';
import { useNavigate } from 'react-router-dom';

function Header({ handleDrawerToggle, drawerWidth }) {
  const navigate = useNavigate();

  const handleBackup = () => {
    navigate('/settings?tab=backup');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: '#ffffff',
        color: '#2E7D32',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          PNFT Articulador 2026
        </Typography>
        <Box>
          <IconButton color="inherit" onClick={handleBackup} title="Respaldo">
            <BackupIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
