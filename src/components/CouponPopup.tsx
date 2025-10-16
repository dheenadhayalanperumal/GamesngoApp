'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface CouponPopupProps {
  isOpen: boolean;
  onClose: () => void;
  coinsWon: number;
}

const CouponPopup: React.FC<CouponPopupProps> = ({
  isOpen,
  onClose,
  coinsWon = 10
}) => {
  if (!isOpen) return null;

  const CoinIcon = () => (
    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="url(#coinGradient)" stroke="#D4AF37" strokeWidth="2"/>
      <path d="M30 40L70 40L65 50L70 60L30 60L35 50L30 40Z" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2"/>
      <defs>
        <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700"/>
          <stop offset="50%" stopColor="#FFA500"/>
          <stop offset="100%" stopColor="#FF8C00"/>
        </linearGradient>
      </defs>
    </svg>
  );

  const ConfettiPiece = ({ style }: { style: React.CSSProperties }) => (
    <Box
      sx={{
        position: 'absolute',
        width: '8px',
        height: '8px',
        backgroundColor: style.backgroundColor || '#FF6B6B',
        borderRadius: '2px',
        ...style
      }}
    />
  );

  const StreamerPiece = ({ style }: { style: React.CSSProperties }) => (
    <Box
      sx={{
        position: 'absolute',
        width: '20px',
        height: '3px',
        backgroundColor: '#FFD700',
        borderRadius: '2px',
        ...style
      }}
    />
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px'
      }}
    >
      {/* Main Popup Content */}
      <Box
        sx={{
          position: 'relative',
          width: '320px',
          maxWidth: '90vw',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden'
        }}
      >
        {/* Confetti Background */}
        <ConfettiPiece style={{ top: '20px', left: '30px', backgroundColor: '#FF6B6B' }} />
        <ConfettiPiece style={{ top: '40px', right: '25px', backgroundColor: '#4ECDC4' }} />
        <ConfettiPiece style={{ top: '60px', left: '50px', backgroundColor: '#45B7D1' }} />
        <ConfettiPiece style={{ top: '80px', right: '40px', backgroundColor: '#FFA07A' }} />
        <ConfettiPiece style={{ top: '100px', left: '20px', backgroundColor: '#98D8C8' }} />
        <ConfettiPiece style={{ top: '120px', right: '30px', backgroundColor: '#F7DC6F' }} />
        
        <StreamerPiece style={{ top: '30px', left: '60px', transform: 'rotate(45deg)' }} />
        <StreamerPiece style={{ top: '50px', right: '50px', transform: 'rotate(-30deg)' }} />
        <StreamerPiece style={{ top: '70px', left: '40px', transform: 'rotate(60deg)' }} />
        <StreamerPiece style={{ top: '90px', right: '60px', transform: 'rotate(-45deg)' }} />

        {/* Coin Icon */}
        <Box
          sx={{
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CoinIcon />
        </Box>

        {/* Winning Message */}
        <Typography
          variant="h4"
          sx={{
            color: '#E91E63',
            fontWeight: 'bold',
            fontSize: '28px',
            textAlign: 'center',
            marginBottom: '10px'
          }}
        >
          You Won {coinsWon} Coins
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#666666',
            fontSize: '14px',
            textAlign: 'center',
            marginBottom: '30px',
            lineHeight: 1.4
          }}
        >
          Your coin has been added successfully, enjoy rewards and keep playing more
        </Typography>

        {/* Divider Line */}
        <Box
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: '#E0E0E0',
            marginBottom: '20px'
          }}
        />

        {/* Action Button */}
        <Button
          onClick={onClose}
          sx={{
            color: '#FF8C00',
            fontWeight: 'bold',
            fontSize: '16px',
            textTransform: 'none',
            padding: '8px 24px',
            '&:hover': {
              backgroundColor: 'rgba(255, 140, 0, 0.1)',
            }
          }}
        >
          Got it, Thanks!
        </Button>
      </Box>
    </Box>
  );
};

export default CouponPopup;
