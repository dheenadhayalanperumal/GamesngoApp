"use client";

import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import logo from "../assets/images/logo.png";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coins, setCoins] = useState(120);
  const [strikes, setStrikes] = useState(3);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        marginTop: 0,
        padding: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          padding: "0 !important",
          marginTop: "10px",
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
                padding: "0 20%",
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
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                🪙 {coins}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                ⚡ {strikes}
              </Typography>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;