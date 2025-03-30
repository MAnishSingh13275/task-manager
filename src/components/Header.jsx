import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, TextField, InputAdornment, Avatar, Badge } from '@mui/material';
import { Search, Notifications } from '@mui/icons-material';

const Header = () => (
  <AppBar position="fixed" sx={{ zIndex: 1300, bgcolor: '#fff', color: 'text.primary', boxShadow: 1 }}>
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6" noWrap>Task Manager</Typography>
      <TextField
        placeholder="Search tasks..."
        size="small"
        sx={{ width: 300, bgcolor: 'grey.100', borderRadius: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton>
          <Badge badgeContent={3} color="error"><Notifications /></Badge>
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar alt="John Doe" src="https://i.pravatar.cc/300" />
          <Typography variant="body2">John Doe</Typography>
        </Box>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
