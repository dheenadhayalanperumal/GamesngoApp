'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

const CoinSVG: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
    <text x="12" y="16" fontSize="12" textAnchor="middle" fill="#FFA500" fontWeight="bold">G</text>
  </svg>
);

interface CoinBoxProps {
  coinCount: number;
}

const CoinBox: React.FC<CoinBoxProps> = ({ coinCount = 1250 }) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #FC78A2 100%, #F32868 100%)',
        borderRadius: '12px',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        minWidth: '42px',
        boxShadow: '0 4px 12px rgba(252, 120, 162, 0.3)',
      }}
    >
      <CoinSVG />
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: '12px',
          textAlign: 'center',
        }}
      >
        {coinCount.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default CoinBox;