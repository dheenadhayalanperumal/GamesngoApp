'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Button } from '@mui/material';
import { 
  ShoppingCart, 
  KeyboardArrowDown, 
  ChevronLeft,
  SportsEsports,
  LocalMovies,
  Restaurant,
  Today,
  Leaderboard,
  Home,
  Event,
  Delete,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SavedItemsPage() {
  const router = useRouter();
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      name: 'SanDisk SDCZ48-064G 6...',
      storage: '64 GB RAM',
      specs: ['USB 3.0 | 64 GB', 'Plastic Body...'],
      originalPrice: 500,
      currentPrice: 250,
      discount: '50% Off',
      image: '/images/banner/usb_drive.svg'
    },
    {
      id: 2,
      name: 'SanDisk SDCZ48-064G 6...',
      storage: '64 GB RAM',
      specs: ['USB 3.0 | 64 GB', 'Plastic Body...'],
      originalPrice: 500,
      currentPrice: 250,
      discount: '50% Off',
      image: '/images/banner/usb_drive.svg'
    },
    {
      id: 3,
      name: 'SanDisk SDCZ48-064G 6...',
      storage: '64 GB RAM',
      specs: ['USB 3.0 | 64 GB', 'Plastic Body...'],
      originalPrice: 500,
      currentPrice: 250,
      discount: '50% Off',
      image: '/images/banner/usb_drive.svg'
    }
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleRemoveItem = (itemId: number) => {
    setSavedItems(savedItems.filter(item => item.id !== itemId));
  };

  const handleBuyNow = (itemId: number) => {
    console.log('Buy now clicked for item:', itemId);
    // Navigate to saved-address page
    router.push('/saved-address');
  };

  const handleBottomNavClick = (item: string) => {
    console.log('Clicked bottom nav:', item);
    // Handle navigation based on bottom nav item
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f5f5f5',
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
          background: '#4A47E0',
          padding: { xs: '12px 16px', sm: '15px 20px', md: '15px 24px' },
          display: 'flex',
          justifyContent: 'space-between',
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

        {/* Wallet */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          color: 'white',
          gap: { xs: 0.5, sm: 1, md: 1 }
        }}>
          <Typography sx={{ 
            mr: { xs: 0.5, sm: 1, md: 1 }, 
            fontWeight: 600,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            fontFamily: 'Arial, sans-serif'
          }}>
            Wallet
          </Typography>
          <KeyboardArrowDown sx={{ 
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
          }} />
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        pt: { xs: '80px', sm: '80px', md: '90px' }, 
        pb: { xs: '50px', sm: '120px', md: '140px' },
        px: { xs: 2, sm: 3, md: 4 },
        background: '#ffffff',
        borderRadius: { xs: 2, sm: 3, md: 4 },
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        
      }}>
        {/* Page Title */}
        <Typography sx={{
          fontSize: { xs: '22px', sm: '2rem', md: '2.2rem' },
          fontWeight: 600,
          color: 'rgba(33, 23, 91, 0.50)',
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Saved Items
        </Typography>

        {/* Saved Items List */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '6px',
          padding: '12px',
          borderRadius: '10px',
          background: '#EEE'
        }}>
          {savedItems.map((item) => (
            <Card
              key={item.id}
              sx={{
                borderRadius: 3,
                background: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
              }}
            >
              <CardContent sx={{ 
                padding: '16px',
                '&:last-child': { 
                  paddingBottom: '16px' 
                }
              }}>
                {/* Product Information Section */}
                <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                  {/* Product Image */}
                  <Box
                    sx={{
                      width: { xs: 120, sm: 100, md: 120 },
                      height: { xs: 120, sm: 100, md: 120 },
                      borderRadius: '8px',
                      border: '1px dashed rgba(0, 0, 0, 0.30)',
                      background: 'rgba(217, 217, 217, 0.00)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>

                  {/* Product Details */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {/* Product Name */}
                    <Typography sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontWeight: 700,
                      color: '#333333',
                      mb: 0.5,
                      fontFamily: 'Arial, sans-serif',
                      lineHeight: 1.2
                    }}>
                      {item.name}
                    </Typography>

                    {/* Storage */}
                    <Typography sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      color: '#666666',
                      mb: 1,
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      {item.storage}
                    </Typography>

                    {/* Specifications */}
                    <Box sx={{ mb: 2 }}>
                      {item.specs.map((spec, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 0.5,
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                            color: '#AAAAAA',
                            fontFamily: 'Arial, sans-serif'
                          }}
                        >
                          <Box
                            sx={{
                              width: 4,
                              height: 4,
                              borderRadius: '50%',
                              background: '#AAAAAA',
                              mr: 1,
                              flexShrink: 0
                            }}
                          />
                          {spec}
                        </Box>
                      ))}
                    </Box>

                    {/* Pricing */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {/* Gold Coin Icon */}
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          background: '#FFD700',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Typography sx={{ 
                          fontSize: '0.6rem', 
                          fontWeight: 800, 
                          color: '#800080' 
                        }}>
                          ⚡
                        </Typography>
                      </Box>

                      {/* Original Price */}
                      <Typography sx={{ 
                        color: '#AAAAAA', 
                        textDecoration: 'line-through', 
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {item.originalPrice}
                      </Typography>

                      {/* Current Price */}
                      <Typography sx={{ 
                        fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' }, 
                        fontWeight: 700, 
                        color: '#333333',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {item.currentPrice}
                      </Typography>

                      {/* Discount */}
                      <Typography sx={{ 
                        color: '#FF0000',
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        fontWeight: 600,
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {item.discount}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Divider */}
                <Box sx={{ 
                  height: 1, 
                  background: '#e0e0e0', 
                  mb: 2 
                }} />

                {/* Action Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  {/* Remove Button */}
                  <Button
                    onClick={() => handleRemoveItem(item.id)}
                    startIcon={<Delete sx={{ fontSize: '1.2rem' }} />}
                    sx={{
                      color: '#4A47E0',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      textTransform: 'none',
                      fontFamily: 'Arial, sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(74, 71, 224, 0.1)'
                      }
                    }}
                  >
                    Remove
                  </Button>

                  {/* Buy Now Button */}
                  <Button
                    onClick={() => handleBuyNow(item.id)}
                    startIcon={<CartIcon sx={{ fontSize: '1.2rem' }} />}
                    sx={{
                      color: '#4A47E0',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      textTransform: 'none',
                      fontFamily: 'Arial, sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(74, 71, 224, 0.1)'
                      }
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Custom Bottom Navigation */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: '#f5f5f5',
          borderRadius: { xs: '16px 16px 0 0', sm: '20px 20px 0 0', md: '24px 24px 0 0' },
          boxShadow: { 
            xs: '0 -2px 16px rgba(0, 0, 0, 0.1)', 
            sm: '0 -4px 20px rgba(0, 0, 0, 0.1)', 
            md: '0 -6px 24px rgba(0, 0, 0, 0.1)' 
          },
          padding: { xs: '8px 0', sm: '10px 0', md: '12px 0' }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {[
            { label: 'Games', icon: <SportsEsports />, active: false },
            { label: 'Leader', icon: <Leaderboard />, active: false },
            { label: 'Home', icon: <Home />, active: false },
            { label: 'Redeem', icon: <ShoppingCart />, active: true },
            { label: 'Events', icon: <Event />, active: false }
          ].map((item) => (
            <Box
              key={item.label}
              onClick={() => handleBottomNavClick(item.label)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                py: { xs: 0.5, sm: 1, md: 1.25 },
                px: { xs: 0.5, sm: 1, md: 1.5 },
                borderRadius: { xs: 1, sm: 1.5, md: 2 },
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(74, 71, 224, 0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <Box
                sx={{
                  width: { xs: 40, sm: 44, md: 48 },
                  height: { xs: 40, sm: 44, md: 48 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: item.active ? '#4A47E0' : 'transparent',
                  color: item.active ? 'white' : '#4A47E0',
                  mb: { xs: 0.25, sm: 0.5, md: 0.5 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: item.active ? '#3A37D0' : 'rgba(74, 71, 224, 0.1)',
                    color: item.active ? 'white' : '#4A47E0'
                  }
                }}
              >
                {React.cloneElement(item.icon, {
                  sx: { 
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
                  }
                })}
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                  color: '#333333',
                  fontWeight: 600,
                  textAlign: 'center',
                  transition: 'color 0.3s ease',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
