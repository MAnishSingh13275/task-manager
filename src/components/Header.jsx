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
  ClickAwayListener,
} from '@mui/material';
import {
  Search,
  Notifications,
  Close,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Header = ({ onMenuClick }) => {
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
          px: 2,
          py: isMobile ? 1.5 : 1,
        }}
      >
        {/* Left: Menu icon on mobile */}
        <Box display="flex" alignItems="center" gap={2}>
          {isMobile && (
            <IconButton edge="start" onClick={onMenuClick} aria-label="Menu">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" fontWeight={700} noWrap>
            Task Manager
          </Typography>
        </Box>

        {/* Center: Search */}
        {!isMobile ? (
          <TextField
            placeholder="Search tasks..."
            size="small"
            variant="outlined"
            sx={{
              width: 320,
              bgcolor: theme.palette.grey[100],
              borderRadius: 1,
              mx: 3,
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
            <IconButton onClick={toggleMobileSearch}>
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
                    p: 1,
                    bgcolor: theme.palette.background.paper,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
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
                  <IconButton onClick={toggleMobileSearch}>
                    <Close />
                  </IconButton>
                </Box>
              </Fade>
            </ClickAwayListener>
          </>
        )}

        {/* Right: Notifications and Avatar */}
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
