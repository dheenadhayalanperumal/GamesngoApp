'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
// import Image from 'next/image';

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  prizeValue: string;
  players: number;
  timeLeft: string;
  entryCost: number;
  isLive?: boolean;
  isPrize?: boolean;
  onBuyTickets?: (eventId: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  image,
  // prizeValue,
  players,
  timeLeft,
  entryCost,
  // isLive = true,
  isPrize = true,
  onBuyTickets,
}) => {
  return (
    <Box sx={{ width: '100%', padding: '18px', backgroundColor: '#3920A6',borderRadius: '10px'}}>
    <Box
      sx={{
        width: '100%',
        // minWidth: 380,
        backgroundImage: 'url(/images/product/bg1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
        borderRadius: '10px',
        border: '3px solid #FFD015',
        // borderColor: '#ffa726',
        // background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%)',


        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      {/* Grand Prize Header */}
      {isPrize && (
        <Box
          sx={{
            // background: '#170C38',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            // borderBottom: '2px solid #ffa726',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                // Font sizes: xs: 18px, sm: 22px, md: 28px
                fontSize: { xs: 18, sm: 22, md: 28 },
                fontWeight: 900,
                color: '#ffa726',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              🏆 GRAND PRIZE EVENT
            </Typography>
          </Box>
          {/* {isLive && (
            <Chip
              label="LIVE"
              size="small"
              sx={{
                bgcolor: '#d32f2f',
                color: '#fff',
                fontWeight: 900,
                fontSize: 11,
                height: 24,
                borderRadius: 1,
                px: 1,
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          )} */}
        </Box>
      )}

      {/* Event Content */}
      <Box
        sx={{
          borderRadius: '10px',
        border: '1px solid #A9A2FF',
background: 'radial-gradient(172.37% 47.88% at 21.37% 61.62%, #3128CA 0%, #231CA2 100%)',
          // background: 'linear-gradient(135deg, #8b1a1a 0%, #5a0a0a 100%)',
          // borderRadius: 3,
          marginX: 2,
          padding: 2.5,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Event Image */}
          <Box
            sx={{
              width:{xs: 80, sm: 100, md: 100},
              height:{xs: 80, sm: 100, md: 100},
              borderRadius: 2,
              overflow: 'hidden',
              flexShrink: 0,
              // border: '2px solid rgba(255,255,255,0.2)',
            }}
          >
            <img
              src={image}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* Event Details */}
          <Box sx={{ flex: 1,height: '100px', display: 'flex', 
            flexDirection: 'column',justifyContent: 'space-evenly' }}>
              <Box>
            <Typography
              sx={{
                // Font sizes: xs: 18px, sm: 22px, md: 26px
                fontSize: { xs: '18px', sm: '22px', md: '26px' },
                fontWeight: 400,
                color: '#FFDC2E',
                mb: 1,
                letterSpacing: '0.52px',
                lineHeight: '25px',
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                // Font sizes: xs: 8px, sm: 9px, md: 10px
                fontSize: { xs: 9, sm: 10, md: 12 },
                fontWeight: 400,
                color: '#ffffff',
                mb: 1,
                lineHeight: 1.3,
              }}
            >
              {description}
            </Typography>
            </Box>
            <Typography
              sx={{
                // Font sizes: xs: 12px, sm: 13px, md: 15px
                fontSize: { xs: 11, sm: 13, md: 15 },
                fontWeight: 600,
                color: '#FFF4C0',
                lineHeight: 1.4,
              }}
            >
              Winner takes it all - Top scorer wins the chair!
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '20px 16px',
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Typography
            sx={{
              // Font sizes: xs: 20px, sm: 24px, md: 28px
              fontSize: { xs: 20, sm: 24, md: 28 },
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1,
              mb: 0.5,
            }}
          >
            {players}
          </Typography>
          <Typography
            sx={{
              // Font sizes: xs: 10px, sm: 11px, md: 13px
              fontSize: { xs: 10, sm: 11, md: 13 },
              fontWeight: 600,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            Players
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Typography
            sx={{
              // Font sizes: xs: 20px, sm: 24px, md: 28px
              fontSize: { xs: 20, sm: 24, md: 28 },
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1,
              mb: 0.5,
            }}
          >
            {timeLeft}
          </Typography>
          <Typography
            sx={{
              // Font sizes: xs: 10px, sm: 11px, md: 13px
              fontSize: { xs: 10, sm: 11, md: 13 },
              fontWeight: 600,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            Time Left
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
            <Typography
              sx={{
                // Font sizes: xs: 20px, sm: 24px, md: 28px
                fontSize: { xs: 20, sm: 24, md: 28 },
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1,
              }}
            >
              {entryCost}
            </Typography>
            <Typography
              sx={{
                // Font sizes: xs: 16px, sm: 18px, md: 20px
                fontSize: { xs: 16, sm: 18, md: 20 },
                color: '#ffd54f',
                lineHeight: 1,
              }}
            >
              🪙
            </Typography>
          </Box>
          <Typography
            sx={{
              // Font sizes: xs: 10px, sm: 11px, md: 13px
              fontSize: { xs: 10, sm: 11, md: 13 },
              fontWeight: 600,
              color: 'rgba(255,255,255,0.9)',
              mt: 0.5,
            }}
          >
            Entry Cost
          </Typography>
        </Box>
      </Box>

      {/* Buy Tickets Button */}
      <Box sx={{ px:'11px', pb:'11px'}}>
        <Button
          fullWidth
          onClick={() => onBuyTickets?.(id)}
          sx={{
            background: 'linear-gradient(180deg, #ffa726 0%, #ff8f00 100%)',
            color: '#ffffff',
            // Font sizes: xs: 16px, sm: 18px, md: 22px
            fontSize: { xs: 16, sm: 18, md: 22 },
            fontWeight: 900,
            textTransform: 'none',
            borderRadius: '30px',
            padding: '14px',
            boxShadow: '0 4px 12px rgba(255,152,0,0.4)',
            '&:hover': {
              background: 'linear-gradient(180deg, #ffb74d 0%, #ffa726 100%)',
              boxShadow: '0 6px 16px rgba(255,152,0,0.6)',
            },
          }}
        >
          Buy Tickets
        </Button>
      </Box>
    </Box>
    </Box>
  );
};

export default EventCard;

