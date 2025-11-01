'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Button, TextField } from '@mui/material';
import { 
  ChevronLeft
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function OrderSupportPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailId: '',
    message: ''
  });

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Submit support request with data:', formData);
    // Handle submit logic
    router.back();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#F5F5F5',
        position: 'relative'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          background: '#3F51B5',
          padding: { xs: '12px 16px', sm: '15px 20px', md: '15px 24px' },
          display: 'flex',
          alignItems: 'center',
          minHeight: { xs: '60px', sm: '70px', md: '80px' }
        }}
      >
        {/* Back Button */}
        <Box 
          onClick={handleBack}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: 'white',
            cursor: 'pointer',
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          <IconButton 
            sx={{ 
              color: 'white',
              padding: { xs: 0.5, sm: 1, md: 1 },
              mr: 1
            }}
          >
            <ChevronLeft sx={{ 
              fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
            }} />
          </IconButton>
          <Typography sx={{ 
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
            fontWeight: 600,
            fontFamily: 'Arial, sans-serif'
          }}>
            Back
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        pt: { xs: '70px', sm: '80px', md: '90px' }, 
        pb: { xs: '20px', sm: '30px', md: '40px' },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        {/* Order Support Form Card */}
        <Card
          sx={{
            borderRadius: 3,
            background: 'white',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            {/* Title */}
            <Typography sx={{
              color: '#21175B',
              fontFamily: 'Rubik',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '25px',
              mb: 2
            }}>
              Order Support
            </Typography>

            {/* Description */}
            <Typography sx={{
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              color: '#616161',
              mb: 4,
              fontFamily: 'Arial, sans-serif',
              lineHeight: 1.5
            }}>
              Reach out to us and our team will assist you as soon as posible.
            </Typography>

            {/* Form Fields */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Full Name */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 700,
                  color: '#212121',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Full Name<span style={{ color: '#F44336' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#E0E0E0'
                      },
                      '&:hover fieldset': {
                        borderColor: '#3F51B5'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3F51B5'
                      }
                    },
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontFamily: 'Arial, sans-serif',
                      color: '#333333'
                    }
                  }}
                />
              </Box>

              {/* Mobile Number */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 700,
                  color: '#212121',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Mobile Number<span style={{ color: '#F44336' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  value={formData.mobileNumber}
                  onChange={handleInputChange('mobileNumber')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#E0E0E0'
                      },
                      '&:hover fieldset': {
                        borderColor: '#3F51B5'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3F51B5'
                      }
                    },
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontFamily: 'Arial, sans-serif',
                      color: '#333333'
                    }
                  }}
                />
              </Box>

              {/* Email ID */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 700,
                  color: '#212121',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Email ID<span style={{ color: '#F44336' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  value={formData.emailId}
                  onChange={handleInputChange('emailId')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#E0E0E0'
                      },
                      '&:hover fieldset': {
                        borderColor: '#3F51B5'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3F51B5'
                      }
                    },
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontFamily: 'Arial, sans-serif',
                      color: '#333333'
                    }
                  }}
                />
              </Box>

              {/* Message */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 700,
                  color: '#212121',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Message<span style={{ color: '#F44336' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#E0E0E0'
                      },
                      '&:hover fieldset': {
                        borderColor: '#3F51B5'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3F51B5'
                      }
                    },
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontFamily: 'Arial, sans-serif',
                      color: '#333333'
                    }
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Box sx={{ mt: 3 }}>
          <Button
            onClick={handleSubmit}
            fullWidth
            sx={{
              background: '#FFD700',
              color: 'white',
              borderRadius: 3,
              py: 2,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
              fontWeight: 700,
              textTransform: 'none',
              fontFamily: 'Arial, sans-serif',
              boxShadow: '0 4px 16px rgba(255, 215, 0, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: '#FFA500',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(255, 215, 0, 0.6)'
              }
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
