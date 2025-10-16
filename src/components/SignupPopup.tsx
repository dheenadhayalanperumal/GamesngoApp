'use client';

import React, { useState } from 'react';
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
  Link
} from '@mui/material';
import { Close, Person, Email, Phone, Google, Lock } from '@mui/icons-material';
import Image from 'next/image';

interface SignupPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: () => void;
}

const SignupPopup: React.FC<SignupPopupProps> = ({
  isOpen,
  onClose,
  onSignup
}) => {
  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleSignup = () => {
    // Here you would typically validate the credentials
    // For now, we'll just call the onSignup callback
    onSignup();
    onClose();
  };

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
    console.log('Google signup clicked');
    onSignup();
    onClose();
  };

  const handleVerify = () => {
    // Validate email and phone number
    if (email && mobileNumber && userID) {
      // Simulate validation
      console.log('Validating email and phone number...');
      setIsVerified(true);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,249,250,0.7) 100%)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', marginBottom: '18px' }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#666'
            }}
          >
            <Close />
          </IconButton>
          
          <Box sx={{ marginBottom: '8px' }}>
            <Image
              src="/logoblue.svg"
              alt="GAMES N GO"
              width={168}
              height={42}
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: '#1a1a1a',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            PLAY 'N' SMILE
          </Typography>
        </Box>

        {/* Signup Form */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,249,250,0.7) 100%)',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '20 20px 40px rgba(0, 0, 0, 0.55)',
        }}>
          <Box sx={{ marginBottom: '24px' }}>
            {/* User ID Field */}
            <TextField
              fullWidth
              placeholder="Set User ID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#FAC200' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                marginBottom: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  backgroundColor: '#FFF',
                  border: '1px solid rgba(0, 0, 0, 0.20)',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused': {
                    border: '1px solid #FAC200',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                },
              }}
            />

            {/* Email Field */}
            <TextField
              fullWidth
              placeholder="Enter Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#FAC200' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                marginBottom: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  backgroundColor: '#FFF',
                  border: '1px solid rgba(0, 0, 0, 0.20)',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused': {
                    border: '1px solid #FAC200',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                },
              }}
            />

            {/* Mobile Number Field with Verify Button */}
            <Box sx={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: '#FAC200' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    backgroundColor: '#FFF',
                    border: '1px solid rgba(0, 0, 0, 0.20)',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused': {
                      border: '1px solid #FAC200',
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleVerify}
                sx={{
                  backgroundColor: '#FAC200',
                  color: '#ffffff',
                  borderRadius: '20px',
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  minWidth: '80px',
                  height: '56px',
                  '&:hover': {
                    backgroundColor: '#FFA500',
                  },
                }}
              >
                Verify
              </Button>
            </Box>
          </Box>

          {/* OTP Section - Only show after verification */}
          {isVerified && (
            <Box sx={{ marginBottom: '24px' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '8px'
                }}
              >
                OTP
              </Typography>
              <TextField
                fullWidth
                type="password"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#FAC200' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    backgroundColor: '#FFF',
                    border: '1px solid rgba(0, 0, 0, 0.20)',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused': {
                      border: '1px solid #FAC200',
                      '& fieldset': {
                        border: 'none',
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
            onClick={handleSignup}
            sx={{
              backgroundColor: isVerified ? '#FAC200' : '#e0e0e0',
              color: isVerified ? '#ffffff' : '#666666',
              borderRadius: '20px',
              padding: '14px',
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: isVerified ? '#FFA500' : '#d0d0d0',
              },
            }}
          >
            Next
          </Button>

          {/* Only show Google button and terms when not verified */}
          {!isVerified && (
            <>
              {/* Divider */}
              <Divider sx={{ margin: '20px 0' }} />

              {/* Continue With Google Button */}
              <Button
                fullWidth
                variant="outlined"
                onClick={handleGoogleSignup}
                startIcon={<Google sx={{ color: '#4285F4' }} />}
                sx={{
                  border: '1px solid rgba(0, 0, 0, 0.20)',
                  color: '#000000',
                  fontFamily: 'Rubik',
                  fontStyle: 'normal',
                  borderRadius: '20px',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '500',
                  textTransform: 'none',
                  backgroundColor: '#FFF',
                  marginBottom: '20px',
                  '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.20)',
                    backgroundColor: '#fafafa',
                  },
                }}
              >
                Continue With Google
              </Button>

              {/* Have a Referral Link */}
              <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                <Link
                  href="#"
                  sx={{
                    color: '#4285F4',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Have a Referral ?
                </Link>
              </Box>

              {/* Terms and Conditions */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: '12px',
                    lineHeight: '1.4'
                  }}
                >
                  By clicking next you are agree our{' '}
                  <Link
                    href="#"
                    sx={{
                      color: '#4285F4',
                      textDecoration: 'none',
                      fontSize: '12px',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Terms & Conditions
                  </Link>
                  {' '}and{' '}
                  <Link
                    href="#"
                    sx={{
                      color: '#4285F4',
                      textDecoration: 'none',
                      fontSize: '12px',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignupPopup;
