import React from 'react';
import { Box, Button } from '@mui/material';

interface TabSelectorProps {
  activeTab: 'weekly' | 'alltime';
  onTabChange: (tab: 'weekly' | 'alltime') => void;
}

export default function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0.5,
        mb: 3,
        justifyContent: 'space-evenly',
        backgroundColor: '#21175B',
        borderRadius: '25px',
        padding: '5px',
        position: 'relative',
      }}
    >
      {/* Sliding Background Indicator */}
      <Box
        sx={{
          position: 'absolute',
          top: '5px',
          left: activeTab === 'weekly' ? '5px' : 'calc(50% - 5px)',
          width: 'calc(50% - 5px)',
          height: 'calc(100% - 10px)',
          backgroundColor: 'white',
          borderRadius: '20px',
          transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 12px rgba(255,255,255,0.3)',
          zIndex: 0,
        }}
      />

      <Button
        onClick={() => onTabChange('weekly')}
        sx={{
          flex: 1,
          backgroundColor: 'transparent',
          color: activeTab === 'weekly' ? '#4848DB' : 'white',
          borderRadius: 10,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 700,
          fontSize: 16,
          border: 'none',
          transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1,
          position: 'relative',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        Weekly
      </Button>
      <Button
        onClick={() => onTabChange('alltime')}
        sx={{
          flex: 1,
          backgroundColor: 'transparent',
          color: activeTab === 'alltime' ? '#4848DB' : 'white',
          borderRadius: 10,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 700,
          fontSize: 16,
          border: 'none',
          transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1,
          position: 'relative',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        All Time
      </Button>
    </Box>
  );
}
