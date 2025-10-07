import React from 'react';
import { Box, Typography } from '@mui/material';
import PodiumCard from './PodiumCard';
import Crown1 from '@/assets/images/crown/crown1.svg';
import Crown2 from '@/assets/images/crown/crown2.svg';
import Crown3 from '@/assets/images/crown/crown3.svg';

interface Winner {
  rank: number;
  name: string;
  avatar: string;
  coins: number;
}

interface WinnerPodiumProps {
  winners: Winner[];
  title: string;
}

export default function WinnerPodium({ winners, title }: WinnerPodiumProps) {
  // Sort winners by rank to ensure proper order
  const sortedWinners = [...winners].sort((a, b) => a.rank - b.rank);
  const secondPlace = sortedWinners.find((w) => w.rank === 2);
  const firstPlace = sortedWinners.find((w) => w.rank === 1);
  const thirdPlace = sortedWinners.find((w) => w.rank === 3);

  const getCrown = (rank: number) => {
    if (rank === 1) return Crown2;
    if (rank === 2) return Crown1;
    if (rank === 3) return Crown3;
    return undefined;
  };

  return (
    <>
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          mb: 2,
          fontSize: { xs: 16, sm: 18 },
        }}
      >
        {title}
      </Typography>

      {/* Winner Badge */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography
          sx={{
            color: '#FFD700',
            fontWeight: 1000,
            fontSize: { xs: 28, sm: 32 },
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: 2,
          }}
        >
          - WINNER -
        </Typography>
      </Box>

      {/* Top 3 Podium */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          mb: 4,
          gap: 2,
        }}
      >
        {/* 2nd Place */}
        {secondPlace && (
          <PodiumCard
            rank={secondPlace.rank}
            name={secondPlace.name}
            avatar={secondPlace.avatar}
            coins={secondPlace.coins}
            crownIcon={getCrown(secondPlace.rank)}
          />
        )}

        {/* 1st Place */}
        {firstPlace && (
          <PodiumCard
            rank={firstPlace.rank}
            name={firstPlace.name}
            avatar={firstPlace.avatar}
            coins={firstPlace.coins}
            crownIcon={getCrown(firstPlace.rank)}
          />
        )}

        {/* 3rd Place */}
        {thirdPlace && (
          <PodiumCard
            rank={thirdPlace.rank}
            name={thirdPlace.name}
            avatar={thirdPlace.avatar}
            coins={thirdPlace.coins}
            crownIcon={getCrown(thirdPlace.rank)}
          />
        )}
      </Box>
    </>
  );
}
