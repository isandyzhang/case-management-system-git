import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle, Lock, Casino } from '@mui/icons-material';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'url("/loginbackgorund.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const LoginBox = styled(motion.div)({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  maxWidth: '900px',
  width: '90%',
});

const ImageSection = styled(Box)({
  width: '85%',
  background: 'linear-gradient(rgba(46, 125, 50, 0), rgba(46, 125, 50, 0.7)), url("/case-management.jpg")',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingBottom: '2rem',
  color: 'white',
  padding: '2rem',
  transition: 'background 0.5s ease',
  '@media (max-width: 768px)': {
    display: 'none',
  },
  '&:hover': {
    
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
});

const LogoImage = styled(motion.img)({
  width: '200px',
  height: 'auto',
  marginBottom: '2rem',
  objectFit: 'contain',
});

const FormSection = styled(Box)({
  padding: '3rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '55%',
  '@media (max-width: 768px)': {
    width: '100%',
  },
});

const StyledButton = styled(Button)({
  padding: '12px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '1rem',
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [showGameInput, setShowGameInput] = useState(false);

  const handleLogin = () => {
    if (username === 'admin' && password === '123456') {
      setLoginError(null);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      setLoginError('帳號或密碼錯誤');
    }
  };

  const handleAzureSSO = () => {
    alert('Azure SSO 登入功能開發中');
  };

  const playGame = () => {
    setShowGameInput(true);
  };

  const handlePK = () => {
    if (userNumber === null) {
      setGameResult('');
      return;
    }

    setTimeout(() => {
      const aiNumber = Math.floor(Math.random() * 10) + 1;
      if (userNumber > aiNumber) {
        setGameResult(`你贏了！你的數字是 ${userNumber}，系統的數字是 ${aiNumber}`);
        localStorage.setItem('isAuthenticated', 'true');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setGameResult(`你輸了！你的數字是 ${userNumber}，系統的數字是 ${aiNumber}`);
      }
    }, 1000);
  };

  return (
    <LoginContainer>
      <LoginBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ImageSection>
          <LogoImage 
            src="/logo.png"
            alt="個案管理系統"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          />
        </ImageSection>
        <FormSection>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
            歡迎回來
          </Typography>
          
          <TextField
            label="帳號"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="密碼"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
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
          />
          
          {loginError && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
              {loginError}
            </Typography>
          )}

          <StyledButton
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleLogin}
          >
            登入系統
          </StyledButton>

          <StyledButton
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAzureSSO}
          >
            使用 Azure SSO 登入
          </StyledButton>

          <StyledButton
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={playGame}
            startIcon={<Casino />}
          >
            比大小登入
          </StyledButton>

          {showGameInput && (
        <Box display="flex" paddingTop={2} gap={2} alignItems="center">
          <TextField
            
            label="輸入一個數字 (1-10)"
            type="number"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#4caf50', // ✅ 邊框顏色
                },
                '&:hover fieldset': {
                  borderColor: '#4caf50', // ✅ 滑鼠移上去
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1b5e20', // ✅ 聚焦時
                },
              },
            }}
            fullWidth
            value={userNumber !== null ? userNumber : ''}
            onChange={(e) => setUserNumber(Number(e.target.value))}
          />
          <StyledButton
            variant="outlined"
            color="secondary"
            onClick={handlePK}
            sx={{ height: '56px' }} // 跟 TextField 高度一致
          >
            PK
          </StyledButton>
        </Box>
)}

          {gameResult && (
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ 
                mt: 2, 
                p: 2, 
                bgcolor: 'rgba(46, 125, 50, 0.1)',
                borderRadius: 1,
                color: '#2e7d32'
              }}
            >
              {gameResult}
            </Typography>
          )}

          <Box mt={3} textAlign="center">
            <Link href="#" variant="body2" sx={{ color: '#2e7d32' }}>
              忘記密碼？
            </Link>
          </Box>
        </FormSection>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;