'use client';

import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';

interface ClaimButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
  onClaimed?: () => void;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({
  onClick,
  disabled = false,
  text = 'Claim',
  onClaimed
}) => {
  // If disabled prop is true initially, treat as already claimed
  const [isClaimed, setIsClaimed] = useState(disabled);
  const [showTick, setShowTick] = useState(false);

  // Update claimed state when disabled prop changes
  useEffect(() => {
    console.log('🔘 ClaimButton - disabled prop changed:', disabled);
    if (disabled) {
      setIsClaimed(true);
      console.log('🔘 ClaimButton - Setting isClaimed to true');
    }
  }, [disabled]);

  const handleClick = () => {
    if (!isClaimed && !disabled) {
      // Show tick animation first
      setShowTick(true);
      
      // After tick animation, show claimed state
      setTimeout(() => {
        setShowTick(false);
        setIsClaimed(true);
        if (onClaimed) {
          onClaimed();
        }
      }, 800); // Slower tick duration to match animation
      
      if (onClick) {
        onClick();
      }
    }
  };

  const TickIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M4 12l4 4 12-12" 
        fill="none"
        stroke="#4fd15b"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="30"
        strokeDashoffset="30"
        style={{
          animation: 'drawTick 0.8s ease-out forwards'
        }}
      />
      <style jsx>{`
        @keyframes drawTick {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );

  const buttonText = isClaimed ? 'Claimed' : text;
  const isButtonDisabled = disabled || isClaimed;

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      disabled={isButtonDisabled}
      sx={{
        background: showTick 
          ? '#ffde6e'
          : isClaimed 
            ? 'radial-gradient(circle, #4fd15b 0%, #26842c 100%)'
            : 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        color: showTick || isClaimed ? '#ffffff' : '#2c3e50',
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
        borderRadius: {
          xs: '50px',
          sm: '50px',
          md: '50px'
        },
        textTransform: 'none',
        boxShadow: showTick 
          ? '0 4px 16px rgba(255, 222, 110, 0.4)'
          : isClaimed 
            ? '0 4px 16px rgba(79, 209, 91, 0.4)'
            : '0 4px 16px rgba(255, 215, 0, 0.3)',
        transition: 'all 0.2s ease-out',
        '&:hover': {
          background: showTick 
            ? '#ffde6e'
            : isClaimed 
              ? 'radial-gradient(circle, #4fd15b 0%, #26842c 100%)'
              : 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
          boxShadow: showTick 
            ? '0 4px 16px rgba(255, 222, 110, 0.4)'
            : isClaimed 
              ? '0 4px 16px rgba(79, 209, 91, 0.4)'
              : '0 6px 20px rgba(255, 215, 0, 0.4)',
          transform: showTick || isClaimed ? 'none' : 'translateY(-2px)',
        },
        '&:disabled': {
          background: isClaimed 
            ? 'radial-gradient(circle, #4fd15b 0%, #26842c 100%)'
            : '#e0e0e0',
          color: isClaimed ? '#ffffff' : '#9e9e9e',
          boxShadow: isClaimed 
            ? '0 4px 16px rgba(79, 209, 91, 0.4)'
            : 'none',
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {showTick ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '50%',
              animation: 'fadeInCircle 0.2s ease-out',
              '@keyframes fadeInCircle': {
                '0%': {
                  opacity: 0,
                  transform: 'scale(0.8)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'scale(1)',
                },
              },
            }}
          >
            <TickIcon />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 1,
              transition: 'opacity 0.15s ease-out',
            }}
          >
            {buttonText}
          </Box>
        )}
      </Box>
    </Button>
  );
};

export default ClaimButton;