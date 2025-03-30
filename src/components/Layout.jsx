import React, { useState } from 'react';
import {
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Header from './Header';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header */}
      <Header onMenuClick={toggleDrawer} />

      {/* Sidebar for desktop */}
      {!isMobile && <Sidebar variant="permanent" />}

      {/* Sidebar for mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Sidebar />
        </Drawer>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: { xs: '56px', sm: '64px' }, // Adjust header height
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
