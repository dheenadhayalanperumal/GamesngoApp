"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  // Divider,
} from '@mui/material';
import {
  ArrowBack,
  CameraAlt,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TabBar from "@/components/TabBar";

export default function EditProfile() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    phone: '',
  });
  const [userImage, setUserImage] = useState('');
  const [joinedAt, setJoinedAt] = useState('');

  useEffect(() => {
    // Load user data from localStorage
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('editProfileData');
      if (savedData) {
        try {
          const userData = JSON.parse(savedData);
          setFormData({
            userId: userData.name || '',
            email: '', // Will be fetched from API in future
            phone: '', // Will be fetched from API in future
          });
          setUserImage(userData.imageUrl || '');
          setJoinedAt(userData.joinedAt || '');
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile data:', formData);
    router.back();
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
      {/* Blue Header Section */}
      <Box sx={{ 
        backgroundColor: '#4848DB',
        padding: '20px 20px 40px 20px',
        color: 'white',
        position: 'relative',
      }}>
        {/* Top Bar with Back */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => router.back()}>
            <ArrowBack sx={{ color: 'white', fontSize: 20 }} />
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
              Back
            </Typography>
          </Box>
        </Box>

        {/* Profile Avatar with Camera Icon */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2, position: 'relative' }}>
          <Avatar
            src={userImage || undefined}
            sx={{
              width: '120px',
              height: '120px',
              backgroundColor: 'white',
              border: '4px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}
          >
            {!userImage && (
              <Image 
                src="/logoblue.svg" 
                alt="Profile" 
                width={80} 
                height={80}
                style={{ objectFit: 'contain' }}
              />
            )}
          </Avatar>
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 'calc(50% - 60px)',
              backgroundColor: '#FAC200',
              color: 'white',
              width: 40,
              height: 40,
              '&:hover': {
                backgroundColor: '#e6b000',
              }
            }}
          >
            <CameraAlt sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

      </Box>

      {/* Form Section */}
      <Box sx={{ padding: '20px', marginTop: '-20px' }}>
        <Card sx={{ 
          borderRadius: 3, 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: 3
        }}>
          <CardContent sx={{ pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* User ID Field */}
              <Box>
                <Typography variant="body2" sx={{ 
                  color: '#333',
                  fontFamily: 'Rubik',
                  fontSize: '16px',
                  fontWeight: 500,
                  marginBottom: 1
                }}>
                  User ID
                </Typography>
                <TextField
                  fullWidth
                  value={formData.userId}
                  onChange={(e) => handleInputChange('userId', e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '25px',
                      backgroundColor: 'rgba(255, 255, 255, 0.10)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.20)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.20)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.20)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontFamily: 'Rubik',
                      fontSize: '16px',
                      color: '#333',
                    }
                  }}
                />
              </Box>

              {/* Email Field */}
              <Box>
                <Typography variant="body2" sx={{ 
                  color: '#333',
                  fontFamily: 'Rubik',
                  fontSize: '16px',
                  fontWeight: 500,
                  marginBottom: 1
                }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '25px',
                      backgroundColor: 'rgba(255, 255, 255, 0.10)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.20)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.20)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.20)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontFamily: 'Rubik',
                      fontSize: '16px',
                      color: '#333',
                    }
                  }}
                />
              </Box>

              {/* Mobile Number Field */}
              <Box>
                <Typography variant="body2" sx={{ 
                  color: '#333',
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
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '25px',
                      backgroundColor: 'rgba(255, 255, 255, 0.10)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.20)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.20)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.20)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontFamily: 'Rubik',
                      fontSize: '16px',
                      color: '#333',
                    }
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Save Changes Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: '#FAC200',
            color: 'white',
            fontWeight: 600,
            borderRadius: '25px',
            py: 2,
            fontSize: '16px',
            fontFamily: 'Rubik',
            '&:hover': {
              backgroundColor: '#e6b000',
            }
          }}
        >
          Save Changes (100 Coins)
        </Button>
      </Box>

      {/* Tab Bar */}
      <TabBar />
    </div>
  );
}
