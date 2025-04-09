import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  People,
  Add,
  Assessment,
  ExitToApp,
  Event as EventIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
}

const drawerWidth = 280;

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const menuItems = [
    { text: '儀表板', icon: <Dashboard />, path: '/' },
    { text: '個案管理', icon: <People />, path: '/casesmanagement' },
    { text: '新增個案', icon: <Add />, path: '/new-case' },
    { text: '活動管理', icon: <EventIcon />, path: '/activities' },
  ];

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: '#1e1e1e',
          color: '#ffffff',
          borderRight: 'none',
          height: '95%',
          marginTop: '24px',
          marginLeft: '24px',
          marginRight: '24px',
          marginBottom: '24px',
          position: 'fixed',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255,255,255,0.3)',
          },
        },
      }}
    >
      {/* Logo 區域 */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Typography variant="h5" sx={{ 
          color: '#ffffff',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
          <Assessment sx={{ fontSize: 28 }} />
          個案管理系統
        </Typography>
      </Box>

      {/* 用戶資訊區域 */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: theme.palette.primary.main,
          }}
        >
          A
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
            管理員
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            admin@example.com
          </Typography>
        </Box>
      </Box>

      {/* 主選單 */}
      <List sx={{ px: 2, py: 3 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            sx={{
              borderRadius: '12px',
              mb: 1,
              color: location.pathname === item.path ? '#ffffff' : 'rgba(255,255,255,0.7)',
              bgcolor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
              },
              transition: 'all 0.2s',
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path ? '#ffffff' : 'rgba(255,255,255,0.7)',
              minWidth: '40px',
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '0.95rem',
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* 登出按鈕 */}
      <Box sx={{ mt: 'auto' }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <List sx={{ p: 2 }}>
          <ListItem
            button
            onClick={onLogout}
            sx={{
              borderRadius: '12px',
              color: 'rgba(255,255,255,0.7)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: 'rgba(255,255,255,0.7)',
              minWidth: '40px',
            }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText 
              primary="登出"
              primaryTypographyProps={{
                fontSize: '0.95rem',
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Navbar; 