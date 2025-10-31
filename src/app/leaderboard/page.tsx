'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import TabSelector from '@/components/leaderboard/TabSelector';
import WinnerPodium from '@/components/leaderboard/WinnerPodium';
import PrizesSection from '@/components/leaderboard/PrizesSection';
import PlayersList from '@/components/leaderboard/PlayersList';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardEntry {
  rank: number;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  plays: number;
  totalScore: number;
  bestScore: number;
}

interface Prize {
  rank: number;
  type: 'coin' | 'voucher';
  amount?: number;
  voucher?: {
    id: number;
    name: string;
    code: string;
    percent: number;
  };
}

interface LeaderboardData {
  weekly: {
    leaderboard: LeaderboardEntry[];
    prizes: Prize[];
    previousWeekTop?: LeaderboardEntry[];
    previousWeekRange?: {
      from: string;
      to: string;
    };
    me?: {
      rank: number | null;
      plays: number;
      totalScore: number;
      bestScore: number;
      position: number | null;
    };
  };
  allTime: {
    leaderboard: LeaderboardEntry[];
    me?: {
      rank: number | null;
      plays: number;
      totalScore: number;
      bestScore: number;
      position: number | null;
    };
  };
}

interface Winner {
  rank: number;
  name: string;
  avatar: string;
  coins: number;
}

interface Player {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  coins: number;
  isCurrentUser?: boolean;
}

interface PrizeDisplay {
  rank: number;
  coins: number;
}

export default function Leaderboard() {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<'weekly' | 'alltime'>('weekly');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string>('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/public/leaderboard/games', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
          setLeaderboardData(data);
        } else {
          setError('Failed to load leaderboard data');
        }
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('An error occurred while loading leaderboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Fetch user details if logged in
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isLoggedIn) {
        setUserName('');
        setUserAvatar('');
        return;
      }

      try {
        const response = await fetch('/api/home/details', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok && data.status === 'success' && data.details?.user) {
          setUserName(data.details.user.name || 'User');
          setUserAvatar(data.details.user.imageUrl || '');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, [isLoggedIn]);

  // Transform API data to component formats
  const transformToWinners = (entries: LeaderboardEntry[]): Winner[] => {
    // Get top 3 for podium
    return entries
      .filter((entry) => entry.rank <= 3)
      .map((entry) => ({
        rank: entry.rank,
        name: entry.user.name,
        avatar: entry.user.avatar || '/avatar1.jpg',
        coins: entry.totalScore, // Using totalScore as coins for display
      }));
  };

  const transformToPlayers = (
    entries: LeaderboardEntry[],
    prizes: Prize[],
    meData?: { rank: number | null; totalScore: number; position: number | null }
  ): Player[] => {
    // Create a map of prizes by rank for coin lookup
    const prizeMap = new Map<number, number>();
    prizes
      .filter((p) => p.type === 'coin' && p.amount)
      .forEach((p) => prizeMap.set(p.rank, p.amount || 0));

    return entries.map((entry) => {
      // Check if this entry is the current user (in top 10)
      const isCurrentUser =
        meData !== undefined &&
        meData.position !== null &&
        entry.rank === meData.position;

      return {
        rank: entry.rank,
        name: entry.user.name,
        avatar: entry.user.avatar || '/avatar4.jpg',
        score: entry.totalScore,
        coins: prizeMap.get(entry.rank) || 0, // Get coins from prizes if available, else 0
        isCurrentUser,
      };
    });
  };

  const transformPrizes = (prizes: Prize[]): PrizeDisplay[] => {
    // Only include coin-type prizes
    return prizes
      .filter((p) => p.type === 'coin' && p.amount)
      .map((p) => ({
        rank: p.rank,
        coins: p.amount || 0,
      }))
      .sort((a, b) => a.rank - b.rank);
  };

  // Get current data based on active tab
  // For weekly, use previousWeekTop for winners (past week result)
  // For all-time, use the current leaderboard top 3
  const currentWinners: Winner[] = leaderboardData
    ? activeTab === 'weekly'
      ? leaderboardData.weekly.previousWeekTop
        ? transformToWinners(leaderboardData.weekly.previousWeekTop)
        : []
      : transformToWinners(leaderboardData.allTime.leaderboard)
    : [];

  const currentMeData = leaderboardData
    ? activeTab === 'weekly'
      ? leaderboardData.weekly.me
      : leaderboardData.allTime.me
    : undefined;

  const currentPlayers: Player[] = leaderboardData
    ? activeTab === 'weekly'
      ? transformToPlayers(
          leaderboardData.weekly.leaderboard,
          leaderboardData.weekly.prizes,
          leaderboardData.weekly.me
        )
      : transformToPlayers(
          leaderboardData.allTime.leaderboard,
          [],
          leaderboardData.allTime.me
        )
    : [];

  const prizes: PrizeDisplay[] = leaderboardData
    ? transformPrizes(leaderboardData.weekly.prizes)
    : [];

  // Create user player card if user is not in top 10 and has a rank (has plays)
  const userPlayer: Player | undefined =
    isLoggedIn &&
    currentMeData &&
    currentMeData.position === null &&
    currentMeData.rank !== null &&
    currentMeData.rank > 0
      ? {
          rank: currentMeData.rank,
          name: userName || 'You',
          avatar: userAvatar || '/avatar4.jpg',
          score: currentMeData.totalScore,
          coins:
            activeTab === 'weekly' && leaderboardData
              ? leaderboardData.weekly.prizes
                  .filter((p) => p.type === 'coin' && p.amount && p.rank === currentMeData.rank)
                  .reduce((acc, p) => acc + (p.amount || 0), 0)
              : 0,
          isCurrentUser: true,
        }
      : undefined;

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
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography sx={{ color: 'white', fontSize: 18 }}>
              {error}
            </Typography>
          </Box>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <>
            {/* Winner Podium */}
            <WinnerPodium
              winners={currentWinners}
              title={activeTab === 'weekly' ? 'Past Week Result' : 'All Time Result'}
            />

            {/* Prizes Section - Only show for weekly */}
            {activeTab === 'weekly' && prizes.length > 0 && <PrizesSection prizes={prizes} />}

            {/* Players List */}
            <PlayersList 
              players={currentPlayers} 
              title={activeTab === 'weekly' ? 'This Week' : 'All Time'}
              userPlayer={userPlayer}
            />
          </>
        )}
      </Box>

      {/* Tab Bar */}
      <TabBar />
    </>
  );
}
