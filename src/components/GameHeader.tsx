"use client";

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, Typography, SxProps, Theme } from "@mui/material";
import logo from "../assets/images/logo.png";
import CoinIcon from "../assets/icons/coin.png";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

interface GameHeaderProps {
  sx?: SxProps<Theme>;
}

const GameHeader: React.FC<GameHeaderProps> = ({ sx }) => {
  const { isLoggedIn } = useAuth();
  const [coins, setCoins] = useState(0);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  const fetchUserData = async () => {
    if (isLoadingUserData) {
      console.log('GameHeader: User data already loading, skipping...');
      return;
    }

    setIsLoadingUserData(true);
    console.log('GameHeader: Fetching user data (counts)...');

    try {
      const countsResponse = await fetch('/api/home/counts', {
        method: 'GET',
        credentials: 'include',
      });

      const countsData = await countsResponse.json();

      console.log('GameHeader: Counts response:', countsData);

      if (countsResponse.ok && countsData.status === 'success') {
        setCoins(countsData.counts.coins);
        console.log('GameHeader: User is logged in');
      } else {
        console.log('GameHeader: User not logged in (counts failed)');
        setCoins(0);
        return;
      }

    } catch (error) {
      console.error('GameHeader: Error fetching user data:', error);
      setCoins(0);
    } finally {
      setIsLoadingUserData(false);
    }
  };

  // Listen for scratch redemption events to refresh wallet data
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScratchRedeemed = () => {
      console.log('GameHeader: Scratch redeemed event received, refreshing user data...');
      if (isLoggedIn) {
        fetchUserData();
      }
    };
    
    window.addEventListener('scratchRedeemed', handleScratchRedeemed);
    return () => window.removeEventListener('scratchRedeemed', handleScratchRedeemed);
  }, [isLoggedIn]);

  // Fetch user data when login status changes
  useEffect(() => {
    if (isLoggedIn) {
      console.log('GameHeader: User is logged in, fetching user data...');
      fetchUserData();
    } else {
      console.log('GameHeader: User is not logged in, clearing data...');
      setCoins(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // Fetch user data periodically only if logged in
  useEffect(() => {
    // Only fetch if user is logged in
    if (isLoggedIn) {
      // Poll every 30 seconds for updates
      const interval = setInterval(() => {
        fetchUserData();
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // Check if position is overridden in sx prop
  const sxPosition = sx && typeof sx === 'object' && 'position' in sx 
    ? (sx as any).position 
    : null;
  
  // Use position from sx if provided, otherwise use relative
  const appBarPosition = sxPosition !== null && sxPosition !== undefined 
    ? sxPosition 
    : "relative";

  return (
    <AppBar
      position={appBarPosition as "fixed" | "absolute" | "relative" | "static" | "sticky"}
      sx={{
        top: 0,
        backgroundColor: "#4848db",
        boxShadow: "none",
        transition: "all 0.3s ease",
        ...sx,
      }}
    >
      <Toolbar
        sx={{
          padding: "15px !important",
          minHeight: "auto !important",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img
            src={logo.src}
            alt="Logo"
            style={{ width: "110px", height: "24px" }}
          />
        </Box>

        {isLoggedIn && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "50px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
            <Image
              src={CoinIcon}
              alt="Coins"
              width={20}
              height={20}
            />
            <Typography
              sx={{
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: 1,
              }}
            >
              {coins}
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default GameHeader;

