'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HeaderWithBack from '@/components/HeaderWithBack';
import DailyInnerBg from '@/assets/images/banner/dailygame-innerbackground.png';
import DailyInnerImg from '@/assets/images/banner/dailygame-innerimg.png';

// API Types
interface GameCategory {
  id: number;
  name: string;
}

interface Game {
  index: number;
  id: number;
  name: string;
  type: string;
  category: GameCategory;
  bannerUrl: string | null;
  assetUrl: string;
  coins: number;
  played: boolean;
  wonCoins: number;
  completed: boolean;
  status: string;
  canPlay: boolean;
  locked: boolean;
  order: number;
}

interface ProgressStep {
  index: number;
  coins: number;
  completed: boolean;
}

interface Progress {
  completed: number;
  total: number;
  steps: ProgressStep[];
  nextIndex: number;
  summary: string;
}

interface Header {
  title: string;
  bonusCoins: number;
  timeRemainingSeconds: number;
  bonusAlreadyCredited: boolean;
  totalGames: number;
  totalEarnedCoinsToday: number;
}

interface DailyGamesResponse {
  status: string;
  header: Header;
  progress: Progress;
  games: Game[];
  message?: string;
}

const DailyGames = () => {
  const router = useRouter();
  const [data, setData] = useState<DailyGamesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Fetch daily games data
  useEffect(() => {
    const fetchDailyGames = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/daily-games', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store',
        });

        const apiData: DailyGamesResponse = await response.json();
        console.log('Daily Games API Response:', apiData);

        if (response.ok && apiData.status === 'success') {
          setData(apiData);
          // Initialize time remaining
          updateTimeRemaining(apiData.header.timeRemainingSeconds);
        } else {
          if (response.status === 401) {
            setError('Please login to view daily games');
          } else {
            setError(apiData.message || 'Failed to fetch daily games');
          }
        }
      } catch (err) {
        console.error('Error fetching daily games:', err);
        setError('Failed to fetch daily games. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyGames();
  }, []);

  // Update time remaining every second
  useEffect(() => {
    if (!data) return;

    const interval = setInterval(() => {
      const currentSeconds = data.header.timeRemainingSeconds;
      if (currentSeconds > 0) {
        updateTimeRemaining(currentSeconds - 1);
        // Update the data's timeRemainingSeconds
        setData(prev => {
          if (!prev) return null;
          return {
            ...prev,
            header: {
              ...prev.header,
              timeRemainingSeconds: currentSeconds - 1
            }
          };
        });
      } else {
        clearInterval(interval);
        // Reload data when time expires
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const updateTimeRemaining = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    setTimeRemaining(`${hours}h ${minutes}m`);
  };

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

  const formatGameStatus = (game: Game): string => {
    if (game.completed) return 'Completed';
    if (game.locked) return 'Locked';
    if (game.canPlay) return 'Play';
    return game.status;
  };

  const getStatusColor = (game: Game): string => {
    if (game.completed) return '#9CA3AF';
    if (game.locked) return '#9CA3AF';
    return '#F59E0B';
  };

  const getProgressStepColor = (step: ProgressStep, currentIndex: number): string => {
    if (step.completed) return '#10B981'; // Green for completed
    if (step.index === currentIndex) return '#F59E0B'; // Orange for current
    return '#D1D5DB'; // Gray for locked/pending
  };

  const handlePlayGame = (game: Game) => {
    if (!game.canPlay || game.locked) return;
    // Navigate to game - you may need to adjust this based on your routing
    router.push(`/games/${game.id}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress size={60} sx={{ color: '#F59E0B' }} />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa',
        margin: '0 -15px',
        width: 'calc(100% + 30px)',
      }}>
        <HeaderWithBack />
        <Box sx={{ padding: 2, paddingTop: '15px' }}>
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        </Box>
      </Box>
    );
  }

  // No data state
  if (!data) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa',
        margin: '0 -15px',
        width: 'calc(100% + 30px)',
      }}>
        <HeaderWithBack />
        <Box sx={{ padding: 2, paddingTop: '15px' }}>
          <Alert severity="info">No daily games available.</Alert>
        </Box>
      </Box>
    );
  }

  const { header, progress, games } = data;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      margin: '0 -15px',
      width: 'calc(100% + 30px)',
      fontFamily: 'Paytone One, sans-serif',
      fontWeight: '400',
    }}>
      <HeaderWithBack />

      <Box sx={{ padding: 2, paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Daily Games Card */}
        <Box sx={{
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
              {timeRemaining || `${Math.floor(header.timeRemainingSeconds / 3600)}h ${Math.floor((header.timeRemainingSeconds % 3600) / 60)}m`}
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
                {header.title}
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
                Complete all {header.totalGames} games today to unlock bonus coins!
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '25px' }}>
                  <Box sx={{ width: 30, height: 30, display: 'flex', alignItems: 'center' }}>
                    <img src="/coin.png" alt="bonuscoin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                    + {header.bonusCoins} Bonus
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                  {progress.summary}
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
            {progress.steps.map((step, index) => {
              const isLast = index === progress.steps.length - 1;
              const stepColor = getProgressStepColor(step, progress.nextIndex);
              const stepLabel = index === 0 ? '1st Game' : index === 1 ? '2nd Game' : '3rd Game';
              
              return (
                <React.Fragment key={step.index}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500, fontSize: '14px' }}>
                      {stepLabel}
                    </Typography>
                    <Box sx={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: stepColor,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                        {step.index}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
                        <img src="/coin.png" alt="coin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: step.completed ? '#374151' : '#9CA3AF', 
                          fontWeight: 500 
                        }}
                      >
                        {step.coins}
                      </Typography>
                    </Box>
                  </Box>
                  {!isLast && (
                    <Box sx={{ 
                      height: '2px', 
                      backgroundColor: step.completed ? stepColor : '#D1D5DB', 
                      flex: 1,
                      marginTop: '0px'
                    }} />
                  )}
                </React.Fragment>
              );
            })}
          </Box>
        </Box>

        {/* Game List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {games.map((game) => (
            <Box key={game.id} sx={{
              backgroundColor: 'white',
              display: 'flex',
              gap: '16px',
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
                flexShrink: 0,
                overflow: 'hidden'
              }}>
                {game.bannerUrl ? (
                  <Image
                    src={game.bannerUrl}
                    alt={game.name}
                    width={200}
                    height={200}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                  />
                ) : (
                  <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ color: '#9CA3AF', fontSize: '14px' }}>No Image</Typography>
                  </Box>
                )}
              </Box>

              {/* Game Details */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ 
                  color: '#21175B', 
                  fontWeight: '700',
                  fontSize: '22px'
                }}>
                  {game.name}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontSize: '16px',
                  fontWeight: '400'
                }}>
                  {game.category.name}
                </Typography>
                
                {/* Tags */}
                <Box sx={{ display: 'flex', gap: 1, marginY: 1 }}>
                  <Box sx={{
                    backgroundColor: '#E0E7FF',
                    color: '#6366F1',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 500
                  }}>
                    {game.type}
                  </Box>
                </Box>

                {/* Reward and Button */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, marginBottom: '10px' }}>
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
                      {game.coins} Coins
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    onClick={() => handlePlayGame(game)}
                    disabled={game.completed || game.locked || !game.canPlay}
                    sx={{
                      backgroundColor: getStatusColor(game),
                      color: 'white',
                      borderRadius: '20px',
                      padding: '8px 24px',
                      fontSize: '14px',
                      fontWeight: 500,
                      width: '100%',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: game.completed || game.locked ? '#6B7280' : '#D97706',
                      },
                      '&:disabled': {
                        backgroundColor: '#9CA3AF',
                        color: 'white'
                      }
                    }}
                  >
                    {formatGameStatus(game)}
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
