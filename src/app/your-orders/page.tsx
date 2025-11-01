'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Button, Fab } from '@mui/material';
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
  CheckCircle,
  RadioButtonUnchecked
} from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function YourOrdersPage() {
  const router = useRouter();
  const [orders] = useState([
    {
      id: 1,
      name: 'SanDisk SDCZ48-064G 6...',
      storage: '64 GB RAM',
      specs: ['USB 3.0 | 64 GB', 'Plastic Body...'],
      status: 'In Progress',
      statusColor: '#4CAF50',
      deliveryDate: 'Expected Delivery by 12 Sep 25',
      image: '/images/banner/usb_drive.svg'
    },
    {
      id: 2,
      name: 'SanDisk SDCZ48-064G 6...',
      storage: '64 GB RAM',
      specs: ['USB 3.0 | 64 GB', 'Plastic Body...'],
      status: 'Delivered',
      statusColor: '#3C3CD2',
      deliveryDate: 'Delivered by 12 Sep 25',
      image: '/images/banner/usb_drive.svg'
    },
    {
      id: 3,
      name: 'SanDisk SDCZ48-064G 6...',
      storage: '64 GB RAM',
      specs: ['USB 3.0 | 64 GB', 'Plastic Body...'],
      status: 'Delivered',
      statusColor: '#3C3CD2',
      deliveryDate: 'Delivered by 12 Sep 25',
      image: '/images/banner/usb_drive.svg'
    }
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleViewDetails = (orderId: number) => {
    router.push(`/order-details/${orderId}`);
  };

  const handleBottomNavClick = (item: string) => {
    console.log('Clicked bottom nav:', item);
    // Handle navigation based on bottom nav item
  };

  const handleFabClick = () => {
    router.push('/redeem');
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
          background: '#3C3CD2',
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
        pt: { xs: '70px', sm: '80px', md: '90px' }, 
        pb: { xs: '100px', sm: '120px', md: '140px' },
        px: { xs: 2, sm: 3, md: 4 },
        background: '#ffffff',
        borderRadius: { xs: 2, sm: 3, md: 4 },
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
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
          marginBottom: '20px'
        }}>
          Your Orders
        </Typography>

        {/* Orders List */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '6px',
          padding: '12px',
          borderRadius: '10px',
          background: '#EEE'
        }}>
          {orders.map((order) => (
            <Card
              key={order.id}
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
                      width: { xs: 100, sm: 100, md: 120 },
                      height: { xs: 100, sm: 100, md: 120 },
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
                      src={order.image}
                      alt={order.name}
                      width={100}
                      height={100}
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
                      {order.name}
                    </Typography>

                    {/* Storage */}
                    <Typography sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      color: '#666666',
                      mb: 1,
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      {order.storage}
                    </Typography>

                    {/* Specifications */}
                    <Box sx={{ mb: 2 }}>
                      {order.specs.map((spec, index) => (
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

                    {/* Order Status */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      {order.status === 'In Progress' ? (
                        <RadioButtonUnchecked sx={{ 
                          fontSize: '1.2rem', 
                          color: order.statusColor 
                        }} />
                      ) : (
                        <CheckCircle sx={{ 
                          fontSize: '1.2rem', 
                          color: order.statusColor 
                        }} />
                      )}
                      <Typography sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        fontWeight: 700,
                        color: order.statusColor,
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {order.status}
                      </Typography>
                    </Box>

                    {/* Delivery Date */}
                    <Typography sx={{
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                      color: '#AAAAAA',
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      {order.deliveryDate}
                    </Typography>
                  </Box>
                </Box>

                {/* Dotted Divider */}
                <Box sx={{ 
                  height: 1, 
                  background: 'repeating-linear-gradient(to right, #e0e0e0 0px, #e0e0e0 4px, transparent 4px, transparent 8px)',
                  mb: 2 
                }} />

                {/* View Details Button */}
                <Box sx={{ 
                  textAlign: 'center',
                  borderTop: '1px solid rgba(0, 0, 0, 0.15)',
                  //background: rgba(0, 0, 0, 0.15);
                  pt: 2
                }}>
                  <Button
                    onClick={() => handleViewDetails(order.id)}
                    sx={{
                      color: '#3C3CD2',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      textTransform: 'none',
                      fontFamily: 'Arial, sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(60, 60, 210, 0.1)'
                      }
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Floating Action Button */}
      <Fab
        onClick={handleFabClick}
        sx={{
          position: 'fixed',
          bottom: { xs: 80, sm: 90, md: 100 },
          right: { xs: 16, sm: 20, md: 24 },
          zIndex: 1001,
          background: '#3C3CD2',
          color: 'white',
          width: { xs: 56, sm: 64, md: 72 },
          height: { xs: 56, sm: 64, md: 72 },
          '&:hover': {
            background: '#2A2A9E'
          }
        }}
      >
        <ShoppingCart sx={{ 
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
        }} />
      </Fab>

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
                  backgroundColor: 'rgba(60, 60, 210, 0.1)',
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
                  background: item.active ? '#3C3CD2' : 'transparent',
                  color: item.active ? 'white' : '#3C3CD2',
                  mb: { xs: 0.25, sm: 0.5, md: 0.5 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: item.active ? '#2A2A9E' : 'rgba(60, 60, 210, 0.1)',
                    color: item.active ? 'white' : '#3C3CD2'
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
