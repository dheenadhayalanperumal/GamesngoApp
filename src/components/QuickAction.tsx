import { Box} from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import DailyGameImg from '../assets/images/banner/Daily_game.svg';
import RedeemRewardsImg from '../assets/images/banner/Redeem_rewards.svg';

const quickactioncard = [
  { id: 1, src: DailyGameImg, alt: "Dailygame" },
  { id: 2, src: RedeemRewardsImg, alt: "Redeemreward" },
];

const QuickAction = () => {
  const router = useRouter();

  const handleCardClick = (cardId: number) => {
    if (cardId === 1) {
      router.push('/daily-games');
    }
    // Add other navigation logic for other cards if needed
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' },
        gap: { xs: 2, sm: 3, md: 4 },
        width: '100%',
        py: 2,
       
      }}
    >
      {quickactioncard.map((card) => (
        <Box
          key={card.id}
          className="quick-action-card"
          onClick={() => handleCardClick(card.id)}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            }
          }}
        >
          <img
            src={card.src.src}
            alt={card.alt}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              display: 'block',
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
    export default QuickAction;