import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Badge,
  useMediaQuery,
  Fade,
  ClickAwayListener
} from '@mui/material';
import { Search, Notifications, Close } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const toggleMobileSearch = () => setShowSearchMobile((prev) => !prev);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          px: theme.spacing(2),
          py: isMobile ? theme.spacing(1.5) : theme.spacing(1),
        }}
      >
        {/* Left - App Title */}
        <Typography variant="h6" fontWeight={700} noWrap sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>

        {/* Center - Search Bar */}
        {!isMobile ? (
          <TextField
            placeholder="Search tasks..."
            size="small"
            variant="outlined"
            sx={{
              width: 320,
              bgcolor: theme.palette.grey[100],
              borderRadius: 1,
              mx: theme.spacing(3),
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <>
            <IconButton onClick={toggleMobileSearch} aria-label="Open search">
              <Search />
            </IconButton>
            <ClickAwayListener onClickAway={() => setShowSearchMobile(false)}>
              <Fade in={showSearchMobile}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    p: theme.spacing(1),
                    bgcolor: theme.palette.background.paper,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    display: showSearchMobile ? 'flex' : 'none',
                    alignItems: 'center',
                    gap: theme.spacing(1),
                    zIndex: theme.zIndex.appBar + 1,
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Search tasks..."
                    size="small"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <IconButton onClick={toggleMobileSearch} aria-label="Close search">
                    <Close />
                  </IconButton>
                </Box>
              </Fade>
            </ClickAwayListener>
          </>
        )}

        {/* Right - Icons & Avatar */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            aria-label="Notifications"
            sx={{
              '&:hover': { backgroundColor: theme.palette.grey[100] },
            }}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Box display="flex" alignItems="center" gap={1}>
            <Avatar alt="John Doe" src="https://i.pravatar.cc/300" />
            {!isMobile && (
              <Typography variant="body2" fontWeight={500}>
                John Doe
              </Typography>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
