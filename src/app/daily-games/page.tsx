'use client';

import React from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import HeaderWithBack from '@/components/HeaderWithBack';
// Import assets from src so bundler resolves them
import DailyInnerBg from '@/assets/images/banner/dailygame-innerbackground.png';
import DailyInnerImg from '@/assets/images/banner/dailygame-innerimg.png';
import GameImg1 from '@/assets/images/banner/gameimg1.png';
import GameImg2 from '@/assets/images/banner/gameimg2.png';
import GameImg3 from '@/assets/images/banner/gameimg3.png';

const DailyGames = () => {
  const router = useRouter();

  const games = [
    {
      id: 1,
      title: "Word Puzzle",
      category: "Game One Line...",
      tags: ["Action", "2 min"],
      reward: 500,
      status: "completed",
      thumbnail: (GameImg1 as unknown as { src: string }).src || (GameImg1 as unknown as string)
    },
    {
      id: 2,
      title: "Orbit Rush",
      category: "Game One Line...",
      tags: ["Action", "2 min"],
      reward: 500,
      status: "play",
      thumbnail: (GameImg2 as unknown as { src: string }).src || (GameImg2 as unknown as string)
    },
    {
      id: 3,
      title: "Cross Word",
      category: "Game One Line...",
      tags: ["Action", "2 min"],
      reward: 500,
      status: "play",
      thumbnail: (GameImg3 as unknown as { src: string }).src || (GameImg3 as unknown as string)
    }
  ];

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return now.toLocaleDateString('en-US', options);
  };

  const getTimeRemaining = () => {
    // Mock time remaining - 18h 32m
    return "18h 32m";
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      margin: '0 -15px', // Negative margin to counteract the content-container padding
      width: 'calc(100% + 30px)', // Extend width to cover the removed padding
      fontFamily: 'Paytone One, sans-serif',
      fontWeight: '400',
    }}>
      {/* Custom Header */}
     <HeaderWithBack/>
     

      <Box sx={{ padding: 2, paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Daily Games Card */}
        <Box sx={{
        // background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
         backgroundImage: `url(${(DailyInnerBg as unknown as { src: string }).src || (DailyInnerBg as unknown as string)})`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         backgroundRepeat: 'no-repeat',
          borderRadius: '16px',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Timer Badge */}
          <Box sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
              </svg>
            </Box>
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
              {getTimeRemaining()}
            </Typography>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ 
                color: 'white', 
                fontWeight: '400', 
                fontSize: '30px',
                fontFamily: "Paytone One",
                marginBottom: '12px',
                marginTop: '-12px',
              }}>
                Daily Games
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'white', 
                fontSize: '16px',
                marginBottom: '16px',
                opacity: 0.9
              }}>
                {getCurrentDate()}
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'white', 
                fontSize: '16px',
                textAlign: 'left',
                marginBottom: '16px'
              }}>
                Complete all 3 games today to unlock bonus coins!
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '25px' }}>
                  <Box sx={{ width: 30, height: 30, display: 'flex', alignItems: 'center' }}>
                   <img src="/coin.png" alt="bonuscoin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                    + 500 Bonus
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                  1/3 Games Completed
                </Typography>
              </Box>

              {/* Astronaut Illustration */}
              
              <Box 
                sx={{ 
                  display: { xs: 'flex', sm: 'flex' },
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-end',
                  width: { xs: 100, sm: 100, md: 200, lg: 240 },
                  mt: { xs: 0, md: 0 },
                  flexShrink: 0
                }}
              >
                <img 
                  src={(DailyInnerImg as unknown as { src: string }).src || (DailyInnerImg as unknown as string)} 
                  alt="daily games illustration" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} 
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Today Progress Section */}
        <Box sx={{
          backgroundColor: 'rgba(250, 194, 0, 0.20)',
          borderRadius: '16px',
          padding: '20px',
          border: '2px dashed #FFD700'
        }}>
          <Typography variant="h6" sx={{ 
            color: '#374151', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            fontSize: '20px'
          }}>
            Today Progress
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {/* Game 1 - Completed */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              
              <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500, fontSize: '14px' }}>1st Game</Typography>
              <Box sx={{
                width: '40px',
                height: '40px',
                backgroundColor: '#10B981',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                  1
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
                 <img src="/coin.png" alt="coin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
                  100
                </Typography>
              </Box>
            </Box>

            {/* Connecting Line */}
            <Box sx={{ 
              height: '2px', 
              backgroundColor: '#10B981', 
              flex: 1,
              marginTop: '0px'
            }} />

            {/* Game 2 - In Progress */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
             
             <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500, fontSize: '14px' }}>2nd Game</Typography>
              <Box sx={{
                width: '40px',
                height: '40px',
                backgroundColor: '#F59E0B',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                  2
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
                 <img src="/coin.png" alt="coin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
                  150
                </Typography>
              </Box>
            </Box>

            {/* Connecting Line */}
            <Box sx={{ 
              height: '2px', 
              backgroundColor: '#D1D5DB', 
              flex: 1,
              marginTop: '0px'
            }} />

            {/* Game 3 - Pending */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
             
             <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500, fontSize: '14px' }}>3rd Game</Typography>
              <Box sx={{
                width: '40px',
                height: '40px',
                backgroundColor: '#D1D5DB',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                  3
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
                 <img src="/coin.png" alt="coin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Typography variant="body2" sx={{ color: '#9CA3AF', fontWeight: 500 }}>
                  250
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Game List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {games.map((game) => (
            <Box key={game.id} sx={{
              backgroundColor: 'white',
              //borderRadius: '12px',
             // padding: '16px',
              display: 'flex',
              gap: '16px',
             // boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              {/* Game Thumbnail */}
              <Box sx={{
                width: '200px',
                height: '200px',
                backgroundColor: '#F3F4F6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img src={game.thumbnail} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
              </Box>

              {/* Game Details */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ 
                  color: '#21175B', 
                  fontWeight: '700',
                  fontSize: '22px'
                }}>
                  {game.title}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontSize: '16px',
                  fontWeight: '400'
                }}>
                  {game.category}
                </Typography>
                
                {/* Tags */}
                <Box sx={{ display: 'flex', gap: 1, marginY: 1 }}>
                  {game.tags.map((tag, index) => (
                    <Box key={index} sx={{
                      backgroundColor: '#E0E7FF',
                      color: '#6366F1',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 500
                    }}>
                      {tag}
                    </Box>
                  ))}
                </Box>

                {/* Reward and Button */}
                <Box >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 , marginBottom: '10px',}}>
                      <Box sx={{ width: 26, height: 26, display: 'flex', alignItems: 'center' }}>
                        <img src="/coin.png" alt="coin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(0, 0, 0, 0.80)', 
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '0.5px',

                    }}>
                      {game.reward} Coins
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: game.status === 'completed' ? '#9CA3AF' : '#F59E0B',
                      color: 'white',
                      borderRadius: '20px',
                      padding: '8px 24px',
                      fontSize: '14px',
                      fontWeight: 500,
                      width: '100%',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: game.status === 'completed' ? '#6B7280' : '#D97706',
                      }
                    }}
                    disabled={game.status === 'completed'}
                  >
                    {game.status === 'completed' ? 'Completed' : 'Play'}
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* What is Daily Games Section */}
        <Box sx={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <Typography variant="h6" sx={{ 
            color: '#21175B', 
            fontWeight: 'bold', 
            marginBottom: '16px',
            fontSize: '18px'
          }}>
            What is Daily Games ?
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {[
              "Tap left/right to move falling",
              "Tap bottom to rotate blocks", 
              "Complete horizontal lines to score",
              "Game ends when blocks reach the top"
            ].map((instruction, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#21175B',
                  borderRadius: '50%',
                  flexShrink: 0
                }} />
                <Typography variant="body2" sx={{ 
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  {instruction}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DailyGames;