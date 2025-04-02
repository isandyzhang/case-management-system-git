import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Login from './components/Login';
import Navbar from './components/Navbar';
import './styles/global.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    // 這裡之後會加入實際的登入驗證邏輯
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      // 儲存登入狀態到 localStorage
      localStorage.setItem('isLoggedIn', 'true');
      // 重新整理頁面
      window.location.reload();
    } else {
      alert('帳號或密碼錯誤');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // 清除登入狀態
    localStorage.removeItem('isLoggedIn');
    // 重新整理頁面
    window.location.reload();
  };

  // 檢查是否已經登入
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onLogout={handleLogout} />
      <Box 
        component="main" 
        className="App" 
        sx={{ 
          flexGrow: 1,
          pt: 8, // 為導航列留出空間
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              my: 4,
              p: 4,
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease-in-out',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              '&:hover': {
                transform: 'translateY(-5px)',
                background: 'rgba(255, 255, 255, 0.95)',
              },
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
              NPO 個案管理系統
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#388E3C' }}>
              歡迎使用 NPO 個案管理系統，讓我們一起為社會服務
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  backgroundColor: '#4CAF50',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: '#388E3C',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                進入系統
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
