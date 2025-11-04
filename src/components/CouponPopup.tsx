'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';

interface RewardData {
  type: 'coin' | 'product';
  amount?: number;
  product?: {
    id: number;
  };
  voucherId?: number;
  redemptionId: number;
  spent: number;
  attemptNo: number;
}

interface CouponPopupProps {
  isOpen: boolean;
  onClose: () => void;
  coinsWon?: number;
  rewardData?: RewardData;
}

const CouponPopup: React.FC<CouponPopupProps> = ({
  isOpen,
  onClose,
  coinsWon = 10,
  rewardData
}) => {
  if (!isOpen) return null;
  
  // Determine reward type and amount
  const isProductReward = rewardData?.type === 'product';
  const actualCoinsWon = rewardData?.type === 'coin' ? rewardData.amount : coinsWon;

  const CoinIcon = () => (
    <Image
      src="/coin.png"
      alt="Coin"
      width={80}
      height={80}
      style={{ objectFit: 'contain' }}
    />
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

        {/* Reward Icon */}
        <Box
          sx={{
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isProductReward ? (
            <Image
              src="/giftbox.png"
              alt="Gift"
              width={80}
              height={80}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <CoinIcon />
          )}
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
          {isProductReward 
            ? 'You Won a Product!' 
            : `You Won ${actualCoinsWon} Coins`}
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
          {isProductReward
            ? 'Your product voucher has been added to your account. Check your vouchers to redeem it!'
            : 'Your coins have been added successfully, enjoy rewards and keep playing more'}
        </Typography>

        {/* Show attempt info if available */}
        {/* {rewardData && (
          <Typography
            variant="body2"
            sx={{
              color: '#999999',
              fontSize: '12px',
              textAlign: 'center',
              marginBottom: '20px'
            }}
          >
            Attempt #{rewardData.attemptNo} • {rewardData.spent > 0 ? `Cost: ${rewardData.spent} coins` : 'Free'}
          </Typography>
        )} */}

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
