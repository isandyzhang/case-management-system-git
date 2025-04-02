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
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Tooltip,
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
  Notifications,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const trigger = useScrollTrigger({
    threshold: 100,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { text: '儀表板', icon: <Dashboard />, path: '/dashboard' },
    { text: '個案管理', icon: <People />, path: '/cases' },
    { text: '新增個案', icon: <AddIcon />, path: '/cases/new' },
    { text: '報表分析', icon: <Assessment />, path: '/reports' },
    { text: '系統設定', icon: <Settings />, path: '/settings' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar 
          position="fixed" 
          sx={{ 
            background: scrolled
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.3s ease',
            fontFamily: '"Noto Sans TC", sans-serif',
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="primary"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: 'primary.main',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => handleNavigation('/')}
            >
              NPO個案管理系統
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="primary"
                    startIcon={item.icon}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
              <Tooltip title="通知">
                <IconButton
                  color="primary"
                  onClick={handleNotificationsClick}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    },
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="用戶選單">
                <IconButton
                  onClick={handleUserMenuClick}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    },
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
      >
        <MenuItem onClick={handleNotificationsClose}>新通知 1</MenuItem>
        <MenuItem onClick={handleNotificationsClose}>新通知 2</MenuItem>
        <MenuItem onClick={handleNotificationsClose}>新通知 3</MenuItem>
      </Menu>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={handleUserMenuClose}>個人資料</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>系統設定</MenuItem>
        <MenuItem onClick={onLogout}>登出</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar; 