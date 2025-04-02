import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  Avatar,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../styles/global.css';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (success: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('請輸入帳號和密碼');
      return;
    }
    if (username === 'admin' && password === 'admin') {
      onLogin(true);
      navigate('/dashboard');
    } else {
      setError('帳號或密碼錯誤');
    }
  };

  return (
    <Box
      className="App"
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-in-out',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              transform: 'translateY(-5px)',
              background: 'rgba(255, 255, 255, 0.95)',
            },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#4CAF50' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
            NPO 個案管理系統
          </Typography>
          <Typography component="h2" variant="h6" gutterBottom sx={{ color: '#388E3C' }}>
            歡迎回來
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="帳號"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密碼"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: 2,
                backgroundColor: '#4CAF50',
                boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#388E3C',
                  boxShadow: '0 5px 8px 3px rgba(76, 175, 80, .4)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              登入
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 