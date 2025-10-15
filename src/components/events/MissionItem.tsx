'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

export interface MissionItemData {
  id: number;
  title: string;
  description: string;
  emoji?: string;
}

interface MissionItemProps {
  item: MissionItemData;
  index: number;
  titleColor?: string;
  descriptionColor?: string;
}

const MissionItem: React.FC<MissionItemProps> = ({
  item,
  index,
  titleColor = '#21175B',
  descriptionColor = '#21175B',
}) => {
  return (
    <Box>
      <Typography
        sx={{
          color: titleColor,
          fontFamily: 'Inter',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '15px',
          mb: 1.5,
        }}
      >
        {index + 1}. {item.title} {item.emoji && item.emoji}
      </Typography>
      <Typography
        sx={{
          color: descriptionColor,
          fontFamily: 'Inter',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '20px',
          ml: 2,
        }}
      >
        • {item.description}
      </Typography>
    </Box>
  );
};

export default MissionItem;
