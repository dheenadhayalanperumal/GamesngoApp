'use client';

import "./page.css";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProfileAvatar from "@/components/ProfileAvatar";
import BannerSlider from "@/components/Banner";
import TabBar from "@/components/TabBar";
import DailyCheckin from "@/components/DailyCheckin";
import ScratchAndWin from "@/components/ScratchAndWin";
import ShakeAndWin from "@/components/ShakeAndWin";
import QuickAction from "@/components/QuickAction";
import PopularToday from "@/components/PopularToday";
import RestaurantGame from "@/components/RestaurantGame";
import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from '@/contexts/AuthContext';

interface HomeData {
  popularGames?: Array<{
    id: number;
    name: string;
    type: string;
    bannerUrl: string;
    assetUrl: string;
    plays: number;
  }>;
  dailyScratch?: {
    id: number;
    title: string;
    type: string;
    amount?: number;
    product?: {
      id: number;
      title: string;
      coverImageUrl: string;
      price: {
        actual: number;
        discount: number;
      };
    };
  };
  restaurants?: Array<{
    id: number;
    name: string;
    logoUrl: string;
    location: {
      city: string;
      state: string;
    };
    activeOffers: number;
  }>;
  banners?: Array<{
    id: number;
    title: string;
    imageUrl: string;
    linkUrl?: string;
  }>;
  streak?: {
    current: number;
    max: number;
    lastLoginDate: string;
    totalLogins: number;
    progress: {
      current: number;
      of: number;
    };
    hasRedeemedToday: boolean;
  };
  todayReward?: {
    day: number;
    type: 'coin' | 'product';
    amount: number;
  };
  loginStreakRewards?: Array<{
    day: number;
    type: 'coin' | 'product';
    amount: number;
  }>;
}

export default function Home() {
  const { isLoading: authLoading, isLoggedIn } = useAuth();
  const [homeData, setHomeData] = useState<HomeData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const loadHomeData = async () => {
    console.log('Loading home data...');
    setIsLoading(true);

    try {
      // Load home data (this is what users want to see)
      await fetchHomeData();
      
    } catch (error) {
      console.error('Error loading data:', error);
      // Set fallback data to prevent infinite loading
      setHomeData({
        popularGames: [],
        dailyScratch: undefined,
        restaurants: [],
        banners: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  // checkAuthentication removed - AuthContext handles authentication

  const fetchHomeData = async () => {
    try {
      // If user is logged in, fetch detailed data from /api/home/details
      // Otherwise, fetch public home data
      const endpoint = isLoggedIn ? '/api/home/details' : `/api/public/home?t=${Date.now()}`;
      const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Home data response:', data);

      if (response.ok && data.status === 'success') {
        // Check if data is in "details" structure (from /api/home/details)
        if (data.details) {
          const details = data.details;
          setHomeData({
            popularGames: details.popularGames || [],
            dailyScratch: details.dailyScratch,
            restaurants: details.restaurants || [],
            banners: details.banners || [],
            streak: details.streak,
            todayReward: details.todayReward,
            loginStreakRewards: details.loginStreakRewards,
          });
          console.log('Streak data:', details.streak);
          console.log('Today reward:', details.todayReward);
          console.log('Login streak rewards:', details.loginStreakRewards);
        } else if (data.home) {
          // Handle public home data structure (from /api/public/home)
          const home = data.home || {};
          
          setHomeData({
            popularGames: home.popularGames || [],
            dailyScratch: home.dailyScratch,
            restaurants: home.restaurants || [],
            banners: home.banners || [],
            streak: home.streak,
            todayReward: home.loginStreakRewards?.[0],
            loginStreakRewards: home.loginStreakRewards || []
          });
          console.log('Home data loaded:', home);
          console.log('Login streak rewards:', home.loginStreakRewards);
          
          // If no daily scratch in home, try fetching it separately
          if (!home.dailyScratch) {
            console.warn('No dailyScratch in home data, fetching separately...');
            fetchDailyScratch();
          }
        }
      } else {
        console.warn('Failed to fetch home data:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  const fetchDailyScratch = async () => {
    try {
      const response = await fetch('/api/public/home?only=dailyscratch', {
        method: 'GET',
      });

      const data = await response.json();
      console.log('Daily scratch response:', data);

      if (response.ok && data.status === 'success' && data.dailyScratch) {
        setHomeData(prev => ({
          ...prev,
          dailyScratch: data.dailyScratch
        }));
      }
    } catch (error) {
      console.error('Error fetching daily scratch:', error);
    }
  };

  // fetchUserDetails removed - Header component now handles user data fetching

  // Show loading screen while checking authentication and loading data
  if (authLoading || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="layout" style={{ paddingBottom: '20px' }}>
      <Header 
        sx={{
          backgroundColor: '#4848DB',
          textAlign: 'center',
          color: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }} 
      />

      <ProfileAvatar/>

      <BannerSlider banners={homeData.banners} />
      <DailyCheckin 
        streak={homeData.streak}
        todayReward={homeData.todayReward}
        loginStreakRewards={homeData.loginStreakRewards}
        isLoggedIn={isLoggedIn}
      />
      <QuickAction/>
      <PopularToday games={homeData.popularGames} />
      <RestaurantGame restaurants={homeData.restaurants} />        
      <ScratchAndWin scratchData={homeData.dailyScratch} />
      <ShakeAndWin />
      <TabBar/>

    </div>
  );
}
