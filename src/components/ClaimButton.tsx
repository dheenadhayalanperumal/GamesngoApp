'use client';

import React from 'react';
import { Button } from '@mui/material';

interface ClaimButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({
  onClick,
  disabled = false,
  text = 'Claim'
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        color: '#2c3e50',
        fontWeight: 'bold',
        fontSize: {
          xs: '14px',
          sm: '16px',
          md: '18px'
        },
        padding: {
          xs: '12px 24px',
          sm: '14px 28px',
          md: '16px 32px'
        },
        borderRadius: {
          xs: '50px',
          sm: '50px',
          md: '50px'
        },
        textTransform: 'none',
        boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)',
        '&:hover': {
          background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
          boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4)',
          transform: 'translateY(-2px)',
        },
        '&:disabled': {
          background: '#e0e0e0',
          color: '#9e9e9e',
          boxShadow: 'none',
        }
      }}
    >
      {text}
    </Button>
  );
};

export default ClaimButton;