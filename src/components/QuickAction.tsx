import { Box} from '@mui/material';
import React from 'react';
import DailyGameImg from '../assets/images/banner/Daily_game.svg';
import RedeemRewardsImg from '../assets/images/banner/Redeem_rewards.svg';

const quickactioncard = [
  { id: 1, src: DailyGameImg, alt: "Dailygame" },
  { id: 2, src: RedeemRewardsImg, alt: "Redeemreward" },
];

const QuickAction = () => {
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
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
           
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