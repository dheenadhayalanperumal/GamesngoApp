'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import GamesDescription from '@/components/GamesDescription';


const gameData = {
  1: {
    id: 1,
    name: 'Bubble Shooter',
    image: '/images/banner/bubble_shooter.svg',
    rating: 4.8,
    duration: '5 min',
    genre: 'Score Based Coins',
    gamedescriptiontitle: 'Game Description',
    description: 'Classic bubble shooter game with colorful bubbles and exciting power-ups. Match 3 or more bubbles of the same color to clear them and progress through challenging levels.',
    howtoplay: 'How to Play',
    features: [
      'Over 1000 levels of bubble popping fun',
      'Exciting power-ups and boosters',
      'Challenging obstacles and puzzles',
      'Daily rewards and bonuses',
    ],   
  },
  2: {
    id: 2,
    name: 'Burger Maker',
    image: '/images/banner/burger_maker.svg',
    rating: 4.6,
    duration: '7 min',
    genre: 'Cooking',
    gamedescriptiontitle: 'Game Description',
    description: 'Cook delicious burgers in this fast-paced cooking game. Take orders, prepare ingredients, and serve customers to build your burger empire.',
    howtoplay: 'How to Play',
    features: [
      'Over 1000 levels of bubble popping fun',
      'Exciting power-ups and boosters',
      'Challenging obstacles and puzzles',
      'Daily rewards and bonuses',
    ],   
  },
  3: {
    id: 3,
    name: 'Chef Master',
    image: '/images/banner/burger_maker.svg',
    rating: 4.7,
     duration: '6 min',
    genre: 'Simulation',
    description: 'Master the art of cooking in this comprehensive chef simulation. Learn recipes, manage your restaurant, and become the ultimate chef master.',
     howtoplay: 'How to Play',
    features: [
      'Over 1000 levels of bubble popping fun',
      'Exciting power-ups and boosters',
      'Challenging obstacles and puzzles',
      'Daily rewards and bonuses',
    ],   
  },
  4: {
    id: 4,
    name: 'Chef Master',
    image: '/images/banner/burger_maker.svg',
    rating: 4.7,
    duration: '6 min',
    genre: 'Simulation',
    gamedescriptiontitle: 'Game Description', 
    description: 'Master the art of cooking in this comprehensive chef simulation. Learn recipes, manage your restaurant, and become the ultimate chef master.',
    howtoplay: 'How to Play',
    features: [
      'Over 1000 levels of bubble popping fun',
      'Exciting power-ups and boosters',
      'Challenging obstacles and puzzles',
      'Daily rewards and bonuses',
    ],   
  },
};

const GameDetailPage = () => {
  const params = useParams();
  const gameId = parseInt(params.id as string);

  const game = gameData[gameId as keyof typeof gameData];

  if (!game) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <h2 style={{ color: '#2d2350' }}>Game Not Found</h2>
        <p style={{ color: '#666' }}>The requested game could not be found.</p>
      </div>
    );
  }

  return <GamesDescription game={game} />;
};

export default GameDetailPage;