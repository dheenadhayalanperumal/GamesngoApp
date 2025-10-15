'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
  message: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  padding?: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  fontSize = 18,
  fontWeight = 600,
  color = '#666',
  padding = 8,
}) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: padding,
      }}
    >
      <Typography
        sx={{
          fontSize,
          fontWeight,
          color,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;
