'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, TextField, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import HeaderWithBack from '@/components/HeaderWithBack';

export default function AddAddressPage() {
  const router = useRouter();
  const [addressType, setAddressType] = useState('Home');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    alternateMobile: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    city: '',
    pinCode: '',
    landmark: ''
  });


  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleAddAddress = async () => {
    // Validate required fields
    if (!formData.addressLine1) {
      setValidationErrors({ address_line1: 'Address Line 1 is required' });
      return;
    }

    setIsLoading(true);
    setError(null);
    setValidationErrors({});

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      
      // Add fields to FormData (convert to snake_case for API)
      if (formData.fullName) {
        formDataToSend.append('name', formData.fullName);
      }
      if (formData.mobile) {
        formDataToSend.append('phone', formData.mobile);
      }
      formDataToSend.append('address_line1', formData.addressLine1);
      if (formData.addressLine2) {
        formDataToSend.append('address_line2', formData.addressLine2);
      }
      if (formData.city) {
        formDataToSend.append('city', formData.city);
      }
      if (formData.state) {
        formDataToSend.append('state', formData.state);
      }
      if (formData.pinCode) {
        formDataToSend.append('pincode', formData.pinCode);
      }
      if (formData.landmark) {
        formDataToSend.append('landmark', formData.landmark);
      }
      // Set is_default based on address type
      formDataToSend.append('is_default', addressType === 'Home' ? '1' : '0');

      console.log('Sending address data:', {
        name: formData.fullName,
        phone: formData.mobile,
        address_line1: formData.addressLine1,
        address_line2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        pincode: formData.pinCode,
        landmark: formData.landmark,
        is_default: addressType === 'Home'
      });

      const response = await fetch('/api/address', {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend
      });

      const data = await response.json();
      console.log('Address API Response:', data);

      if (response.ok && data.status === 'success') {
        console.log('Address created successfully:', data.address);
        // Navigate back to saved addresses page
        router.push('/saved-address');
      } else {
        if (response.status === 401) {
          setError('Please login to add an address');
        } else if (response.status === 422 && data.errors) {
          // Handle validation errors
          setValidationErrors(data.errors);
          setError(data.message || 'Validation failed');
        } else {
          setError(data.message || 'Failed to add address. Please try again.');
        }
      }
    } catch (err) {
      console.error('Error adding address:', err);
      setError('Failed to add address. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          zIndex: 1100
        }}
      >
        <HeaderWithBack 
          title="Back" 
          backgroundColor="#3F51B5"
        />
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        pt: { xs: '64px', sm: '64px', md: '64px' }, 
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
                  Full Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Your Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                  error={!!validationErrors.name}
                  helperText={validationErrors.name}
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
                  Mobile
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Your Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange('mobile')}
                  error={!!validationErrors.phone}
                  helperText={validationErrors.phone}
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

              {/* Alternate Mobile - Optional, not sent to API */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: 'rgba(33, 23, 91, 0.90)',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Alternate Mobile
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Your Alternate Mobile Number (optional)"
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
                  error={!!validationErrors.address_line1}
                  helperText={validationErrors.address_line1}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: validationErrors.address_line1 ? '#d32f2f' : '#E0E0E0'
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
                  Address Line 2
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Street Name, Area"
                  value={formData.addressLine2}
                  onChange={handleInputChange('addressLine2')}
                  error={!!validationErrors.address_line2}
                  helperText={validationErrors.address_line2}
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
                    State
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange('state')}
                    error={!!validationErrors.state}
                    helperText={validationErrors.state}
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
                    City
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange('city')}
                    error={!!validationErrors.city}
                    helperText={validationErrors.city}
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
                  error={!!validationErrors.pincode}
                  helperText={validationErrors.pincode}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: validationErrors.pincode ? '#d32f2f' : '#E0E0E0'
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

              {/* Landmark */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: 'rgba(33, 23, 91, 0.90)',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Landmark
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Nearby reference (optional)"
                  value={formData.landmark}
                  onChange={handleInputChange('landmark')}
                  error={!!validationErrors.landmark}
                  helperText={validationErrors.landmark}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: validationErrors.landmark ? '#d32f2f' : '#E0E0E0'
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

            {/* Error Message */}
            {error && (
              <Box sx={{ mt: 3 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              </Box>
            )}

            {/* Validation Errors */}
            {Object.keys(validationErrors).length > 0 && (
              <Box sx={{ mt: 2 }}>
                {Object.entries(validationErrors).map(([field, message]) => (
                  <Alert key={field} severity="error" sx={{ mb: 1 }}>
                    {message}
                  </Alert>
                ))}
              </Box>
            )}

            {/* Add Address Button */}
            <Box sx={{ mt: 4 }}>
              <Button
                onClick={handleAddAddress}
                disabled={isLoading}
                fullWidth
                sx={{
                  background: isLoading ? '#ccc' : '#FFD700',
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
                    background: isLoading ? '#ccc' : '#FFA500',
                    transform: isLoading ? 'none' : 'translateY(-2px)',
                    boxShadow: isLoading ? '0 4px 16px #FAC200' : '0 6px 20px rgba(255, 215, 0, 0.6)'
                  },
                  '&:disabled': {
                    background: '#ccc',
                    color: 'white'
                  }
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                    Adding Address...
                  </Box>
                ) : (
                  'Add Address'
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
