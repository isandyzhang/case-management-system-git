import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CaseForm from './components/CaseForm';
import './styles/global.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#2196F3',
    },
  },
  typography: {
    fontFamily: '"Noto Sans TC", sans-serif',
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (success: boolean) => {
    setIsLoggedIn(success);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {isLoggedIn && <Navbar onLogout={handleLogout} />}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt: isLoggedIn ? 8 : 0,
              background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
              minHeight: '100vh',
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  isLoggedIn ? (
                    <div>儀表板頁面</div>
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/cases"
                element={
                  isLoggedIn ? (
                    <div>個案管理頁面</div>
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/cases/new"
                element={
                  isLoggedIn ? (
                    <CaseForm />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/reports"
                element={
                  isLoggedIn ? (
                    <div>報表分析頁面</div>
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/settings"
                element={
                  isLoggedIn ? (
                    <div>系統設定頁面</div>
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
