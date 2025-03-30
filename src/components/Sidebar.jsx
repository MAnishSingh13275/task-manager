import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import { Home, ListAlt, CalendarMonth, Group } from '@mui/icons-material';

const Sidebar = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: 240,
      [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' }
    }}
  >
    <Divider />
    <List sx={{ mt: '64px' }}>
      {[['Dashboard', <Home />]].map(([text, icon]) => (
        <ListItemButton key={text}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>
  </Drawer>
);

export default Sidebar;
