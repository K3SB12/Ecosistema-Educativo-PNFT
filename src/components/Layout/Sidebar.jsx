// src/components/Layout/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Toolbar, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradingIcon from '@mui/icons-material/Grading';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Planeamiento', icon: <AssignmentIcon />, path: '/planning' },
  { text: 'Evaluación', icon: <GradingIcon />, path: '/evaluation' },
  { text: 'Bitácora', icon: <MenuBookIcon />, path: '/logbook' },
  { text: 'Estudiantes', icon: <PeopleIcon />, path: '/students' },
  { text: 'Configuración', icon: <SettingsIcon />, path: '/settings' },
];

function Sidebar({ mobileOpen, setMobileOpen, setIsClosing, drawerWidth }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const drawer = (
    <Box>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <img src="/logo-pnft.png" alt="PNFT" style={{ height: 50 }} />
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e8f5e8',
                  borderRight: '4px solid #2E7D32',
                  '&:hover': {
                    backgroundColor: '#c8e6c9',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#2E7D32' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
