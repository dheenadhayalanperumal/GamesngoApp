'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography, Button, IconButton, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StarIcon from '@mui/icons-material/Star';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TabBar from '@/components/TabBar';
import DindugalImg from '../assets/images/banner/dindugal.svg';
import NadanaImg from '../assets/images/banner/nadana.svg';

interface Outlet {
  id: number;
  name: string;
  address: string;
  location?: {
    city: string;
    state: string;
  };
}

interface OutletsResponse {
  status: string;
  outlets: Outlet[];
  message?: string;
}

const restaurantGameData = {
  1: {
    id: 1,
    name: 'Dindigul Thalapakatti',
    image: DindugalImg,
    rating: 5.0,
    genre: 'Score Based Coins + Coupons',
    description: 'Experience authentic South Indian cuisine in this exciting restaurant game!',
    howToPlay: [
      'Tap left/right to move falling',
      'Tap bottom to rotate blocks',
      'Complete horizontal lines to score',
      'Game ends when blocks reach the top'
    ],
    howGamesNGoWorks: [
      'Tap left/right to move falling',
      'Tap bottom to rotate blocks', 
      'Complete horizontal lines to score',
      'Game ends when blocks reach the top'
    ]
  },
  2: {
    id: 2,
    name: 'Nandana Palace',
    image: NadanaImg,
    rating: 4.8,
    genre: 'Score Based Coins + Coupons',
    description: 'Master the art of royal cooking in this palace kitchen simulation!',
    howToPlay: [
      'Tap left/right to move falling',
      'Tap bottom to rotate blocks',
      'Complete horizontal lines to score',
      'Game ends when blocks reach the top'
    ],
    howGamesNGoWorks: [
      'Tap left/right to move falling',
      'Tap bottom to rotate blocks',
      'Complete horizontal lines to score', 
      'Game ends when blocks reach the top'
    ]
  }
};

const RestaurantGameDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const gameId = parseInt(params.id as string);
  // gameId is actually the shopId (vendor ID) for restaurant games
  const shopId = gameId;

  const game = restaurantGameData[gameId as keyof typeof restaurantGameData];
  const [showOutletSheet, setShowOutletSheet] = useState(false);
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [isLoadingOutlets, setIsLoadingOutlets] = useState(false);
  const [outletsError, setOutletsError] = useState<string | null>(null);

  // Fetch outlets function - must be defined before useEffect
  const fetchOutlets = useCallback(async () => {
    try {
      setIsLoadingOutlets(true);
      setOutletsError(null);

      const response = await fetch(`/api/public/vendors/${shopId}/outlets`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data: OutletsResponse = await response.json();

      if (response.ok && data.status === 'success') {
        setOutlets(data.outlets || []);
      } else {
        setOutletsError(data.message || 'Failed to fetch outlets');
        setOutlets([]);
      }
    } catch (err) {
      console.error('Error fetching outlets:', err);
      setOutletsError('Failed to fetch outlets. Please try again.');
      setOutlets([]);
    } finally {
      setIsLoadingOutlets(false);
    }
  }, [shopId]);

  // Fetch outlets when outlet sheet is opened
  useEffect(() => {
    if (showOutletSheet && shopId) {
      fetchOutlets();
    }
  }, [showOutletSheet, shopId, fetchOutlets]);

  const handleBack = () => {
    router.back();
  };

  const handleShowOutletSheet = () => {
    setShowOutletSheet(true);
  };

  const handleHideOutletSheet = () => {
    setShowOutletSheet(false);
  };

  const handleSelectOutlet = (outlet: Outlet) => {
    console.log(`Selected outlet: ${outlet.name}`);
    setShowOutletSheet(false);
  };

  // Early return after all hooks - React Hooks must be called unconditionally
  if (!game) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <h2 style={{ color: '#2d2350' }}>Game Not Found</h2>
        <p style={{ color: '#666' }}>The requested game could not be found.</p>
      </div>
    );
  }

  return (
    <Box sx={{ 
      // width: '100%', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      paddingBottom: '100px',
      mx: '-15px',
      
      '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      '@keyframes slideUp': {
        from: { transform: 'translateY(100%)' },
        to: { transform: 'translateY(0)' }
      }
    }}>
      {/* Header with blue background */}
      <Box
        sx={{
          backgroundColor: '#1E3A8A',
          py: 2,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          
          top: 0,
          zIndex: 1000
        }}
      >
        <Button
          startIcon={<ArrowBackIcon sx={{ color: 'white' }} />}
          onClick={handleBack}
          sx={{
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Back
        </Button>
        
        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountBalanceWalletIcon sx={{ color: 'white' }} />
          <Typography sx={{ color: 'white', fontWeight: 600 }}>Wallet</Typography>
          <KeyboardArrowDownIcon sx={{ color: 'white' }} />
        </Box> */}
      </Box>

      {/* Game Banner */}
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          // mt: '1px',
         // background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          borderRadius: '0 0 20px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          overflow: 'hidden'
        }}
      >
        <img
          src={game.image.src}
          alt={game.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '20px'
          }}
        />
      </Box>

      <Box sx={{ px: 2 }}>
        {/* Game Title */}
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#333',
            mb: 1,
            lineHeight: 1.2
          }}
        >
          {game.name}
        </Typography>

        {/* Game Tag Line */}
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#333',
            mb: 2
          }}
        >
          Game Tag Line
        </Typography>

        {/* Rating and Rewards */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <StarIcon sx={{ color: '#FFD700', fontSize: '20px' }} />
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#333'
            }}
          >
            {game.rating}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              color: '#333',
              mx: 1
            }}
          >
            •
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#333'
            }}
          >
            {game.genre}
          </Typography>
        </Box>

        {/* Play Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="contained"
            onClick={handleShowOutletSheet}
            sx={{
              backgroundColor: '#FAC200',
              color: '#333',
              textTransform: 'none',
              fontWeight: 700,
              px: 4,
              py: 1,
              borderRadius: '12px',
              fontSize: '16px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#E6B000',
                boxShadow: 'none',
              },
            }}
          >
            <Typography sx={{ fontWeight: 700,fontSize: '22px',color: '#fff' }}>Play</Typography>
            <Box sx={{ 
              position: 'absolute', 
              right: '24px',
              display: 'flex', 
              gap: 0.5 
            }}>
              <img src="/images/banner/playarrow.svg" alt="play" />
              
            </Box>
          </Button>
        </Box>

        {/* How To Play Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#333',
              mb: 2
            }}
          >
            How To Play ?
          </Typography>
          <Box component="ul" sx={{
            color: '#333',
            lineHeight: 1.8,
            pl: 2,
            m: 0,
            '& li': {
              mb: 1,
              fontSize: '16px',
              fontWeight: 400
            }
          }}>
            {game.howToPlay.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </Box>
        </Box>

        {/* How Games N Go Works Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#333',
              mb: 2
            }}
          >
            How Games N Go Works ?
          </Typography>
          <Box component="ul" sx={{
            color: '#333',
            lineHeight: 1.8,
            pl: 2,
            m: 0,
            '& li': {
              mb: 1,
              fontSize: '16px',
              fontWeight: 400
            }
          }}>
            {game.howGamesNGoWorks.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Select Outlet Bottom Sheet */}
      {showOutletSheet && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-end',
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={handleHideOutletSheet}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              width: '100%',
              maxHeight: '70vh',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              animation: 'slideUp 0.3s ease-out',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 3,
                borderBottom: '1px solid #f0f0f0'
              }}
            >
              <IconButton
                onClick={handleHideOutletSheet}
                sx={{
                  color: '#666',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <KeyboardArrowDownIcon sx={{ fontSize: '28px' }} />
              </IconButton>
              
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#2d2350',
                  flex: 1,
                  textAlign: 'center',
                  mr: 5 // Offset for the close button
                }}
              >
                Select Outlet
              </Typography>
            </Box>

            {/* Outlet List */}
            <Box
              sx={{
                maxHeight: '50vh',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#c1c1c1',
                  borderRadius: '2px',
                },
              }}
            >
              {isLoadingOutlets ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                  <CircularProgress size={40} sx={{ color: '#FAC200' }} />
                </Box>
              ) : outletsError ? (
                <Box sx={{ p: 3 }}>
                  <Alert severity="error">{outletsError}</Alert>
                </Box>
              ) : outlets.length === 0 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography sx={{ color: '#666', fontSize: '14px' }}>
                    No outlets available for this vendor.
                  </Typography>
                </Box>
              ) : (
                outlets.map((outlet) => (
                  <Box
                    key={outlet.id}
                    onClick={() => handleSelectOutlet(outlet)}
                    sx={{
                      p: 3,
                      borderBottom: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#f8f9fa'
                      },
                      '&:last-child': {
                        borderBottom: 'none'
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#2d2350',
                        mb: 0.5
                      }}
                    >
                      {outlet.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: '#666',
                        lineHeight: 1.4
                      }}
                    >
                      {outlet.address}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      )}

      {/* Bottom Navigation Bar */}
      <TabBar />
    </Box>
  );
};

export default RestaurantGameDetailPage;