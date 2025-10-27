'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

// Move SVG component outside to prevent re-creation on every render
const ShakeBoxSVG = () => (
  <img
    src="/shake.svg"
    alt="Shake box"
    style={{
      width: '64px',
      height: '64px',
      objectFit: 'contain'
    }}
  />
);

interface ShakeAndWinProps {
  onShake?: () => void;
  coinCost?: number;
}

const ShakeAndWin: React.FC<ShakeAndWinProps> = ({
  onShake,
  coinCost = 15
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();

      // Calculate time since midnight (start of current day)
      const midnight = new Date(now);
      midnight.setHours(0, 0, 0, 0);

      // Calculate elapsed time since midnight in milliseconds
      const elapsedSinceMidnight = now.getTime() - midnight.getTime();

      // Calculate remaining time until next midnight (24 hours cycle)
      const totalDayMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const remainingMs = totalDayMs - elapsedSinceMidnight;

      if (remainingMs > 0) {
        const hours = Math.floor(remainingMs / (1000 * 60 * 60));
        const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        // Reset to 24:00:00 when day cycles
        setTimeLeft({ hours: 24, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      onShake?.();
    }, 1000);
  };

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <Box
      sx={{
        background: 'white',
        borderRadius: {
          xs: '12px',
          sm: '16px',
          md: '20px'
        },
        padding: {
          xs: '16px',
          sm: '20px',
          md: '24px'
        },
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        width: '100%',
        margin: '0px'
      }}
    >
      {/* Header with icon and title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: {
            xs: '12px',
            sm: '16px'
          },
          marginBottom: {
            xs: '16px',
            sm: '20px'
          }
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            borderRadius: '12px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
            animation: isShaking ? 'shake 0.5s ease-in-out infinite' : 'none',
            '@keyframes shake': {
              '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
              '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px) rotate(-5deg)' },
              '20%, 40%, 60%, 80%': { transform: 'translateX(10px) rotate(5deg)' },
            }
          }}
        >
          <ShakeBoxSVG />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#2D3748',
              fontWeight: 'bold',
              fontSize: {
                xs: '16px',
                sm: '18px',
                md: '20px'
              },
              marginBottom: '4px'
            }}
          >
            Daily Free Shake
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#4A5568',
              fontSize: {
                xs: '12px',
                sm: '14px'
              }
            }}
          >
            Get a free shake in every 24 hrs
          </Typography>
        </Box>
      </Box>

      {/* Countdown Timer */}
      <Box sx={{ marginBottom: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection:'column',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center'
          }}
        >
          <Box>
          <Typography
          variant="body2"
          sx={{
            color: '#718096',
            fontSize: {
              xs: '12px',
              sm: '14px'
            },
            marginBottom: '8px'
          }}
        >
          Next Free Shake In
        </Typography>
        </Box>
        <Box  sx={{
            display: 'flex',
            flexDirection:'row',

          }}>
          <Box sx={{ textAlign: 'center' }}>


            <Typography
              variant="h4"
              sx={{
                color: '#2D3748',
                fontWeight: 'bold',
                fontSize: {
                  xs: '24px',
                  sm: '28px',
                  md: '32px'
                },
                lineHeight: 1
              }}
            >
              {formatTime(timeLeft.hours)}
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: '#2D3748',
              fontWeight: 'bold',
              fontSize: {
                xs: '24px',
                sm: '28px',
                md: '32px'
              }
            }}
          >
            :
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                color: '#2D3748',
                fontWeight: 'bold',
                fontSize: {
                  xs: '24px',
                  sm: '28px',
                  md: '32px'
                },
                lineHeight: 1
              }}
            >
              {formatTime(timeLeft.minutes)}
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: '#2D3748',
              fontWeight: 'bold',
              fontSize: {
                xs: '24px',
                sm: '28px',
                md: '32px'
              }
            }}
          >
            :
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                color: '#2D3748',
                fontWeight: 'bold',
                fontSize: {
                  xs: '24px',
                  sm: '28px',
                  md: '32px'
                },
                lineHeight: 1
              }}
            >
              {formatTime(timeLeft.seconds)}
            </Typography>
          </Box>
          </Box>
        </Box>
      </Box>

      {/* Shake Button */}
      <Button
        variant="contained"
        onClick={handleShake}
        disabled={isShaking}
        sx={{
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          color: '#2D3748',
          fontWeight: 'bold',
          fontSize: {
            xs: '14px',
            sm: '16px',
            md: '18px'
          },
          padding: {
            xs: '12px 24px',
            sm: '14px 28px',
            md: '16px 32px'
          },
          borderRadius: '50px',
          textTransform: 'none',
          width: '100%',
          boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
            boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4)',
            transform: 'translateY(-2px)',
          },
          '&:disabled': {
            background: '#E2E8F0',
            color: '#A0AEC0',
            boxShadow: 'none',
          }
        }}
      >
        {isShaking ? 'Shaking...' : `Shake Now (${coinCost} Coins)`}
      </Button>
    </Box>
  );
};

export default ShakeAndWin;