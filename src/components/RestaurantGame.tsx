'use client';

import { Box, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OutletSelectionPopup from './OutletSelectionPopup';
const defaultRestaurants = [
  {
    id: 1,
    name: 'Dindigul Thalapakatti',
    image: '/images/banner/restaurant1.svg',
    rating: 4.8,
    genre: 'Arcade',
    duration: '5 min',
    logoUrl: '/images/banner/restaurant1.svg',
    location: { city: 'Chennai', state: 'TN' },
    activeOffers: 3,
  },
  {
    id: 2,
    name: 'Nandana Palace',
    image: '/images/banner/nadana.svg',
    rating: 4.6,
    genre: 'Cooking',
    duration: '7 min',
    logoUrl: '/images/banner/nadana.svg',
    location: { city: 'Chennai', state: 'TN' },
    activeOffers: 2,
  },
  {
    id: 3,
    name: 'Dindigul Thalapakatti',
    image: '/images/banner/restaurant1.svg',
    rating: 4.7,
    genre: 'Simulation',
    duration: '6 min',
    logoUrl: '/images/banner/restaurant1.svg',
    location: { city: 'Chennai', state: 'TN' },
    activeOffers: 1,
  },
  {
    id: 4,
    name: 'Dindigul Thalapakatti',
    image: '/images/banner/restaurant1.svg',
    rating: 4.7,
    genre: 'Simulation',
    duration: '6 min',
    logoUrl: '/images/banner/restaurant1.svg',
    location: { city: 'Chennai', state: 'TN' },
    activeOffers: 5,
  },
];

interface Restaurant {
  id: number;
  name: string;
  logoUrl: string;
  location: {
    city: string;
    state: string;
  };
  activeOffers: number;
}

interface RestaurantGameProps {
  restaurants?: Restaurant[];
}

const RestaurantGame: React.FC<RestaurantGameProps> = ({ restaurants: propRestaurants }) => {
  // Map API restaurants to component format
  const popularGames = propRestaurants && propRestaurants.length > 0
    ? propRestaurants.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        image: restaurant.logoUrl,
        rating: 4.5, // Default rating
        genre: `${restaurant.location.city}, ${restaurant.location.state}`,
        duration: `${restaurant.activeOffers} offers`,
        logoUrl: restaurant.logoUrl,
        location: restaurant.location,
        activeOffers: restaurant.activeOffers,
      }))
    : [];
  const router = useRouter();
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [selectedRestaurantName, setSelectedRestaurantName] = useState<string>('');
  const [isOutletPopupOpen, setIsOutletPopupOpen] = useState(false);

  const handleViewAll1 = () => {
    router.push('/games?tab=restaurant');
  };

  const handleGameClick = (gameId: number, restaurantName: string) => {
    setSelectedShopId(gameId);
    setSelectedRestaurantName(restaurantName);
    setIsOutletPopupOpen(true);
  };

  const handleCloseOutletPopup = () => {
    setIsOutletPopupOpen(false);
    setSelectedShopId(null);
    setSelectedRestaurantName('');
  };

  return (
    <Box sx={{ paddingBottom: '18px', width: '100%',    background: '#FDDFFF',
    paddingTop: '18px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '10px',
    }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 2 }}>
        <Typography
          variant="h5"
          fontWeight={900}
          sx={{
            color: '#2d2350',
            letterSpacing: 0.5,
            mr: 1,
            fontSize: { xs: 16, sm: 22, md: 28 },
          }}
        >
          Restaurant Games  <span role="img" aria-label="fire">🍽️</span>
        </Typography>
        <Button
          variant="text"
          size="small"
          onClick={handleViewAll1}
          sx={{
            textTransform: 'none',
            ml: 'auto',
            fontWeight: 600,
            fontSize: { xs: 12, sm: 15, md: 16 },
            px: { xs: 1, sm: 2 },
            py: { xs: 0.5, sm: 1 },
          }}
        >
          View All
        </Button>
      </Box>
      {popularGames.length > 0 ? (
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
              onClick={() => handleGameClick(game.id, game.name)}
              sx={{
                minWidth: { xs: 152, sm: 180, md: 200, lg: 220 },
                maxWidth: { xs: 152, sm: 220, md: 240, lg: 260 },
                flex: '0 0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                background: '#fff',
                borderRadius: 4,
                boxShadow: 2,
                p: 1,
                mb: 1,
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
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
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }}
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
                  fontSize: { xs: 13, sm: 16, md: 18 },
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
          fontSize: { xs: 14, sm: 18 }
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
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
            px: 2
          }}
        >
          <Typography
            sx={{
              color: '#666',
              fontSize: { xs: '14px', sm: '16px', md: '18px' },
              textAlign: 'center',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            There are no restaurants right now
          </Typography>
        </Box>
      )}

<Typography
        
          fontWeight={400}
          sx={{
            color: '#2d2350',
            letterSpacing: 0.5,
            mr: 1,
    textAlign: 'center',
    paddingTop: '10px',
            fontSize: { xs: 14, sm: 22, md: 28 },
          }}
        >
         Play branded games from your favorite restaurants and win Coupons + coins!
        </Typography>

      {/* Outlet Selection Popup */}
      {selectedShopId && (
        <OutletSelectionPopup
          isOpen={isOutletPopupOpen}
          onClose={handleCloseOutletPopup}
          shopId={selectedShopId}
          restaurantName={selectedRestaurantName}
        />
      )}
    </Box>
  );
};

export default RestaurantGame;