"use client";

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box, Typography, SxProps, Theme } from "@mui/material";
import logo from "../assets/images/logo.png";
import CurrencyButton from "./CurrencyButton";
import LoginPopup from "./LoginPopup";

interface HeaderProps {
  sx?: SxProps<Theme>;
}

const Header: React.FC<HeaderProps> = ({ sx }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coins, setCoins] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [cupons, setCupons] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Fetch counts and details after login
    fetchCounts();
    fetchUserDetails();
  };

  const handleLoginPopupClose = () => {
    setIsLoginPopupOpen(false);
  };

  const fetchCounts = async () => {
    try {
      const response = await fetch('/api/home/counts', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setCoins(data.counts.coins);
        setCupons(data.counts.vouchers.unredeemed);
        // If we successfully fetched counts, user is logged in
        if (!isLoggedIn) {
          setIsLoggedIn(true);
        }
      } else {
        // User is not logged in or token expired
        console.error('Failed to fetch counts:', data.message);
        if (isLoggedIn) {
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.error('Error fetching counts:', error);
      if (isLoggedIn) {
        setIsLoggedIn(false);
      }
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('/api/home/details', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('User details for streak:', data);

      if (response.ok && data.status === 'success') {
        // Set streak from API data
        if (data.details.streak) {
          setStrikes(data.details.streak.current || 0);
          console.log('Current streak:', data.details.streak.current);
        }
      } else {
        console.warn('Failed to fetch user details:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
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

  // Check login status on mount
  useEffect(() => {
    // Try to fetch counts and details on mount to check if user has valid cookies
    fetchCounts();
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch counts and details periodically only if logged in
  useEffect(() => {
    // Only fetch if user is logged in
    if (isLoggedIn) {
      // Poll every 30 seconds for updates
      const interval = setInterval(() => {
        fetchCounts();
        fetchUserDetails();
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <AppBar
      position={isFixed ? "fixed" : "absolute"}
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