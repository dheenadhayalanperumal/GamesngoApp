"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface HeaderWithBackProps {
  title?: string;
  backgroundColor?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

function HeaderWithBack({ 
  title = "Back", 
  backgroundColor = '#3C3CD2',
  showBackButton = true,
  onBackClick
}: HeaderWithBackProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: backgroundColor,
      padding: '24px 24px 24px 20px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: 1
    }}>
      {showBackButton && (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            cursor: 'pointer' 
          }} 
          onClick={handleBackClick}
        >
          <ArrowBack sx={{ color: 'white', fontSize: 20 }} />
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white', 
              fontWeight: 500,
              fontSize: '16px'
            }}
          >
            {title}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default HeaderWithBack;
