'use client';

import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {
  SportsEsports as GamesIcon,
  Leaderboard as LeaderIcon,
  Home as HomeIcon,
  Redeem as RedeemIcon,
  Event as EventsIcon
} from '@mui/icons-material';

const TabBar: React.FC = () => {
  const [value, setValue] = useState(2); // Home is initially active (index 2)

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: '20px 20px 0 0',
        backgroundColor: '#f5f5f5'
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: 'transparent',
          borderRadius: '20px 20px 0 0',
          paddingTop: '12px',
          paddingBottom: '0px',
          height: 'auto',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            paddingTop: '8px',
            '&.Mui-selected': {
              '& .MuiSvgIcon-root': {
                backgroundColor: '#5855D6',
                color: 'white',
                borderRadius: '50%',
                padding: '12px',
                fontSize: '1.5rem',
                width: '48px',
                height: '48px',
              },
              '& .MuiBottomNavigationAction-label': {
                color: '#5855D6',
                fontSize: '12px',
                marginTop: '8px',
              }
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '12px',
              marginTop: '8px',
              color: '#8E8E93',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1.5rem',
            }
          }
        }}
      >
        <BottomNavigationAction
          label="Games"
          icon={<GamesIcon />}
          sx={{ color: '#8E8E93' }}
        />
        <BottomNavigationAction
          label="Leader"
          icon={<LeaderIcon />}
          sx={{ color: '#8E8E93' }}
        />
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={{ color: '#8E8E93' }}
        />
        <BottomNavigationAction
          label="Redeem"
          icon={<RedeemIcon />}
          sx={{ color: '#8E8E93' }}
        />
        <BottomNavigationAction
          label="Events"
          icon={<EventsIcon />}
          sx={{ color: '#8E8E93' }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default TabBar;