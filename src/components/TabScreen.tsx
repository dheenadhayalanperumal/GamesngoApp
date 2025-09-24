'use client';

import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabScreen: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="game tabs">
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Games" {...a11yProps(1)} />
          <Tab label="Tournaments" {...a11yProps(2)} />
          <Tab label="Leaderboard" {...a11yProps(3)} />
          <Tab label="Profile" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Typography variant="h4" gutterBottom>
          Welcome to GamesNGo
        </Typography>
        <Typography variant="body1">
          This is the home screen where you can see featured games, recent activities, and quick access to popular features.
        </Typography>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography variant="h4" gutterBottom>
          Games
        </Typography>
        <Typography variant="body1">
          Browse and discover various games available on our platform. Filter by category, popularity, or newest releases.
        </Typography>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography variant="h4" gutterBottom>
          Tournaments
        </Typography>
        <Typography variant="body1">
          Join exciting tournaments and compete with players from around the world. View upcoming events and prize pools.
        </Typography>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Typography variant="h4" gutterBottom>
          Leaderboard
        </Typography>
        <Typography variant="body1">
          Check your ranking and see how you compare to other players. View global and game-specific leaderboards.
        </Typography>
      </TabPanel>

      <TabPanel value={value} index={4}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1">
          Manage your profile, view your game statistics, achievements, and customize your gaming experience.
        </Typography>
      </TabPanel>
    </Box>
  );
};

export default TabScreen;