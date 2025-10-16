'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import CoinIcon from '@/assets/icons/coin.png';

const GameCoinSVG: React.FC = () => (
  <Image
    src={CoinIcon}
    alt="Coin"
    width={28}
    height={28}
    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
);

const LockSVG: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 11.3789C0.725 11.3789 0.489667 11.2762 0.294 11.0709C0.0983332 10.8656 0.000333333 10.6185 0 10.3296V5.08307C0 4.79451 0.0979999 4.54758 0.294 4.34226C0.49 4.13695 0.725333 4.03412 1 4.03377H1.5V2.98446C1.5 2.2587 1.74383 1.64013 2.2315 1.12877C2.71917 0.617411 3.30867 0.361556 4 0.361206C4.69133 0.360857 5.281 0.616712 5.769 1.12877C6.257 1.64083 6.50067 2.2594 6.5 2.98446V4.03377H7C7.275 4.03377 7.5105 4.1366 7.7065 4.34226C7.9025 4.54793 8.00033 4.79486 8 5.08307V10.3296C8 10.6181 7.90217 10.8653 7.7065 11.0709C7.51083 11.2766 7.27533 11.3792 7 11.3789H1ZM1 10.3296H7V5.08307H1V10.3296ZM4 8.75563C4.275 8.75563 4.5105 8.65298 4.7065 8.44766C4.9025 8.24235 5.00033 7.99524 5 7.70633C4.99967 7.41742 4.90183 7.17049 4.7065 6.96552C4.51117 6.76056 4.27567 6.65773 4 6.65703C3.72433 6.65633 3.489 6.75916 3.294 6.96552C3.099 7.17188 3.001 7.41882 3 7.70633C2.999 7.99384 3.097 8.24095 3.294 8.44766C3.491 8.65438 3.72633 8.75703 4 8.75563ZM2.5 4.03377H5.5V2.98446C5.5 2.54725 5.35417 2.17563 5.0625 1.86958C4.77083 1.56353 4.41667 1.41051 4 1.41051C3.58333 1.41051 3.22917 1.56353 2.9375 1.86958C2.64583 2.17563 2.5 2.54725 2.5 2.98446V4.03377Z" fill="white"/>
  </svg>
);

const TickSVG: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.08441 28.6322L8.05113 28.517L7.96785 28.2288C6.01293 21.4682 0.85907 14.4142 0.807416 14.3437L0.230734 13.5631L0 13.2507L0.356694 13.3515L1.24818 13.6035C3.75304 14.3114 5.98454 16.256 7.41547 17.7625C8.29175 18.6848 8.97529 19.5455 9.42814 20.1568C10.3693 17.0057 11.5979 14.1145 13.0815 11.5599C14.3797 9.3249 15.876 7.33735 17.529 5.65252C20.3557 2.771 22.6485 1.77527 22.7447 1.73412L24.0039 1.17032L24.4829 0.966766L24.1404 1.38283L23.2015 2.4965L23.1988 2.49968L23.1958 2.50273C21.2542 4.52153 19.5336 7.06531 18.0814 10.0637C16.9158 12.4708 15.9202 15.1738 15.1222 18.0976C13.7679 23.0605 13.4483 27.0107 13.4453 27.0499L13.4264 27.295L13.4189 27.3932L13.3303 27.4137L13.1088 27.4652L8.46503 28.5439L8.19327 28.607L8.08441 28.6322Z" fill="black"/>
    <path d="M8.16742 28.4771L8.08414 28.1889C6.10932 21.359 0.954232 14.3311 0.902456 14.2608L0.325653 13.48L1.21726 13.7319C3.69611 14.4325 5.90978 16.3622 7.33027 17.8577C8.32055 18.9 9.063 19.8654 9.47428 20.4332C10.4214 17.2001 11.6682 14.2415 13.1845 11.6307C14.4767 9.40577 15.9663 7.42693 17.6123 5.74906C20.4251 2.88181 22.6939 1.89816 22.789 1.85767L24.0502 1.29288L23.1111 2.40654C21.1598 4.43543 19.431 6.99089 17.9731 10.0016C16.8037 12.4167 15.8051 15.1276 15.005 18.0595C13.642 23.0545 13.3265 26.9992 13.3234 27.0384L13.3046 27.2838L13.083 27.3352L8.43918 28.4139L8.16742 28.4771Z" fill="url(#paint0_linear_1277_667)"/>
    <defs>
      <linearGradient id="paint0_linear_1277_667" x1="15.7273" y1="26.6234" x2="9.78101" y2="-0.728563" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ADFF00"/>
        <stop offset="0.2088" stopColor="#005900"/>
        <stop offset="0.5385" stopColor="#ADFF00"/>
        <stop offset="0.8516" stopColor="#61DB00"/>
        <stop offset="1" stopColor="#003600"/>
      </linearGradient>
    </defs>
  </svg>
);

