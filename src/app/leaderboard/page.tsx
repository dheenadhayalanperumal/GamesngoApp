'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import TabSelector from '@/components/leaderboard/TabSelector';
import WinnerPodium from '@/components/leaderboard/WinnerPodium';
import PrizesSection from '@/components/leaderboard/PrizesSection';
import PlayersList from '@/components/leaderboard/PlayersList';

const pastWeekWinners = [
  {
    rank: 2,
    name: 'Joe',
    avatar: '/avatar1.jpg',
    coins: 499,
  },
  {
    rank: 1,
    name: 'Jonitha',
    avatar: '/avatar2.jpg',
    coins: 482,
  },
  {
    rank: 3,
    name: 'Rithu',
    avatar: '/avatar3.jpg',
    coins: 482,
  },
];

const allTimeWinners = [
  {
    rank: 2,
    name: 'Alex',
    avatar: '/avatar1.jpg',
    coins: 8500,
  },
  {
    rank: 1,
    name: 'Sarah',
    avatar: '/avatar2.jpg',
    coins: 9200,
  },
  {
    rank: 3,
    name: 'Mike',
    avatar: '/avatar3.jpg',
    coins: 7800,
  },
];

const allTimePlayers = [
  { rank: 1, name: 'Sarah', avatar: '/avatar2.jpg', score: 125000, coins: 9200 },
  { rank: 2, name: 'Alex', avatar: '/avatar1.jpg', score: 118500, coins: 8500 },
  { rank: 3, name: 'Mike', avatar: '/avatar3.jpg', score: 112000, coins: 7800 },
  { rank: 4, name: 'Emma', avatar: '/avatar4.jpg', score: 98000, coins: 6500 },
  { rank: 5, name: 'John', avatar: '/avatar4.jpg', score: 89000, coins: 5800 },
  { rank: 6, name: 'Lisa', avatar: '/avatar4.jpg', score: 82000, coins: 5200 },
];

const thisWeekPlayers = [
  { rank: 1, name: 'saj', avatar: '/avatar4.jpg', score: 2651, coins: 500 },
  { rank: 2, name: 'jay', avatar: '/avatar4.jpg', score: 2651, coins: 500 },
  { rank: 3, name: 'sanjay', avatar: '/avatar4.jpg', score: 2651, coins: 492 },
  { rank: 4, name: 'Vinith', avatar: '/avatar4.jpg', score: 2651, coins: 481 },
  { rank: 5, name: 'Bejoy', avatar: '/avatar4.jpg', score: 2651, coins: 480 },
  { rank: 6, name: 'Vijay', avatar: '/avatar4.jpg', score: 2651, coins: 480 },
];

const prizes = [
  { rank: 1, coins: 1000 },
  { rank: 2, coins: 800 },
  { rank: 3, coins: 600 },
  { rank: 4, coins: 500 },
  { rank: 5, coins: 400 },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'alltime'>('weekly');

  const currentWinners = activeTab === 'weekly' ? pastWeekWinners : allTimeWinners;

  return (
    <>
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, #3C3CD2 0%, #3C3CD2 100%)',
        zIndex: -1,
      }} />

      <Header sx={{
        backgroundColor: '#4848DB',
        textAlign: 'center',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }} />

      {/* Main Content */}
      <Box sx={{ px: "0px", pt: 6, pb: 10 }}>
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            color: 'white',
            textAlign: 'center',
            mt:7,
            mb: 3,
            fontSize: { xs: 28, sm: 32, md: 36 },
          }}
        >
          Leader Board
        </Typography>

        {/* Weekly/All Time Tabs */}
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Winner Podium */}
        <WinnerPodium
          winners={currentWinners}
          title={activeTab === 'weekly' ? 'Past Week Result' : 'All Time Result'}
        />

        {/* Prizes Section */}
        <PrizesSection prizes={prizes} />

        {/* This Week Players List */}
        <PlayersList players={thisWeekPlayers} />
      </Box>

      {/* Tab Bar */}
      <TabBar />
    </>
  );
}
