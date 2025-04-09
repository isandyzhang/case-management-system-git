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
    radial-gradient(closest-side, rgb(159, 235, 78), rgba(235, 105, 78, 0)),
    radial-gradient(closest-side, rgb(11, 243, 11), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side, hsl(141, 98.40%, 75.50%), rgba(254, 234, 131, 0)),
    radial-gradient(closest-side, hsl(120, 83.70%, 75.90%), rgba(170, 142, 245, 0)),
    radial-gradient(closest-side, hsl(159, 87.80%, 77.50%), rgba(248, 192, 147, 0))
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