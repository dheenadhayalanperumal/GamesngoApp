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
  const [strikes] = useState(13);
  const [cupons, setCupons] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Fetch counts after login
    fetchCounts();
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
        setCupons(data.counts.vouchers.total);
        // If we successfully fetched counts, user is logged in
        setIsLoggedIn(true);
      } else {
        // User is not logged in or token expired
        console.error('Failed to fetch counts:', data.message);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error fetching counts:', error);
      setIsLoggedIn(false);
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

  // Fetch counts on mount and periodically if logged in
  useEffect(() => {
    // Try to fetch counts on mount (user might already have valid cookies)
    fetchCounts();

    // Poll every 30 seconds for updates
    const interval = setInterval(() => {
      if (isLoggedIn) {
        fetchCounts();
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
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