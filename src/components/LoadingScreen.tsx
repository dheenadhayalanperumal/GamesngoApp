'use client';

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '../assets/images/logo.png';

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4848DB',
        zIndex: 9999,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          marginBottom: '30px',
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              transform: 'scale(1)',
              opacity: 1,
            },
            '50%': {
              transform: 'scale(1.05)',
              opacity: 0.8,
            },
          },
        }}
      >
        <Image
          src={logo}
          alt="Games N Go"
          width={120}
          height={120}
          style={{ objectFit: 'contain' }}
        />
      </Box>

      {/* Loading Spinner */}
      <CircularProgress
        size={50}
        thickness={4}
        sx={{
          color: '#FFD700',
          marginBottom: '20px',
        }}
      />

      {/* Loading Text */}
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '10px',
        }}
      >
        Loading...
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '14px',
        }}
      >
        Please wait while we prepare your experience
      </Typography>
    </Box>
  );
};

export default LoadingScreen;

