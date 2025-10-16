"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  Divider,
  Link,
} from "@mui/material";
import { Close, Phone, Lock, Google } from "@mui/icons-material";
import Image from "next/image";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = () => {
    // Here you would typically validate the credentials
    // For now, we'll just call the onLogin callback
    onLogin();
    onClose();
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login clicked");
    onLogin();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "24px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,249,250,0.7) 100%)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", marginBottom: "18px" }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "#666",
            }}
          >
            <Close />
          </IconButton>

          <Box sx={{ marginBottom: "0px", mt: "8px" }}>
            <Image
              src="/logoblue.svg"
              alt="GAMES N GO"
              width={168}
              height={42}
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>

        {/* Login Form */}
        <Box
          sx={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,249,250,0.7) 100%)",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "20 20px 40px rgba(0, 0, 0, 0.55)",
          }}
        >
          <Box sx={{ marginBottom: "24px" }}>
            {/* Mobile Number Field */}
            <TextField
              fullWidth
              placeholder="Enter Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: "#FAC200" }} />
                  </InputAdornment>
                ),
              }}
               sx={{
                 marginBottom: "20px",
                 "& .MuiOutlinedInput-root": {
                   borderRadius: "20px",
                   backgroundColor: "#FFF",
                   border: "1px solid rgba(0, 0, 0, 0.20)",
                   "& fieldset": {
                     border: "none",
                   },
                   "&:hover fieldset": {
                     border: "none",
                   },
                   "&.Mui-focused": {
                     border: "1px solid #FAC200",
                     "& fieldset": {
                       border: "none",
                     },
                   },
                 },
               }}
            />

            {/* PIN Field */}
            <TextField
              fullWidth
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#FAC200" }} />
                  </InputAdornment>
                ),
              }}
               sx={{
                 "& .MuiOutlinedInput-root": {
                   borderRadius: "20px",
                   backgroundColor: "#FFF",
                   border: "1px solid rgba(0, 0, 0, 0.20)",
                   "& fieldset": {
                     border: "none",
                   },
                   "&:hover fieldset": {
                     border: "none",
                   },
                   "&.Mui-focused": {
                     border: "1px solid #FAC200",
                     "& fieldset": {
                       border: "none",
                     },
                   },
                 },
               }}
            />
          </Box>
        

        {/* Next Button */}
        <Button
          fullWidth
          onClick={handleLogin}
          sx={{
            backgroundColor: "#FAC200",
            color: "#ffffff",
            borderRadius: "10px",
            padding: "14px",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "20px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#FFA500",
            },
          }}
        >
          Next
        </Button>

        {/* Don't have Account Link */}
        <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
          <Link
            href="#"
            sx={{
              color: "#3C3CD2",
              textDecoration: "none",
              fontFamily: "Rubik",
              fontStyle: "normal",
              fontSize: "20px",
              fontWeight: "500",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Don't have Account ?
          </Link>
        </Box>

        {/* Continue With Google Button */}
        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleLogin}
          startIcon={<Google sx={{ color: "#4285F4" }} />}
           sx={{
             border: "1px solid rgba(0, 0, 0, 0.20)",
             color: "#000000",
             fontFamily: "Rubik",
             fontStyle: "normal",
             borderRadius: "20px",
             padding: "14px",
             fontSize: "16px",
             fontWeight: "500",
             textTransform: "none",
             backgroundColor: "#FFF",
             "&:hover": {
               borderColor: "rgba(0, 0, 0, 0.20)",
               backgroundColor: "#fafafa",
             },
           }}
        >
          Continue With Google
        </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
