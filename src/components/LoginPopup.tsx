"use client";

import React, { useState } from "react";
import {
  Box,
  // Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  // Divider,
  Link,
} from "@mui/material";
import { Close, Phone, Lock } from "@mui/icons-material";
import Image from "next/image";
import SignupPopup from "./SignupPopup";
import { useAuth } from '@/contexts/AuthContext';

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
  const { login } = useAuth();
  const [mobileNumber, setMobileNumber] = useState("");
  const [pin, setPin] = useState("");
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Validate input
    if (!mobileNumber || !pin) {
      alert('Please enter mobile number and PIN');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Logging in with mobile:', mobileNumber);

      // Create FormData for the API call
      const formData = new FormData();
      formData.append('mobile', mobileNumber);
      formData.append('pin', pin);

      // Call the login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        console.log('Login successful:', data.message);
        login(); // Update global auth state
        onLogin();
        onClose();
      } else {
        // Handle API errors
        if (response.status === 400) {
          alert('Mobile and PIN are required');
        } else if (response.status === 401) {
          alert('Invalid credentials');
        } else if (response.status === 403) {
          alert('Account disabled');
        } else {
          alert('Failed to login. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error instanceof Error) {
        alert('Network error. Please check your connection and try again.');
      } else {
        alert('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleSignupClick = () => {
    setIsSignupOpen(true);
  };

  const handleSignupClose = () => {
    setIsSignupOpen(false);
  };

  const handleSignup = () => {
    // Handle signup logic here
    console.log("Signup completed");
    onLogin(); // This will log the user in after signup
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
          disabled={isLoading}
          sx={{
            backgroundColor: isLoading ? "#ccc" : "#FAC200",
            color: "#ffffff",
            borderRadius: "10px",
            padding: "14px",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "20px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: isLoading ? "#ccc" : "#FFA500",
            },
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        {/* Don't have Account Link */}
        <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSignupClick();
            }}
            sx={{
              color: "#3C3CD2",
              textDecoration: "none",
              fontFamily: "Rubik",
              fontStyle: "normal",
              fontSize: "20px",
              fontWeight: "500",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Don&apos;t have Account ?
          </Link>
        </Box>

        {/* Continue With Google Button */}
        {/* <Button
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
        </Button> */}
        </Box>
      </DialogContent>
      
      {/* Signup Popup */}
      <SignupPopup
        isOpen={isSignupOpen}
        onClose={handleSignupClose}
        onSignup={handleSignup}
      />
    </Dialog>
  );
};

export default LoginPopup;
