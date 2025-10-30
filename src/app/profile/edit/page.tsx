"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  Lock,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TabBar from "@/components/TabBar";

export default function EditProfile() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    userName: 'Dhanush',
    email: 'dhanush123@gmail.com',
    otp: '',
    phone: '+91 12345 67890',
  });
  
  const [showOtpField, setShowOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVerify = () => {
    // Show OTP field when verify button is clicked
    setShowOtpField(true);
    setOtpError('');
    console.log('Verification code sent to:', formData.email);
  };

  const handleOtpChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      otp: value
    }));
    setOtpError('');
    
    // Activate save button when 4 digits are entered
    if (value.length === 4) {
      setIsOtpVerified(true);
      console.log('OTP entered, save button activated');
    } else {
      setIsOtpVerified(false);
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile data:', formData);
    router.back();
  };

  return (
    <div className="content-container" style={{ backgroundColor: 'white', minHeight: '110vh', padding: 0, margin: '-15px' }}>
      {/* Blue Header Section */}
      <Box sx={{ 
        backgroundColor: '#3C3CD2',
        padding: '35px 20px 60px 20px',
        color: 'white',
        position: 'relative',
        borderRadius: '0px 0px 20px 20px',
      }}>
        {/* Top Bar with Back */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => router.back()}>
            <ArrowBack sx={{ color: 'white', fontSize: 20 }} />
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
              Back
            </Typography>
          </Box>
        </Box>

        {/* Profile Avatar with Plus Icon */}
        <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <Avatar
            sx={{
              width: '100px',
              height: '100px',
              backgroundColor: 'white',
              border: 'none',
            }}
          >
            <Image 
              src="/logoblue.svg" 
              alt="Profile" 
              width={60} 
              height={60}
              style={{ objectFit: 'contain' }}
            />
          </Avatar>
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 'calc(50% - 50px)',
              backgroundColor: '#FAC200',
              color: 'white',
              width: 32,
              height: 32,
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: '#e6b000',
              }
            }}
          >
            <Add sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Form Section */}
      <Box sx={{ padding: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* User Name Field */}
          <Box>
            <Typography variant="body2" sx={{ 
              color: '#21175B',
              fontFamily: 'Rubik',
              fontSize: '16px',
              fontWeight: 500,
              marginBottom: 1
            }}>
              User Name
            </Typography>
            <TextField
              fullWidth
              value={formData.userName}
              onChange={(e) => handleInputChange('userName', e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#E0E0E0',
                  },
                },
                '& .MuiInputBase-input': {
                  fontFamily: 'Rubik',
                  fontSize: '16px',
                  color: '#333',
                  padding: '12px 16px',
                }
              }}
            />
          </Box>

          {/* Email Field with Verify Button */}
          <Box>
            <Typography variant="body2" sx={{ 
              color: '#21175B',
              fontFamily: 'Rubik',
              fontSize: '16px',
              fontWeight: 500,
              marginBottom: 1
            }}>
              Email Address
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#E0E0E0',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: 'Rubik',
                    fontSize: '16px',
                    color: '#333',
                    padding: '12px 16px',
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleVerify}
                sx={{
                  backgroundColor: '#FAC200',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '12px',
                  px: 3,
                  py: 1.5,
                  fontSize: '14px',
                  fontFamily: 'Rubik',
                  minWidth: '80px',
                  height: '48px',
                  '&:hover': {
                    backgroundColor: '#e6b000',
                  }
                }}
              >
                Verify
              </Button>
            </Box>
            <Typography variant="caption" sx={{ 
              color: '#999',
              fontFamily: 'Rubik',
              fontSize: '12px',
              marginTop: 0.5,
              display: 'block'
            }}>
              we will send verification code on your email Id
            </Typography>
          </Box>

          {/* OTP Field - Only show after verify button is clicked */}
          {showOtpField && (
            <Box>
              <Typography variant="body2" sx={{ 
                color: '#21175B',
                fontFamily: 'Rubik',
                fontSize: '16px',
                fontWeight: 500,
                marginBottom: 1
              }}>
                OTP
              </Typography>
              <TextField
                fullWidth
                type="password"
                value={formData.otp}
                onChange={(e) => handleOtpChange(e.target.value)}
                variant="outlined"
                placeholder="* * * *"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: isOtpVerified ? '#4CAF50' : '#FAC200', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: isOtpVerified ? '#F8FFF8' : 'white',
                    '& fieldset': {
                      borderColor: isOtpVerified ? '#4CAF50' : '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: isOtpVerified ? '#4CAF50' : '#E0E0E0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isOtpVerified ? '#4CAF50' : '#E0E0E0',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: 'Rubik',
                    fontSize: '16px',
                    color: '#333',
                    padding: '12px 16px',
                    letterSpacing: '0.2em',
                  }
                }}
              />
            </Box>
          )}

          {/* Mobile Number Field - Non-editable */}
          <Box>
            <Typography variant="body2" sx={{ 
              color: '#666',
              fontFamily: 'Rubik',
              fontSize: '16px',
              fontWeight: 500,
              marginBottom: 1
            }}>
              Mobile Number
            </Typography>
            <TextField
              fullWidth
              type="tel"
              value={formData.phone}
              variant="outlined"
              disabled
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#F5F5F5',
                  '& fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&.Mui-disabled fieldset': {
                    borderColor: '#E0E0E0',
                  },
                },
                '& .MuiInputBase-input': {
                  fontFamily: 'Rubik',
                  fontSize: '16px',
                  color: '#666',
                  padding: '12px 16px',
                }
              }}
            />
          </Box>
        </Box>

        {/* Save Changes Button */}
        <Box sx={{ padding: '20px 0' }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSave}
            disabled={!isOtpVerified}
            sx={{
              backgroundColor: isOtpVerified ? '#FAC200' : '#CCCCCC',
              color: 'white',
              fontWeight: 600,
              borderRadius: '25px',
              py: 2,
              fontSize: '16px',
              fontFamily: 'Rubik',
              textTransform: 'none',
              boxShadow: isOtpVerified ? '0 4px 12px rgba(250, 194, 0, 0.3)' : 'none',
              cursor: isOtpVerified ? 'pointer' : 'not-allowed',
              '&:hover': {
                backgroundColor: isOtpVerified ? '#e6b000' : '#CCCCCC',
                boxShadow: isOtpVerified ? '0 6px 16px rgba(250, 194, 0, 0.4)' : 'none',
              },
              '&:active': {
                transform: isOtpVerified ? 'translateY(1px)' : 'none',
              },
              '&.Mui-disabled': {
                backgroundColor: '#CCCCCC',
                color: '#999999',
              }
            }}
          >
            {isOtpVerified ? 'Save Changes (100 Coins)' : 'Save Changes (100 Coins)'}
          </Button>
        </Box>
      </Box>

      {/* Tab Bar */}
      <TabBar />
    </div>
  );
}