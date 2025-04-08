import React from 'react';
import styled from '@emotion/styled';

const LoginContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  margin: 0,
  backgroundColor: '#e493d0',
  backgroundImage: `
    radial-gradient(closest-side, rgba(235, 105, 78, 1), rgba(235, 105, 78, 0)),
    radial-gradient(closest-side, rgba(243, 11, 164, 1), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side, rgba(254, 234, 131, 1), rgba(254, 234, 131, 0)),
    radial-gradient(closest-side, rgba(170, 142, 245, 1), rgba(170, 142, 245, 0)),
    radial-gradient(closest-side, rgba(248, 192, 147, 1), rgba(248, 192, 147, 0))
  `,
  backgroundSize: `
    130vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax 90vmax
  `,
  backgroundPosition: `
    -80vmax -80vmax,
    60vmax -30vmax,
    10vmax 10vmax,
    -30vmax -10vmax,
    50vmax 50vmax
  `,
  backgroundRepeat: 'no-repeat',
  animation: 'background-animation 10s linear infinite',
  '@keyframes background-animation': {
    '0%, 100%': {
      backgroundPosition: `
        -80vmax -80vmax,
        60vmax -30vmax,
        10vmax 10vmax,
        -30vmax -10vmax,
        50vmax 50vmax
      `
    },
    '25%': {
      backgroundPosition: `
        -80vmax 80vmax,
        -30vmax 60vmax,
        -10vmax 10vmax,
        -10vmax -30vmax,
        -50vmax 50vmax
      `
    },
    '50%': {
      backgroundPosition: `
        80vmax 80vmax,
        -30vmax -60vmax,
        -10vmax -10vmax,
        30vmax -10vmax,
        -50vmax -50vmax
      `
    },
    '75%': {
      backgroundPosition: `
        80vmax -80vmax,
        30vmax -60vmax,
        10vmax -10vmax,
        10vmax 30vmax,
        50vmax -50vmax
      `
    }
  }
});

const Login: React.FC = () => {
  return (
    <LoginContainer>
      {/* Login form content */}
    </LoginContainer>
  );
};

export default Login; 