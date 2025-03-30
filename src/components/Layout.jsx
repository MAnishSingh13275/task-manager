// src/components/Layout.jsx
import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Sidebar />

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: '64px',          // height of Header
                    minHeight: '100vh',
                    backgroundColor: '#f9fafb'
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
