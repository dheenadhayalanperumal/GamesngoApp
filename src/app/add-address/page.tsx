'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Button, TextField } from '@mui/material';
import { 
  ChevronLeft
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function AddAddressPage() {
  const router = useRouter();
  const [addressType, setAddressType] = useState('Home');
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    alternateMobile: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    city: '',
    pinCode: ''
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

  const handleAddAddress = () => {
    console.log('Add address with data:', { addressType, ...formData });
    // Handle add address logic
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
          justifyContent: 'space-between',
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
        {/* Page Title */}
        <Typography sx={{
          color: 'rgba(33, 23, 91, 0.50)',
          fontFamily: 'Rubik',
          fontSize: '22px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '25px',
          textAlign: 'center',
          mb: 3
        }}>
          New Address
        </Typography>
        {/* Address Form Card */}
        <Card
          sx={{
            borderRadius: 4,
            background: 'white',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            {/* Address Type Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                fontWeight: 600,
                color: 'rgba(33, 23, 91, 0.90)',
                mb: 2,
                fontFamily: 'Arial, sans-serif'
              }}>
                Where we have to delivery your Orders ?
              </Typography>
              
              <Box sx={{ display: 'flex', gap: '12px' }}>
                <Button
                  onClick={() => setAddressType('Home')}
                  sx={{
                    background: addressType === 'Home' ? '#3F51B5' : 'white',
                    color: addressType === 'Home' ? 'white' : '#333333',
                    border: addressType === 'Home' ? '2px solid #3F51B5' : '1px solid #333333',
                    borderRadius: 3,
                    px: 3,
                    py: 1.5,
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    fontWeight: 600,
                    textTransform: 'none',
                    fontFamily: 'Arial, sans-serif',
                    flex: 1,
                    height: '36px',
                    '&:hover': {
                      background: addressType === 'Home' ? '#2A2A9E' : 'rgba(63, 81, 181, 0.1)'
                    }
                  }}
                >
                  Home
                </Button>
                <Button
                  onClick={() => setAddressType('Work')}
                  sx={{
                    background: addressType === 'Work' ? '#3F51B5' : 'white',
                    color: addressType === 'Work' ? 'white' : '#333333',
                    border: addressType === 'Work' ? '2px solid #3F51B5' : '1px solid #333333',
                    borderRadius: 3,
                    px: 3,
                    py: 1.5,
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    fontWeight: 600,
                    textTransform: 'none',
                    fontFamily: 'Arial, sans-serif',
                    flex: 1,
                    height: '36px',
                    '&:hover': {
                      background: addressType === 'Work' ? '#2A2A9E' : 'rgba(63, 81, 181, 0.1)'
                    }
                  }}
                >
                  Work
                </Button>
              </Box>
            </Box>

            {/* Form Fields */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Full Name */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: 'rgba(33, 23, 91, 0.90)',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Full Name<span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Your Full Name"
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
                      color: 'rgba(33, 23, 91, 0.90)',
                      height: '1em'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#AAAAAA',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                    }
                  }}
                />
              </Box>

              {/* Mobile */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: 'rgba(33, 23, 91, 0.90)',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Mobile<span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Your Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange('mobile')}
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
                      color: 'rgba(33, 23, 91, 0.90)',
                      height: '1em'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#AAAAAA',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                    }
                  }}
                />
              </Box>

              {/* Alternate Mobile */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: 'rgba(33, 23, 91, 0.90)',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Alternate Mobile<span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Your Alternate Mobile Number"
                  value={formData.alternateMobile}
                  onChange={handleInputChange('alternateMobile')}
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
                      color: 'rgba(33, 23, 91, 0.90)',
                      height: '1em'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#AAAAAA',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                    }
                  }}
                />
              </Box>

              {/* Address Line 1 */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: 'rgba(33, 23, 91, 0.90)',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Address Line 1<span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="House Number,Building"
                  value={formData.addressLine1}
                  onChange={handleInputChange('addressLine1')}
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
                      color: 'rgba(33, 23, 91, 0.90)',
                      height: '1em'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#AAAAAA',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                    }
                  }}
                />
              </Box>

              {/* Address Line 2 */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: 'rgba(33, 23, 91, 0.90)',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Address Line 2<span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Street Name, Area"
                  value={formData.addressLine2}
                  onChange={handleInputChange('addressLine2')}
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
                      color: 'rgba(33, 23, 91, 0.90)',
                      height: '1em'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#AAAAAA',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                    }
                  }}
                />
              </Box>

              {/* State and City */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    fontWeight: 600,
                    color: 'rgba(33, 23, 91, 0.90)',
                    mb: 1,
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    State<span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange('state')}
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
                        color: 'rgba(33, 23, 91, 0.90)',
                        height: '1em'
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#AAAAAA',
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                      }
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    fontWeight: 600,
                    color: 'rgba(33, 23, 91, 0.90)',
                    mb: 1,
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    City<span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange('city')}
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
                        color: 'rgba(33, 23, 91, 0.90)',
                        height: '1em'
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#AAAAAA',
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                      }
                    }}
                  />
                </Box>
              </Box>

              {/* Pin Code */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: 'rgba(33, 23, 91, 0.90)',
                  mb: 1,
                 
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Pin Code<span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Pin Code"
                  value={formData.pinCode}
                  onChange={handleInputChange('pinCode')}
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
                      color: 'rgba(33, 23, 91, 0.90)',
                      height: '1em'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#AAAAAA',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Add Address Button */}
            <Box sx={{ mt: 4 }}>
              <Button
                onClick={handleAddAddress}
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
                  boxShadow: '0 4px 16px #FAC200',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: '#FFA500',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(255, 215, 0, 0.6)'
                  }
                }}
              >
                Add Address
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
