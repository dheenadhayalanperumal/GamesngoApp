import React from 'react';
import { Box, Typography } from '@mui/material';
import PlayerCard from './PlayerCard';

interface Player {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  coins: number;
}

interface PlayersListProps {
  players: Player[];
  title?: string;
}

export default function PlayersList({ players, title = 'This Week' }: PlayersListProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        pt: 3,
        px: 2,
        pb: 2,
        minHeight: 400,
      }}
    >
      {/* Handle indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <Box
          sx={{
            width: 60,
            height: 4,
            backgroundColor: '#E0E0E0',
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          color: '#2d2350',
          fontWeight: 800,
          mb: 3,
          fontSize: { xs: 20, sm: 24 },
        }}
      >
        {title}
      </Typography>

      {/* Players List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            rank={player.rank}
            name={player.name}
            avatar={player.avatar}
            score={player.score}
            coins={player.coins}
          />
        ))}
      </Box>
    </Box>
  );
}
