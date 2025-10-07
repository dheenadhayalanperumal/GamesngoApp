import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import CoinIcon from '@/assets/icons/coin.png';

interface PodiumCardProps {
  rank: number;
  name: string;
  avatar: string;
  coins: number;
  crownIcon?: StaticImageData;
  isWinner?: boolean;
}

export default function PodiumCard({
  rank,
  name,
  avatar,
  coins,
  crownIcon,
  isWinner = false,
}: PodiumCardProps) {
  const isFirstPlace = rank === 1;
  const avatarSize = isFirstPlace ? 100 : 80;
  const badgeSize = isFirstPlace ? 36 : 32;
  const nameSize = isFirstPlace ? 20 : 18;
  const coinSize = isFirstPlace ? 22 : 20;
  const borderColor = isFirstPlace ? '#FFD700' : 'white';
  const badgeColor = isFirstPlace ? '#FFD700' : '#4848DB';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        maxWidth: isFirstPlace ? 130 : 120,
      }}
    >
      <Box sx={{ position: 'relative', mb: 1 }}>
        {/* Crown or Fire Icon */}
        <Box
          sx={{
            width: isFirstPlace ? 50 : 40,
            height: isFirstPlace ? 50 : 40,
            position: 'absolute',
            top: isFirstPlace ? -25 : -20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            ...(crownIcon
              ? {}
              : {
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }),
          }}
        >
          {crownIcon ? (
            <Image
              src={crownIcon}
              alt="Crown"
              width={isFirstPlace ? 50 : 40}
              height={isFirstPlace ? 50 : 40}
            />
          ) : (
            <Typography sx={{ fontSize: 24 }}>🔥</Typography>
          )}
        </Box>

        {/* Avatar */}
        <Avatar
          src={avatar}
          sx={{
            width: avatarSize,
            height: avatarSize,
            border: `${isFirstPlace ? 5 : 4}px solid ${borderColor}`,
            boxShadow: isFirstPlace
              ? '0 6px 16px rgba(255,215,0,0.4)'
              : '0 4px 12px rgba(0,0,0,0.2)',
          }}
        />

        {/* Rank Badge */}
        <Box
          sx={{
            width: badgeSize,
            height: badgeSize,
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: 900,
            fontSize: isFirstPlace ? 20 : 18,
            color: badgeColor,
            border: `3px solid ${badgeColor}`,
          }}
        >
          {rank}
        </Box>
      </Box>

      {/* Name */}
      <Typography
        sx={{
          color: 'white',
          fontWeight: 700,
          fontSize: nameSize,
          mt: 2,
        }}
      >
        {name}
      </Typography>

      {/* Coins */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Image src={CoinIcon} alt="Coin" width={coinSize} height={coinSize} />
        <Typography
          sx={{
            color: 'white',
            fontSize: isFirstPlace ? 16 : 14,
          }}
        >
          {coins}
        </Typography>
      </Box>
    </Box>
  );
}
