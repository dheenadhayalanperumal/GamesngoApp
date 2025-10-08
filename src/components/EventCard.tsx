'use client';

import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import Image from 'next/image';

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
  prizeValue,
  players,
  timeLeft,
  entryCost,
  isLive = true,
  isPrize = true,
  onBuyTickets,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 380,
        background: 'linear-gradient(180deg, #1a0a3e 0%, #2d1554 100%)',
        borderRadius: 4,
        border: '4px solid',
        borderColor: '#ffa726',
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
            background: 'linear-gradient(90deg,rgb(32, 21, 21) 0%,rgb(9, 9, 28) 100%)',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #ffa726',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                fontSize: 28,
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
          {isLive && (
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
          )}
        </Box>
      )}

      {/* Event Content */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #8b1a1a 0%, #5a0a0a 100%)',
          borderRadius: 3,
          margin: 2,
          padding: 2.5,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Event Image */}
          <Box
            sx={{
              width: 100,
              height: 100,
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
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 900,
                color: '#ffd540',
                mb: 0.5,
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: '#ffd54f',
                mb: 1,
                lineHeight: 1.3,
              }}
            >
              {description}
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
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
              fontSize: 28,
              fontWeight: 900,
              color: '#ffd54f',
              lineHeight: 1,
              mb: 0.5,
            }}
          >
            {players}
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
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
              fontSize: 28,
              fontWeight: 900,
              color: '#ffd54f',
              lineHeight: 1,
              mb: 0.5,
            }}
          >
            {timeLeft}
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
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
                fontSize: 28,
                fontWeight: 900,
                color: '#ffd54f',
                lineHeight: 1,
              }}
            >
              {entryCost}
            </Typography>
            <Typography
              sx={{
                fontSize: 20,
                color: '#ffd54f',
                lineHeight: 1,
              }}
            >
              🪙
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 13,
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
      <Box sx={{ padding: '0 24px 24px' }}>
        <Button
          fullWidth
          onClick={() => onBuyTickets?.(id)}
          sx={{
            background: 'linear-gradient(180deg, #ffa726 0%, #ff8f00 100%)',
            color: '#8b1a1a',
            fontSize: 22,
            fontWeight: 900,
            textTransform: 'none',
            borderRadius: 2.5,
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
  );
};

export default EventCard;

