import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import Image from 'next/image';
import CoinIcon from '@/assets/icons/coin.png';

interface PlayerCardProps {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  coins: number;
  isCurrentUser?: boolean;
}

export default function PlayerCard({
  rank,
  name,
  avatar,
  score,
  coins,
  isCurrentUser = false,
}: PlayerCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor: isCurrentUser ? '#C8E6C9' : '#F5F5F5',
        borderRadius: 3,
        p: 2,
      }}
    >
      {/* Rank */}
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: 18,
          color: '#2d2350',
          minWidth: 20,
        }}
      >
        {rank}
      </Typography>

      {/* Avatar */}
      <Avatar src={avatar} sx={{ width: 48, height: 48 }} />

      {/* Name and Score */}
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#2d2350' }}>
          {name}
        </Typography>
        {/* <Typography sx={{ fontSize: 14, color: '#888' }}>
          {coins} Scores
        </Typography> */}
      </Box>

      {/* Coins Badge */}
      <Box
        sx={{
          backgroundColor: '#4848DB',
          borderRadius: 10,
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {/* <Image src={CoinIcon} alt="Coin" width={18} height={18} /> */}
        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>
          {score}
        </Typography>
      </Box>
    </Box>
  );
}
