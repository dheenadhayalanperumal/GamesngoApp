"use client";

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box, Typography, SxProps, Theme } from "@mui/material";
import logo from "../assets/images/logo.png";
import CurrencyButton from "./CurrencyButton";
import LoginPopup from "./LoginPopup";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  sx?: SxProps<Theme>;
  isLoggedIn?: boolean | null;
}

const Header: React.FC<HeaderProps> = ({ sx }) => {
  const { isLoggedIn, login, logout } = useAuth();
  const [coins, setCoins] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [cupons, setCupons] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleLogin = () => {
    login(); // Use context login function
    // Fetch user data after login
    fetchUserData();
  };

  const handleLoginPopupClose = () => {
    setIsLoginPopupOpen(false);
  };

  const fetchUserData = async () => {
    if (isLoadingUserData) {
      console.log('User data already loading, skipping...');
      return;
    }

    setIsLoadingUserData(true);
    console.log('Header: Fetching user data (counts + details)...');

    try {
      // Fetch both counts and details in parallel
      const [countsResponse, detailsResponse] = await Promise.all([
        fetch('/api/home/counts', {
          method: 'GET',
          credentials: 'include',
        }),
        fetch('/api/home/details', {
          method: 'GET',
          credentials: 'include',
        })
      ]);

      const countsData = await countsResponse.json();
      const detailsData = await detailsResponse.json();

      console.log('Header: Counts response:', countsData);
      console.log('Header: Details response:', detailsData);

      if (countsResponse.ok && countsData.status === 'success') {
        setCoins(countsData.counts.coins);
        setCupons(countsData.counts.vouchers.unredeemed);
        login(); // Update global auth state
        console.log('Header: User is logged in');
      } else {
        console.log('Header: User not logged in (counts failed)');
        logout(); // Update global auth state
        setCoins(0);
        setCupons(0);
        setStrikes(0);
        return;
      }

      if (detailsResponse.ok && detailsData.status === 'success') {
        if (detailsData.details.streak) {
          setStrikes(detailsData.details.streak.current || 0);
          console.log('Header: Current streak:', detailsData.details.streak.current);
        }
      } else {
        console.warn('Header: Failed to fetch user details:', detailsData.message);
      }

    } catch (error) {
      console.error('Header: Error fetching user data:', error);
      logout(); // Update global auth state
      setCoins(0);
      setCupons(0);
      setStrikes(0);
    } finally {
      setIsLoadingUserData(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (scrollPosition >= viewportHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for scratch redemption events to refresh wallet/voucher data
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScratchRedeemed = () => {
      console.log('Header: Scratch redeemed event received, refreshing user data...');
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
      console.log('Header: User is logged in, fetching user data...');
      fetchUserData();
    } else {
      console.log('Header: User is not logged in, clearing data...');
      setCoins(0);
      setCupons(0);
      setStrikes(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // Fetch user data periodically only if logged in
  useEffect(() => {
    // Only fetch if user is logged in
    if (isLoggedIn) {
      // Poll every 30 seconds for updates
      const interval = setInterval(() => {
        fetchUserData(); // Single call for both counts and details
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // Check if position is overridden in sx prop
  const sxPosition = sx && typeof sx === 'object' && 'position' in sx 
    ? (sx as any).position 
    : null;
  
  // Use position from sx if provided, otherwise use the default behavior
  const appBarPosition = sxPosition !== null && sxPosition !== undefined 
    ? sxPosition 
    : (isFixed ? "fixed" : "absolute");

  return (
    <AppBar
      position={appBarPosition as "fixed" | "absolute" | "relative" | "static" | "sticky"}
      sx={{
        top: 0,
        // marginTop: '15px',
        // paddingLeft:'15px',
        // paddingRight:'15px',
        backgroundColor: "#4848db",

        boxShadow: "none",
        transition: "all 0.3s ease",
        // marginBottom:'50px',
        ...sx,
      }}
    >
      <Toolbar
        sx={{
          padding: "15px !important",
          // marginTop: "10px",
          minHeight: "auto !important",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img
            src={logo.src}
            alt="Logo"
            style={{ width: "168px", height: "42px" }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!isLoggedIn ? (
            <Button
              variant="outlined"
              onClick={handleLoginClick}
              sx={{
                height: "42px",
                margin: 0,
                // padding: "0 20%",
                color: "inherit",
                borderColor: "currentColor",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              <Typography variant="button">Login</Typography>
            </Button>
          ) : (
            <>
              <CurrencyButton type="strikes" value={strikes} />
              <CurrencyButton type="Wallet" coins={coins} coupons={cupons} />
            </>
          )}
        </Box>
      </Toolbar>
      
      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleLoginPopupClose}
        onLogin={handleLogin}
      />
    </AppBar>
  );
};

export default Header;