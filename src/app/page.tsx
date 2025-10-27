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
}

export default function Home() {
  const [homeData, setHomeData] = useState<HomeData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const response = await fetch('/api/public/home', {
        method: 'GET',
      });

      const data = await response.json();
      console.log('Home data response:', data);

      if (response.ok && data.status === 'success') {
        // The API returns data in a "home" object
        setHomeData(data.home || {});
        console.log('Daily scratch data:', data.home?.dailyScratch);
        
        // If no daily scratch in home, try fetching it separately
        if (!data.home?.dailyScratch) {
          console.warn('No dailyScratch in home data, fetching separately...');
          fetchDailyScratch();
        }
      } else {
        console.warn('Failed to fetch home data:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="layout">
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

      <ProfileAvatar/>

      <BannerSlider banners={homeData.banners} />
      <DailyCheckin/>
      <QuickAction/>
      <PopularToday games={homeData.popularGames} />
      <RestaurantGame restaurants={homeData.restaurants} />        
      <ScratchAndWin scratchData={homeData.dailyScratch} />
      <ShakeAndWin />
      <TabBar/>

    </div>
  );
}
