'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import Image from 'next/image';
import Crown1 from '@/assets/images/crown/crown1.svg';
import Crown2 from '@/assets/images/crown/crown2.svg';
import Crown3 from '@/assets/images/crown/crown3.svg';
import CoinIcon from '@/assets/icons/coin.png';





const pastWeekWinners = [
  {
    rank: 2,
    name: 'Joe',
    avatar: '/avatar1.jpg',
    coins: 499,
  },
  {
    rank: 1,
    name: 'Jonitha',
    avatar: '/avatar2.jpg',
    coins: 482,
  },
  {
    rank: 3,
    name: 'Rithu',
    avatar: '/avatar3.jpg',
    coins: 482,
  },
];

const allTimeWinners = [
  {
    rank: 2,
    name: 'Alex',
    avatar: '/avatar1.jpg',
    coins: 8500,
  },
  {
    rank: 1,
    name: 'Sarah',
    avatar: '/avatar2.jpg',
    coins: 9200,
  },
  {
    rank: 3,
    name: 'Mike',
    avatar: '/avatar3.jpg',
    coins: 7800,
  },
];

const allTimePlayers = [
  { rank: 1, name: 'Sarah', avatar: '/avatar2.jpg', score: 125000, coins: 9200 },
  { rank: 2, name: 'Alex', avatar: '/avatar1.jpg', score: 118500, coins: 8500 },
  { rank: 3, name: 'Mike', avatar: '/avatar3.jpg', score: 112000, coins: 7800 },
  { rank: 4, name: 'Emma', avatar: '/avatar4.jpg', score: 98000, coins: 6500 },
  { rank: 5, name: 'John', avatar: '/avatar4.jpg', score: 89000, coins: 5800 },
  { rank: 6, name: 'Lisa', avatar: '/avatar4.jpg', score: 82000, coins: 5200 },
];

const thisWeekPlayers = [
  { rank: 1, name: 'sanjay', avatar: '/avatar4.jpg', score: 2651, coins: 500 },
  { rank: 2, name: 'sanjay', avatar: '/avatar4.jpg', score: 2651, coins: 500 },
  { rank: 3, name: 'sanjay', avatar: '/avatar4.jpg', score: 2651, coins: 492 },
  { rank: 4, name: 'Vinith', avatar: '/avatar4.jpg', score: 2651, coins: 481 },
  { rank: 5, name: 'Bejoy', avatar: '/avatar4.jpg', score: 2651, coins: 480 },
  { rank: 6, name: 'Vijay', avatar: '/avatar4.jpg', score: 2651, coins: 480 },
];

