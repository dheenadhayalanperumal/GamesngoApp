"use client";

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box, Typography, SxProps, Theme } from "@mui/material";
import logo from "../assets/images/logo.png";
import CurrencyButton from "./CurrencyButton";

interface HeaderProps {
  sx?: SxProps<Theme>;
}

const Header: React.FC<HeaderProps> = ({ sx }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coins, setCoins] = useState(120);
  const [strikes, setStrikes] = useState(13);
  const [cupons, setcupons] = useState(5);
  const [isFixed, setIsFixed] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
              onClick={handleLogin}
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
    </AppBar>
  );
};

export default Header;