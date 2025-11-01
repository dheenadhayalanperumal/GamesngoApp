'use client';

import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {
  SportsEsports as GamesIcon,
  Leaderboard as LeaderIcon,
  Home as HomeIcon,
  Redeem as RedeemIcon,
  Event as EventsIcon
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

const TabBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(2); // Home is initially active (index 2)

  // Update active tab based on current route
  useEffect(() => {
    if (pathname === '/') {
      setValue(2); // Home
    } else if (pathname.startsWith('/games')) {
      setValue(0); // Games
    } else if (pathname.startsWith('/leaderboard')) {
      setValue(1); // Leader
    } else if (pathname.startsWith('/events')) {
      setValue(4); // Events
    } else if (pathname.startsWith('/redeem')) {
      setValue(3); // Redeem
    }
  }, [pathname]);

  const handleNavigation = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        router.push('/games');
        break;
      case 1:
        router.push('/leaderboard');
        break;
      case 2:
        router.push('/');
        break;
      case 3:
        router.push('/redeem');
        break;
      case 4:
        router.push('/events');
        break;
    }
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: '10px 10px 0 0',
        backgroundColor: '#f5f5f5'
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigation}
        sx={{
          backgroundColor: 'transparent',
          borderRadius: '20px 20px 0 0',
          paddingTop: '5px',
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