import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import CoinIcon from '@/assets/icons/coin.png';

interface Prize {
  rank: number;
  coins: number;
}

interface PrizesSectionProps {
  prizes: Prize[];
}

export default function PrizesSection({ prizes }: PrizesSectionProps) {
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          mb: 2,
          fontSize: { xs: 20, sm: 24 },
        }}
      >
        Prizes
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 4,
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        {prizes.map((prize) => (
          <Box
            key={prize.rank}
            sx={{
              backgroundColor: 'rgba(33, 23, 91, 0.20)',
              borderRadius: 3,
              py: 2,
              px: .4,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography sx={{ color: '#FFD700', fontWeight: 900, fontSize: 20 }}>
              {prize.rank}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 12 }}>
                {prize.coins}
              </Typography>
              <Image src={CoinIcon} alt="Coin" width={18} height={18} />
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
