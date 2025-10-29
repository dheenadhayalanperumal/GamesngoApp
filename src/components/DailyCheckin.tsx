'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DailyCheckBox from './DailyCheckBox';
import ClaimButton from './ClaimButton';
import CouponPopup from './CouponPopup';
import LoginPopup from './LoginPopup';

interface LoginStreakReward {
  day: number;
  type: 'coin' | 'product';
  amount: number;
}

interface StreakData {
  current: number;
  max: number;
  lastLoginDate: string;
  totalLogins: number;
  progress: {
    current: number;
    of: number;
  };
  hasRedeemedToday: boolean;
}

interface TodayReward {
  day: number;
  type: 'coin' | 'product';
  amount: number;
}

interface DailyCheckinProps {
  onClaim?: () => void;
  streak?: StreakData;
  todayReward?: TodayReward;
  loginStreakRewards?: LoginStreakReward[];
  isLoggedIn?: boolean;
}

const DailyCheckin: React.FC<DailyCheckinProps> = ({
  onClaim,
  streak,
  todayReward,
  loginStreakRewards = [],
  isLoggedIn = false
}) => {
    // Use API data for rewards, fallback to default if not provided
    const dailyRewards = loginStreakRewards.length > 0 
      ? loginStreakRewards.map(reward => reward.amount)
      : [10, 15, 20, 25, 30, 35, 50];
    
    // Get current day and redemption status from streak data
    // For non-logged-in users, show day 1 as unlocked but not claimable
    const currentDay = isLoggedIn ? (streak?.current || 1) : 1;
    const hasRedeemedToday = isLoggedIn ? (streak?.hasRedeemedToday || false) : false;
    
    // Debug logging
    console.log('🎯 DailyCheckin Debug:', {
      isLoggedIn,
      currentDay,
      hasRedeemedToday,
      streak,
      loginStreakRewards: loginStreakRewards.length
    });
    const [isClaiming, setIsClaiming] = useState(false);
    const [isRewardPopupOpen, setIsRewardPopupOpen] = useState(false);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [rewardData, setRewardData] = useState<{
      day: number;
      type: 'coin' | 'product';
      amount?: number;
      product?: { id: number };
      voucherId?: number;
      redemptionId: number;
    } | null>(null);

    // Calculate claimed days based on streak
    // If hasRedeemedToday is true, all days up to and including currentDay are claimed
    // If hasRedeemedToday is false, days 1 to (currentDay - 1) are claimed, currentDay is active/unclaimed
    const getClaimedDays = (): number[] => {
      if (!currentDay || currentDay === 0) return [];
      
      if (hasRedeemedToday) {
        // All days from 1 to currentDay are claimed
        const claimedDays = Array.from({ length: currentDay }, (_, i) => i + 1);
        console.log('DailyCheckin - hasRedeemedToday is TRUE, claimed days:', claimedDays);
        return claimedDays;
      } else {
        // Days 1 to (currentDay - 1) are claimed, currentDay is active
        const claimedDays = Array.from({ length: Math.max(0, currentDay - 1) }, (_, i) => i + 1);
        console.log('DailyCheckin - hasRedeemedToday is FALSE, claimed days:', claimedDays);
        return claimedDays;
      }
    };

    const [localClaimedDays, setLocalClaimedDays] = useState<number[]>(getClaimedDays());

    // Update claimed days when props change
    useEffect(() => {
      console.log('🎯 DailyCheckin - Props updated:', { currentDay, hasRedeemedToday });
      const newClaimedDays = getClaimedDays();
      console.log('📋 DailyCheckin - Updating localClaimedDays to:', newClaimedDays);
      console.log('🔘 Button will be disabled:', !currentDay || currentDay > 7 || hasRedeemedToday);
      setLocalClaimedDays(newClaimedDays);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDay, hasRedeemedToday]);

    const redeemStreak = async () => {
      setIsClaiming(true);
      try {
        console.log('Claiming daily check-in reward...');
        
        const response = await fetch('/api/streak/redeem', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Streak redeem response:', data);

        if (response.ok && data.status === 'success') {
          // Use todayReward data if available, otherwise use API response
          const rewardInfo = todayReward || data.reward;
          setRewardData({
            day: rewardInfo.day || currentDay,
            type: rewardInfo.type || 'coin',
            amount: rewardInfo.amount || 0,
            product: rewardInfo.product,
            voucherId: rewardInfo.voucherId,
            redemptionId: data.reward?.redemptionId || 0
          });
          console.log('Reward received:', rewardInfo);
          
          // Add current day to claimed days with animation
          setTimeout(() => {
            setLocalClaimedDays(prev => [...prev, currentDay]);
            setIsClaiming(false);
            
            // Show reward popup
            setIsRewardPopupOpen(true);
          }, 1000);
          
          return rewardInfo;
        } else {
          console.error('Redeem failed:', response.status, data);
          setIsClaiming(false);
          
          if (response.status === 401) {
            alert('Please login to claim daily rewards');
          } else if (response.status === 404) {
            alert('No reward configured for this day');
          } else if (response.status === 409) {
            alert('You have already claimed today\'s reward');
          } else if (response.status === 422) {
            alert('Invalid product reward');
          } else {
            alert(data.message || 'Failed to claim reward. Please try again.');
          }
          return null;
        }
      } catch (error) {
        console.error('Error claiming reward:', error);
        setIsClaiming(false);
        alert('Network error. Please try again.');
        return null;
      }
    };

    const handleClaim = () => {
      // Call the redeem API
      redeemStreak();
      
      // Also call the parent's onClaim if provided
      if (onClaim) {
        onClaim();
      }
    };

    const handleClaimed = () => {
      // This is called by ClaimButton after animation
      // The API call is now handled in handleClaim
    };

    const handleRewardPopupClose = () => {
      setIsRewardPopupOpen(false);
      // Optionally refresh the page or update data
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    };

    const handleLoginPopupClose = () => {
      setIsLoginPopupOpen(false);
    };

    const handleLogin = () => {
      setIsLoginPopupOpen(false);
      // Optionally refresh the page to update the UI
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    };

    return (
        <Box
            sx={{
                background: 'white',
                borderRadius: {
                    xs: '12px',
                    sm: '16px',
                    md: '20px'
                },
                padding: {
                    xs: '12px',
                    sm: '16px',
                    md: '20px'
                },
                display: 'flex',
                flexDirection: 'column',
                gap: {
                    xs: '16px',
                    sm: '18px',
                    md: '20px'
                },
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                maxWidth: '100%',
                margin: '0 auto',
                width:'100%',
            }}
        >
            <Typography
                variant='h6'
                sx={{
                    color: '#2c3e50',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    fontSize: {
                        xs: '20px',
                        sm: '22px',
                        md: '24px'
                    }
                }}
            >
                Daily Check In
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                    gap: {
                        xs: '6px',
                        sm: '10px',
                        md: '14px'
                    },
                    justifyItems: 'center',
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden'
                }}
            >
                {dailyRewards.map((reward, index) => {
                    const dayNumber = index + 1;
                    
                    // For non-logged-in users, only day 1 is unlocked
                    // For logged-in users, use the normal logic
                    const isUnlocked = isLoggedIn 
                        ? dayNumber <= currentDay 
                        : dayNumber === 1;
                    
                    const isCurrentDay = dayNumber === currentDay;
                    
                    // For non-logged-in users, no days are completed or claimed
                    // For logged-in users, use the normal logic
                    const isCompleted = isLoggedIn 
                        ? (hasRedeemedToday ? dayNumber <= currentDay : dayNumber < currentDay)
                        : false;
                    
                    const isClaimed = isLoggedIn 
                        ? (isCurrentDay && hasRedeemedToday ? true : localClaimedDays.includes(dayNumber))
                        : false;
                    
                    const isAnimating = isCurrentDay && isClaiming;
                    
                    // Debug log for current day
                    if (isCurrentDay) {
                        console.log(`🎯 Day ${dayNumber} (Current Day):`, {
                            currentDay,
                            hasRedeemedToday,
                            localClaimedDays,
                            isClaimed,
                            isUnlocked,
                            isCompleted
                        });
                    }

                    return (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: {
                                    xs: '4px',
                                    sm: '6px',
                                    md: '8px'
                                },
                                width: '100%',
                                transform: isAnimating ? 'scale(1.05)' : 'scale(1)',
                                transition: 'transform 0.3s ease',
                            }}
                        >
                            <DailyCheckBox
                                coinCount={reward}
                                isUnlocked={isUnlocked}
                                isCompleted={isCompleted}
                                isClaimed={isClaimed}
                                isAnimating={isAnimating}
                            />
                            <Typography
                                variant='body2'
                                sx={{
                                    color: '#2c3e50',
                                    fontWeight: 'bold',
                                    fontSize: {
                                        xs: '10px',
                                        sm: '12px',
                                        md: '14px'
                                    },
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Day {dayNumber}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>

            <ClaimButton
                onClick={isLoggedIn ? handleClaim : () => {
                    // For non-logged-in users, show login popup
                    setIsLoginPopupOpen(true);
                }}
                onClaimed={handleClaimed}
                disabled={!isLoggedIn || (isLoggedIn && (hasRedeemedToday || isClaiming || !currentDay || currentDay > 7))}
            />

            {/* Reward Popup */}
            <CouponPopup
                isOpen={isRewardPopupOpen}
                onClose={handleRewardPopupClose}
                coinsWon={rewardData?.amount || 0}
                rewardData={rewardData ? {
                    type: rewardData.type,
                    amount: rewardData.amount,
                    product: rewardData.product,
                    voucherId: rewardData.voucherId,
                    redemptionId: rewardData.redemptionId,
                    spent: 0,
                    attemptNo: rewardData.day
                } : undefined}
            />

            {/* Login Popup */}
            <LoginPopup
                isOpen={isLoginPopupOpen}
                onClose={handleLoginPopupClose}
                onLogin={handleLogin}
            />
        </Box>
    );
};

export default DailyCheckin;


