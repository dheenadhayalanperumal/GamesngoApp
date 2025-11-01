'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Button, Chip } from '@mui/material';
import { 
  ChevronLeft,
  Add,
  Home,
  Edit,
  Remove
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function SavedAddressPage() {
  const router = useRouter();
  const [addresses] = useState([
    {
      id: 1,
      name: 'Dhanush',
      address: 'No 6 KVR Villa Wipro Street Old Mahabalipuram Road Sholinganallur Chennai 600100',
      mobile: '1234567890 , 0987654321',
      type: 'Home'
    }
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleAddAddress = () => {
    router.push('/add-address');
  };

  const handleEditAddress = (addressId: number) => {
    console.log('Edit address clicked:', addressId);
    // Handle edit address logic
  };

  const handleAddressClick = (addressId: number) => {
    // Navigate to items view page
    router.push('/items-view');
  };

  const handleRemoveAddress = (addressId: number) => {
    console.log('Remove address clicked:', addressId);
    // Handle remove address logic
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
        {/* Add Address Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mb: 4,
          cursor: 'pointer',
          transition: 'opacity 0.3s ease',
          '&:hover': {
            opacity: 0.8
          }
        }}
        onClick={handleAddAddress}
        >
          <Home sx={{ 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            color: '#3F51B5',
            mr: 2
          }} />
          <Typography sx={{
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
            fontWeight: 700,
            color: '#3F51B5',
            fontFamily: 'Arial, sans-serif'
          }}>
            Add Address
          </Typography>
        </Box>

        {/* Saved Addresses */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {addresses.map((address) => (
            <Card
              key={address.id}
              onClick={() => handleAddressClick(address.id)}
              sx={{
                borderRadius: 3,
                background: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Home Tag */}
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={address.type}
                    sx={{
                      background: '#E0E0E0',
                      color: '#333333',
                      fontWeight: 600,
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                      fontFamily: 'Arial, sans-serif',
                      height: { xs: 28, sm: 32, md: 36 },
                      '& .MuiChip-label': {
                        px: 2
                      }
                    }}
                  />
                </Box>

                {/* Name */}
                <Typography sx={{
                  fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                  fontWeight: 700,
                  color: '#333333',
                  mb: 1.5,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {address.name}
                </Typography>

                {/* Address */}
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#333333',
                  mb: 1.5,
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.5
                }}>
                  {address.address}
                </Typography>

                {/* Mobile Number */}
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#333333',
                  mb: 2,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Mobile : {address.mobile}
                </Typography>

                {/* Divider */}
                <Box sx={{ 
                  height: 1, 
                  background: 'repeating-linear-gradient(to right, #E0E0E0 0px, #E0E0E0 4px, transparent 4px, transparent 8px)',
                  mb: 2 
                }} />
                

                {/* Action Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center'
                }}>
                  {/* Edit Button */}
                  <Button
                    onClick={() => handleEditAddress(address.id)}
                   
                    sx={{
                      color: '#3F51B5',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 700,
                      textTransform: 'none',
                      fontFamily: 'Arial, sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(63, 81, 181, 0.1)'
                      }
                    }}
                  >
                    + Edit
                  </Button>

                  {/* Vertical Divider */}
                 
                  {/* Remove Button */}
                  <Button
                    onClick={() => handleRemoveAddress(address.id)}
                   
                    sx={{
                      color: '#3F51B5',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 700,
                      textTransform: 'none',
                      fontFamily: 'Arial, sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(63, 81, 181, 0.1)'
                      }
                    }}
                  >
                    - Remove
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