interface DailyCheckBoxProps {
  coinCount: number;
  isUnlocked?: boolean;
  isCompleted?: boolean;
  isClaimed?: boolean;
  isAnimating?: boolean; // Animation state for claiming
}

const DailyCheckBox: React.FC<DailyCheckBoxProps> = ({
  coinCount,
  isUnlocked = false,
  isCompleted = false,
  isClaimed = false,
  isAnimating = false
}) => {
  const getBackgroundColor = () => {
    if (isCompleted) {
      return 'linear-gradient(135deg, #FC78A2 0%, #F32868 100%)';
    } else {
      return 'linear-gradient(135deg, #FC78A2 0%, #F32868 100%)';
    }
  };

  // Check if box should have blur overlay (claimed, missed, or locked)
  const shouldBlur = isClaimed || (isCompleted && !isClaimed) || !isUnlocked;

  return (
    <Box
      sx={{
        background: getBackgroundColor(),
        borderRadius: {
          xs: '8px',
          sm: '10px',
          md: '12px'
        },
        padding: {
          xs: '4px',
          sm: '6px',
          md: '8px'
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: {
          xs: '2px',
          sm: '4px',
          md: '6px'
        },
        width: '100%',
        aspectRatio: '1 / 1.2',
        boxShadow: isAnimating 
          ? '0 8px 20px rgba(76, 175, 80, 0.4)'
          : '0 4px 12px rgba(252, 120, 162, 0.3)',
        transition: 'all 0.3s ease',
        cursor: isUnlocked && !isCompleted ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        animation: isAnimating ? 'pulseAnimation 1s ease-in-out' : 'none',
        '@keyframes pulseAnimation': {
          '0%': {
            transform: 'scale(1)',
            boxShadow: '0 4px 12px rgba(252, 120, 162, 0.3)',
          },
          '50%': {
            transform: 'scale(1.1)',
            boxShadow: '0 8px 20px rgba(76, 175, 80, 0.6)',
          },
          '100%': {
            transform: 'scale(1)',
            boxShadow: '0 4px 12px rgba(252, 120, 162, 0.3)',
          },
        },
        '&:hover': isUnlocked && !isCompleted ? {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(252, 120, 162, 0.4)',
        } : {},
      }}
    >
      <Box
        sx={{
          width: {
            xs: '20px',
            sm: '24px',
            md: '28px'
          },
          height: {
            xs: '20px',
            sm: '24px',
            md: '28px'
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <GameCoinSVG />
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: {
            xs: '12px',
            sm: '14px',
            md: '16px'
          },
          textAlign: 'center',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        +{coinCount}
      </Typography>

      {!isUnlocked && !isCompleted && !isClaimed && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            width: {
              xs: '24px',
              sm: '28.5px',
              md: '33px'
            },
            height: {
              xs: '24px',
              sm: '28.5px',
              md: '33px'
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '50%',
            backdropFilter: 'blur(2px)',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: {
                xs: '15px',
                sm: '18px',
                md: '21px'
              },
              height: {
                xs: '15px',
                sm: '18px',
                md: '21px'
              },
            }}
          >
            <LockSVG />
          </Box>
        </Box>
      )}

      {isClaimed && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            width: {
              xs: '24px',
              sm: '28.5px',
              md: '33px'
            },
            height: {
              xs: '24px',
              sm: '28.5px',
              md: '33px'
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '50%',
            backdropFilter: 'blur(2px)',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: {
                xs: '15px',
                sm: '18px',
                md: '21px'
              },
              height: {
                xs: '15px',
                sm: '18px',
                md: '21px'
              },
            }}
          >
            <TickSVG />
          </Box>
        </Box>
      )}

      {/* Blur overlay for claimed, missed, or locked states */}
      {shouldBlur && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(1px)',
            borderRadius: {
              xs: '8px',
              sm: '10px',
              md: '12px'
            },
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
};

export default DailyCheckBox;