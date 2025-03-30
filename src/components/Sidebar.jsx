// src/components/Sidebar.jsx
import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  useTheme,
} from '@mui/material';
import {
  Home,
  ListAlt,
  CalendarMonth,
  Group,
} from '@mui/icons-material';
// import { useLocation } from 'react-router-dom'; // Enable this when routing is in place

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Home />, path: '/' },
  { text: 'My Tasks', icon: <ListAlt />, path: '/tasks' },
  { text: 'Calendar', icon: <CalendarMonth />, path: '/calendar' },
  { text: 'Team', icon: <Group />, path: '/team' },
];

const Sidebar = () => {
  const theme = useTheme();
  // const location = useLocation(); // Uncomment when routes are implemented

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.default,
        },
      }}
    >
      <Toolbar />
      <Divider />

      <Box sx={{ overflowY: 'auto', mt: 1 }}>
        <List>
          {menuItems.map((item) => {
            const isActive = item.text === 'Dashboard'; // Temporary; use pathname logic later
            // const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.text}
                selected={isActive}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  mx: 1,
                  my: 0.5,
                  '&.Mui-selected': {
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.common.white,
                    },
                  },
                  '&:hover': {
                    bgcolor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
