'use client';

import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';

const popularGames = [
  {
    id: 1,
    name: 'Bubble Shooter',
    image: '/images/banner/bubble_shooter.svg',
    rating: 4.8,
    genre: 'Arcade',
    duration: '5 min',
  },
  {
    id: 2,
    name: 'Burger Maker',
    image: '/images/banner/burger_maker.svg',
    rating: 4.6,
    genre: 'Cooking',
    duration: '7 min',
  },
  {
    id: 3,
    name: 'Chef Master',
    image: '/images/banner/burger_maker.svg',
    rating: 4.7,
    genre: 'Simulation',
    duration: '6 min',
  },
  {
    id: 4,
    name: 'Chef Master',
    image: '/images/banner/burger_maker.svg',
    rating: 4.7,
    genre: 'Simulation',
    duration: '6 min',
  },
];


const PopularToday = () => {
  const router = useRouter();

  const handleGameClick = (gameId: number) => {
    router.push(`/games/${gameId}`);
  };
  const handleViewAll = () => {
    router.push('/games');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 2 }}>
        <Typography
          variant="h5"
          fontWeight={900}
          sx={{
            color: '#2d2350',
            letterSpacing: 0.5,
            mr: 1,
            fontSize: { xs: 18, sm: 22, md: 28 },
          }}
        >
          Popular Today <span role="img" aria-label="fire">🔥</span>
        </Typography>
        <Button
          variant="text"
          size="small"
          onClick={handleViewAll}
          sx={{
            textTransform: 'none',
            ml: 'auto',
            fontWeight: 600,
            fontSize: { xs: 13, sm: 15, md: 16 },
            px: { xs: 1, sm: 2 },
            py: { xs: 0.5, sm: 1 },
          }}
        >
          View All
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          gap: 2,
          width: '100%',
          pb: 1,
          overflowX: 'auto',
          msOverflowStyle: 'none', // IE and Edge
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari
        }}
      >
        {popularGames.map((game) => (
          <Box
            key={game.id}
            onClick={() => handleGameClick(game.id)}
            sx={{
              minWidth: { xs: 152, sm: 180, md: 200, lg: 220 },
              maxWidth: { xs: 152, sm: 220, md: 240, lg: 260 },
              flex: '0 0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
              /*background: '#fff',
              borderRadius: 4,
              boxShadow: 2,
              p: 1,
              mb: 1,*/
            }}
          >
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                background: '#fff',
                borderRadius: 4,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <img
                src={game.image}
                alt={game.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18 }}
              />
            </Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{
                color: '#222',
                mb: 0.2,
                width: '100%',
                textAlign: 'left',
                fontSize: { xs: 15, sm: 16, md: 18 },
                whiteSpace: { xs: 'normal', sm: 'nowrap' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.2,
              }}
              title={game.name}
            >
              {game.name}
            </Typography>
            <Box sx={{ 
  display: 'flex', 
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: { xs: 0.5, sm: 1 },
  rowGap: 0.5
}}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ 
      fontSize: 'clamp(16px, 4vw, 20px)', 
      color: '#FFD700', 
      marginRight: 4, 
      fontWeight: 900 
    }}>★</span>
    <Typography 
      variant="body1" 
      fontWeight={900} 
      sx={{ 
        color: '#222', 
        fontSize: { xs: 16, sm: 18 }
      }}
    >
      {game.rating}
    </Typography>
  </Box>
  
  <Typography 
    variant="caption" 
    sx={{ 
      color: '#888', 
      fontWeight: 600,
      fontSize: { xs: '0.7rem', sm: '0.75rem' }
    }}
  >
    {game.genre}
  </Typography>
  
  <Typography 
    variant="caption" 
    sx={{ 
      color: '#888', 
      fontWeight: 600,
      fontSize: { xs: '0.7rem', sm: '0.75rem' }
    }}
  >
    {game.duration}
  </Typography>
</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PopularToday;