const prizes = [
  { rank: 1, coins: 1000 },
  { rank: 2, coins: 800 },
  { rank: 3, coins: 600 },
  { rank: 4, coins: 500 },
  { rank: 5, coins: 400 },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'alltime'>('weekly');

  const currentWinners = activeTab === 'weekly' ? pastWeekWinners : allTimeWinners;

  return (
    <>
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, #3C3CD2 0%, #3C3CD2 100%)',
        zIndex: -1,
      }} />

      <Header sx={{
        backgroundColor: '#4848DB',
        textAlign: 'center',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }} />

      {/* Main Content */}
      <Box sx={{ px: "0px", pt: 6, pb: 10 }}>
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            color: 'white',
            textAlign: 'center',
            mt:7,
            mb: 3,
            fontSize: { xs: 28, sm: 32, md: 36 },
          }}
        >
          Leader Board
        </Typography>

        {/* Weekly/All Time Tabs */}
        <Box sx={{
          display: 'flex',
          gap: 0.5,
          mb: 3,
          justifyContent: 'space-evenly',
          backgroundColor:'#21175B',
          borderRadius:'25px',
          padding:'5px',
          position: 'relative',
        }}>
          {/* Sliding Background Indicator */}
          <Box
            sx={{
              position: 'absolute',
              top: '5px',
              left: activeTab === 'weekly' ? '5px' : 'calc(50% - 5px)',
              width: 'calc(50% - 5px)',
              height: 'calc(100% - 10px)',
              backgroundColor: 'white',
              borderRadius: '20px',
              transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 12px rgba(255,255,255,0.3)',
              zIndex: 0,
            }}
          />

          <Button
            onClick={() => setActiveTab('weekly')}
            sx={{
              flex: 1,
              backgroundColor: 'transparent',
              color: activeTab === 'weekly' ? '#4848DB' : 'white',
              borderRadius: 10,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 1,
              position: 'relative',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            Weekly
          </Button>
          <Button
            onClick={() => setActiveTab('alltime')}
            sx={{
              flex: 1,
              backgroundColor: 'transparent',
              color: activeTab === 'alltime' ? '#4848DB' : 'white',
              borderRadius: 10,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 1,
              position: 'relative',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            All Time
          </Button>
        </Box>

        {/* Past Week Result / All Time Result */}
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            mb: 2,
            fontSize: { xs: 16, sm: 18 },
          }}
        >
          {activeTab === 'weekly' ? 'Past Week Result' : 'All Time Result'}
        </Typography>

        {/* Winner Badge */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            sx={{
              color: '#FFD700',
              fontWeight: 900,
              fontSize: { xs: 24, sm: 28 },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: 2,
            }}
          >
            - WINNER -
          </Typography>
        </Box>

        {/* Top 3 Podium */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', mb: 4, gap: 2 }}>
          {/* 2nd Place */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: 120 }}>
            <Box sx={{ position: 'relative', mb: 1 }}>
            <Box
                sx={{
                  width: 50,
                  height: 50,
                  position: 'absolute',
                  top: -25,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                }}
              >
               <Image
      src={Crown1}
      alt="Crown"
      width={50}
      height={50}
    />
              </Box>
              <Avatar
                src={currentWinners[0].avatar}
                sx={{
                  width: 80,
                  height: 80,
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              />
              <Box
                sx={{
                  width: 32,
                  height: 32,
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
                  fontSize: 18,
                  color: '#4848DB',
                  border: '3px solid #4848DB',
                }}
              >
                2
              </Box>
            </Box>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 18, mt: 2 }}>
              {currentWinners[0].name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Image src={CoinIcon} alt="Coin" width={20} height={20} />
              <Typography sx={{ color: 'white', fontSize: 14 }}>{currentWinners[0].coins} Coins</Typography>
            </Box>
          </Box>

          {/* 1st Place */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: 130 }}>
            <Box sx={{ position: 'relative', mb: 1 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  position: 'absolute',
                  top: -25,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                }}
              >
               <Image 
      src={Crown2}
      alt="Crown"
      width={50}
      height={50}
    />
              </Box>
              <Avatar
                src={currentWinners[1].avatar}
                sx={{
                  width: 100,
                  height: 100,
                  border: '5px solid #FFD700',
                  boxShadow: '0 6px 16px rgba(255,215,0,0.4)',
                }}
              />
              <Box
                sx={{
                  width: 36,
                  height: 36,
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
                  fontSize: 20,
                  color: '#FFD700',
                  border: '3px solid #FFD700',
                }}
              >
                1
              </Box>
            </Box>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 20, mt: 2 }}>
              {currentWinners[1].name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Image src={CoinIcon} alt="Coin" width={22} height={22} />
              <Typography sx={{ color: 'white', fontSize: 16 }}>{currentWinners[1].coins} Coins</Typography>
            </Box>
          </Box>

          {/* 3rd Place */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: 120 }}>
            <Box sx={{ position: 'relative', mb: 1 }}>
            <Box
                sx={{
                  width: 50,
                  height: 50,
                  position: 'absolute',
                  top: -25,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                }}
              >
               <Image
      src={Crown3}
      alt="Crown"
      width={50}
      height={50}
    />
              </Box>
              <Avatar
                src={currentWinners[2].avatar}
                sx={{
                  width: 80,
                  height: 80,
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              />
              <Box
                sx={{
                  width: 32,
                  height: 32,
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
                  fontSize: 18,
                  color: '#4848DB',
                  border: '3px solid #4848DB',
                }}
              >
                3
              </Box>
            </Box>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 18, mt: 2 }}>
              {currentWinners[2].name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Image src={CoinIcon} alt="Coin" width={20} height={20} />
              <Typography sx={{ color: 'white', fontSize: 14 }}>{currentWinners[2].coins} Coins</Typography>
            </Box>
          </Box>
        </Box>

        {/* Prizes Section */}
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
        <Box sx={{ display: 'flex', gap: 1, mb: 4, justifyContent: 'space-evenly', width:"100%" }}>
          {prizes.map((prize) => (
            <Box
              key={prize.rank}
              sx={{
                backgroundColor: 'rgba(33, 23, 91, 0.20)',
                borderRadius: 5,
                py: 1,
                px: 1,
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

        {/* This Week Section */}
        <Box
          sx={{
            backgroundColor: 'white',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            pt: 3,
            px: 2,
            pb: 2,
            minHeight: 400,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 60,
                height: 4,
                backgroundColor: '#E0E0E0',
                borderRadius: 2,
              }}
            />
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: '#2d2350',
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: 20, sm: 24 },
            }}
          >
            This Week
          </Typography>

          {/* Leaderboard List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {thisWeekPlayers.map((player, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  backgroundColor: player.rank === 1 ? '#C8E6C9' : '#F5F5F5',
                  borderRadius: 3,
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: 20,
                    color: '#2d2350',
                    minWidth: 20,
                  }}
                >
                  {player.rank}
                </Typography>
                <Avatar src={player.avatar} sx={{ width: 48, height: 48 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#2d2350' }}>
                    {player.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: '#888' }}>
                    {player.score} Scores
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#4848DB',
                    borderRadius: 10,
                    px: 2,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Image src={CoinIcon} alt="Coin" width={18} height={18} />
                  <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>
                    {player.coins}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Tab Bar */}
      <TabBar />
    </>
  );
}
