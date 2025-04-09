import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import StepperForm from './components/StepperForm';
import Dashboard from './components/Dashboard';
import CaseManagement from './components/CaseManagement';
import CaseEdit from './components/CaseEdit';
import ActivityManagement from './components/ActivityManagement';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    secondary: {
      main: '#66bb6a',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Noto Sans TC", sans-serif',
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e',
          color: 'white',
          borderRight: 'none',
          boxShadow: 'none',
          position: 'fixed',
          height: '100%',
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
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          marginBottom: '8px',
          padding: '10px 16px',
          transition: 'all 0.2s',
          '&.Mui-selected': {
            backgroundColor: 'rgba(255,255,255,0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.15)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.05)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '40px',
          color: 'inherit',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    // @ts-ignore
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', bgcolor: '#f5f7fa', minHeight: '100vh' }}>
          <Navbar onLogout={() => {}} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
              p: 3,
              pl: '50px',
              boxSizing: 'border-box',
              bgcolor: '#f5f7fa',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cases" element={<CaseManagement />} />
              <Route path="/new-case" element={<StepperForm />} />
              <Route path="/cases/new" element={<CaseEdit />} />
              <Route path="/cases/:id" element={<CaseEdit />} />
              <Route path="/activities" element={<ActivityManagement />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
