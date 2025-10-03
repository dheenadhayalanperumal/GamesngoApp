"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Popover } from "@mui/material";
import WalletIcon from "../assets/images/svg/wallet.svg";
import StrikesIcon from "../assets/images/svg/strikes.svg";
import CoinsIcon from "../assets/images/svg/gamecoin.svg";
import CouponsIcon from "../assets/images/svg/coupons.svg";

interface CurrencyButtonProps {
  type: "Wallet" | "strikes";
  value?: number;
  coins?: number;
  coupons?: number;
}

const CurrencyButton: React.FC<CurrencyButtonProps> = ({
  type,
  value,
  coins,
  coupons,
}) => {
  const isWallet = type === "Wallet";
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isWallet) {
      setAnchorEl(buttonRef.current);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      if (open) {
        handleClose();
      }
    };

    if (open) {
      window.addEventListener("scroll", handleScroll, true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  return (
    <>
      <Box
        ref={buttonRef}
        onClick={handleClick}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "8px 8px",
          borderRadius: "50px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            opacity: 0.9,
            transform: "translateY(-1px)",
          },
        }}
      >
        <Box
          sx={{
            width: "20px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={isWallet ? WalletIcon.src : StrikesIcon.src}
            alt={isWallet ? "Wallet" : "Strikes"}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Typography
          sx={{
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: 1,
          }}
        >
          {isWallet ? "Wallet" : value}
        </Typography>
        {isWallet && (
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "10px",
              lineHeight: 1,
              
            }}
          >
            ▼
          </Typography>
        )}
      </Box>

      {isWallet && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            mt: 1,
            "& .MuiPopover-paper": {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "20px",
              boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <Box
            sx={{
              p: 2,
              minWidth: "100px",
            }}
          >
            <Box
              sx={{
                display: "flex",

                alignItems: "center",
                // justifyContent:"space-evenly",
                gap: 1,
                mb: 1.5,
                // padding: "8px 8px",
                // backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
              }}
            >
              <img
                src={CoinsIcon.src}
                alt="Coins"
                style={{ width: "20px", height: "20px" }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#FFFFFF",
                  flexGrow: 1,
                }}
              >
                {coins || 0}
              </Typography>
              {/* <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#FFFFFF",
                }}
              >
                Coins
              </Typography> */}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                // padding: "8px 12px",
                // backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
              }}
            >
              <img
                src={CouponsIcon.src}
                alt="Coupons"
                style={{ width: "20px", height: "20px" }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#FFFFFF",
                  flexGrow: 1,
                }}
              >
                {coupons || 0}
              </Typography>
              {/* <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#FFFFFF",
                }}
              >
                Coupons
              </Typography> */}
            </Box>
          </Box>
        </Popover>
      )}
    </>
  );
};

export default CurrencyButton;
