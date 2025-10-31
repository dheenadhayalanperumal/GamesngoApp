'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import CoinIcon from '@/assets/icons/coin.png';

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  prizeValue: string;
  players: number;
  roomSize?: number;
  timeLeft: string;
  entryCost: number;
  isLive?: boolean;
  isPrize?: boolean;
  canRegister?: boolean;
  alreadyRegistered?: boolean;
  startAt?: string;
  endAt?: string;
  onBuyTickets?: (eventId: number) => void;
  hideBuyButton?: boolean;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  image,
  // prizeValue,
  players,
  roomSize,
  timeLeft,
  entryCost,
  // isLive = true,
  isPrize = true,
  canRegister,
  alreadyRegistered,
  startAt,
  endAt,
  onBuyTickets,
  hideBuyButton = false,
  onClick,
}) => {
  // Format date to readable format with 24-hour time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false // Use 24-hour format
    };
    return date.toLocaleDateString('en-US', options);
  };
  // Determine button state and text
  // Priority: 1. Already Registered, 2. Room Full, 3. Can Buy
  const isRoomFull = roomSize !== undefined && roomSize > 0 && players >= roomSize;
  
  // Check if user is already registered or cannot register
  // If alreadyRegistered is explicitly true OR canRegister is explicitly false, user cannot register
  const checkAlreadyRegistered = alreadyRegistered === true;
  const checkCannotRegister = canRegister === false;
  const isAlreadyRegistered = checkAlreadyRegistered || checkCannotRegister;
  const isDisabled = isAlreadyRegistered || isRoomFull;
  
  // Determine button text with clear priority
  let buttonText = 'Buy Tickets';
  if (checkAlreadyRegistered || checkCannotRegister) {
    buttonText = 'Already Registered';
  } else if (isRoomFull) {
    buttonText = 'Room is Full';
  }
  
  // Debug logging
  console.log('EventCard - Event ID:', id, {
    alreadyRegistered,
    canRegister,
    checkAlreadyRegistered,
    checkCannotRegister,
    isAlreadyRegistered,
    players,
    roomSize,
    isRoomFull,
    isDisabled,
    buttonText,
    'Final button text will be': buttonText
  });
  return (
    <Box 
      sx={{ 
        width: '100%', 
        padding: '18px', 
        backgroundColor: '#3920A6',
        borderRadius: '10px',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          opacity: 0.9,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out',
        } : {},
      }}
      onClick={onClick}
    >
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
        {/* Show dates if this is "Your Events" (has startAt/endAt), otherwise show regular stats */}
        {startAt && endAt ? (
          <>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: 12, sm: 13, md: 14 },
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                {formatDate(startAt)}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 10, sm: 11, md: 13 },
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                Start Date
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: 12, sm: 13, md: 14 },
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                {formatDate(endAt)}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 10, sm: 11, md: 13 },
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                End Date
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography
                sx={{
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
                  fontSize: { xs: 10, sm: 11, md: 13 },
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                Time Left
              </Typography>
            </Box>
          </>
        ) : (
          <>
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
                {roomSize ? `${players}/${roomSize}` : players}
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
                <Image src={CoinIcon} alt="Coin" width={20} height={20} />
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
          </>
        )}
      </Box>

      {/* Buy Tickets Button */}
      {!hideBuyButton && (
        <Box sx={{ px:'11px', pb:'11px'}} onClick={(e) => e.stopPropagation()}>
          <Button
            fullWidth
            disabled={isDisabled}
            onClick={() => !isDisabled && onBuyTickets?.(id)}
            sx={{
              background: isDisabled 
                ? 'linear-gradient(180deg, #bdbdbd 0%, #9e9e9e 100%)'
                : 'linear-gradient(180deg, #ffa726 0%, #ff8f00 100%)',
              color: '#ffffff',
              // Font sizes: xs: 16px, sm: 18px, md: 22px
              fontSize: { xs: 16, sm: 18, md: 22 },
              fontWeight: 900,
              textTransform: 'none',
              borderRadius: '30px',
              padding: '14px',
              boxShadow: isDisabled 
                ? 'none'
                : '0 4px 12px rgba(255,152,0,0.4)',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              '&:hover': {
                background: isDisabled
                  ? 'linear-gradient(180deg, #bdbdbd 0%, #9e9e9e 100%)'
                  : 'linear-gradient(180deg, #ffb74d 0%, #ffa726 100%)',
                boxShadow: isDisabled 
                  ? 'none'
                  : '0 6px 16px rgba(255,152,0,0.6)',
              },
              '&:disabled': {
                background: 'linear-gradient(180deg, #bdbdbd 0%, #9e9e9e 100%)',
                color: '#ffffff',
              },
            }}
          >
            {buttonText}
          </Button>
        </Box>
      )}
    </Box>
    </Box>
  );
};

export default EventCard;

