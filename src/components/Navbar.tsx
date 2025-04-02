import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Dashboard,
  People,
  Assessment,
  Settings,
  Add as AddIcon,
} from '@mui/icons-material';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const trigger = useScrollTrigger({
    threshold: 100,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  const menuItems = [
    { text: '儀表板', icon: <Dashboard />, path: '/dashboard' },
    { text: '個案管理', icon: <People />, path: '/cases' },
    { text: '新增個案', icon: <AddIcon />, path: '/cases/new' },
    { text: '報表分析', icon: <Assessment />, path: '/reports' },
    { text: '系統設定', icon: <Settings />, path: '/settings' },
  ];

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar 
          position="fixed" 
          sx={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
            borderBottom: '1px solid rgba(76, 175, 80, 0.1)',
            fontFamily: '"Noto Sans TC", sans-serif',
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { sm: 'none' } }}
              onClick={handleMobileMenu}
            >
              <MenuIcon sx={{ color: '#4CAF50' }} />
            </IconButton>

            <Typography
              variant="h5"
              component="div"
              sx={{ 
                flexGrow: 1, 
                color: '#2E7D32',
                fontWeight: 'bold',
                display: { xs: 'none', sm: 'block' },
                fontSize: '1.5rem',
                letterSpacing: '0.5px',
              }}
            >
              NPO 個案管理系統
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  startIcon={item.icon}
                  sx={{
                    color: '#4CAF50',
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="large"
                aria-label="notifications"
                onClick={handleNotifications}
                sx={{ color: '#4CAF50' }}
              >
                <NotificationsIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account"
                onClick={handleMenu}
                sx={{ color: '#4CAF50' }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>

      {/* 手機版選單 */}
      <Menu
        anchorEl={mobileAnchorEl}
        open={Boolean(mobileAnchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            fontFamily: '"Noto Sans TC", sans-serif',
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.text} onClick={handleClose}>
            {item.icon}
            <Typography sx={{ ml: 1, fontSize: '1.1rem' }}>{item.text}</Typography>
          </MenuItem>
        ))}
      </Menu>

      {/* 通知選單 */}
      <Menu
        anchorEl={notificationsAnchorEl}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            fontFamily: '"Noto Sans TC", sans-serif',
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Typography sx={{ fontSize: '1.1rem' }}>您有 3 個新的通知</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography sx={{ fontSize: '1.1rem' }}>系統更新提醒</Typography>
        </MenuItem>
      </Menu>

      {/* 用戶選單 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            fontFamily: '"Noto Sans TC", sans-serif',
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ mr: 1, bgcolor: '#4CAF50' }}>A</Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontSize: '1.1rem' }}>管理員</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
              admin@example.com
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography sx={{ fontSize: '1.1rem' }}>個人資料</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography sx={{ fontSize: '1.1rem' }}>系統設定</Typography>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <Typography sx={{ fontSize: '1.1rem' }}>登出</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar; 