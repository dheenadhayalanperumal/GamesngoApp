"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Close, Phone, Lock } from "@mui/icons-material";
import Image from "next/image";
import SetPinPopup from "./SetPinPopup";

interface ForgotPinPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onGoToLogin?: () => void;
}

const ForgotPinPopup: React.FC<ForgotPinPopupProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onGoToLogin,
}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSetPinOpen, setIsSetPinOpen] = useState(false);

  const handleVerify = async () => {
    if (!mobileNumber) {
      alert('Please enter mobile number');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('mobile', mobileNumber);

      const response = await fetch('/api/auth/forgot-pin/request', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setIsOtpSent(true);
        alert('If the account exists, an OTP has been sent.');
      } else {
        alert('Failed to request OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (!otp) {
      alert('Please enter OTP');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('mobile', mobileNumber);
      formData.append('otp', otp);

      const response = await fetch('/api/auth/forgot-pin/verify', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Close this popup and open Set PIN popup directly
        onClose();
        setIsSetPinOpen(true);
      } else {
        alert('Invalid or expired OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPinClose = () => {
    setIsSetPinOpen(false);
    onClose(); // Also close the ForgotPinPopup
  };

  const handleSetPinSuccess = (_pin?: string) => {
    // After PIN is set, close Set PIN popup and go to login popup
    setIsSetPinOpen(false);
    onClose(); // Close the ForgotPinPopup
    if (onGoToLogin) {
      onGoToLogin();
    } else {
      onSuccess();
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
          },
          paper: {
            sx: {
              borderRadius: "16px",
              padding: "24px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(248, 249, 250, 0.7) 100%);",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            },
          },
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", marginBottom: "24px" }}>
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

            <Box sx={{ marginBottom: "16px" }}>
              <Image
                src="/logoblue.svg"
                alt="GAMES N GO"
                width={168}
                height={42}
                style={{ objectFit: "contain" }}
              />
            </Box>

            <Typography
              variant="h5"
              sx={{
                color: '#21175B',
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "8px",
              }}
            >
              Forgot your PIN?{" "}
              <Box component="span" sx={{ color: '#21175B' }}>
                Let&apos;s fix it fast
              </Box>
            </Typography>
          </Box>

          {/* Form */}
          <Box
            sx={{
              
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(248, 249, 250, 0.7) 100%)",
              borderRadius: "20px",
              padding: "20px",
              //boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",

              
            }}
          >
            {/* Mobile Number Section */}
            <Box sx={{ marginBottom: "20px" }}>
              <Box>
                <TextField
                  fullWidth
                  placeholder="Enter Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  disabled={isOtpSent}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: "#FAC200" }} />
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
                <Button
                  onClick={handleVerify}
                  disabled={isLoading || !mobileNumber}
                  sx={{
                    backgroundColor: isLoading ? "#ccc" : "#FAC200",
                    color: "#ffffff",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "none",
                    minWidth: "122px",
                    height: "36px",
                    marginTop: "16px",
                    marginBottom: "16px",
                    float: "right",
                    "&:hover": {
                      backgroundColor: isLoading ? "#ccc" : "#FAC200",
                    },
                  }}
                >
                  {isLoading ? 'Sending...' : 'Verify'}
                </Button>
              </Box>
            </Box>

            {/* OTP Section */}
            {isOtpSent && (
              <Box sx={{ marginBottom: "20px" }}>
                {/* <Typography
                  variant="body2"
                  sx={{
                    color: "#374151",
                    fontWeight: "500",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}
                >
                  OTP
                </Typography> */}
                <TextField
                  fullWidth
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
            )}

            {/* Next Button */}
            <Button
              fullWidth
              onClick={handleNext}
              disabled={isLoading || !isOtpSent || !otp}
              sx={{
                backgroundColor: isLoading ? "#ccc" : "#C3C3C3",
                color: "#ffffff",
                borderRadius: "20px",
                padding: "14px",
                fontSize: "18px",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: isLoading ? "#ccc" : "#4B5563",
                },
              }}
            >
              {isLoading ? 'Processing...' : 'Next'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Set PIN Popup - Outside of ForgotPinPopup Dialog */}
      <SetPinPopup
        isOpen={isSetPinOpen}
        onClose={handleSetPinClose}
        onPinSet={handleSetPinSuccess}
        mode="forgot"
      />
    </>
  );
};

export default ForgotPinPopup;
