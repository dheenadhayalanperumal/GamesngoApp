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
  CheckCircle,
  RadioButtonUnchecked
} from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [orderDetails] = useState({
    id: params.id,
    name: 'SanDisk SDCZ48-064G 6...',
    storage: '64 GB RAM',
    specs: ['USB 3.0 | 64 GB', 'Plastic Body...'],
    status: 'In Progress',
    statusColor: '#4CAF50',
    deliveryDate: 'Expected Delivery by 12 Sep 25',
    orderNumber: 'SF-25658AZ5468',
    originalPrice: 500,
    currentPrice: 250,
    placedDate: '5 sep 25',
    image: '/images/banner/usb_drive.svg',
    timeline: [
      {
        status: 'Order Confirmed',
        completed: true,
        date: '5 sep 25 6:36 PM',
        color: '#4CAF50'
      },
      {
        status: 'Shipped',
        completed: true,
        date: '6 sep 25 9:26 AM',
        color: '#4CAF50'
      },
      {
        status: 'Out for Delivery',
        completed: false,
        date: '',
        color: '#AAAAAA'
      },
      {
        status: 'Delivered',
        completed: false,
        date: '',
        color: '#AAAAAA'
      }
    ]
  });

  const handleBack = () => {
    router.back();
  };

  const handleBottomNavClick = (item: string) => {
    console.log('Clicked bottom nav:', item);
    // Handle navigation based on bottom nav item
  };

  const handleViewCompletedOrder = () => {
    router.push(`/completed-order-details/${orderDetails.id}`);
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
         background: '#f5f5f5'
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
           Order Details
         </Typography>

        
        {/* Order Details Card */}
        <Card
          sx={{
            borderRadius: 3,
            background: 'white',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Product Information Section */}
            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
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
                  src={orderDetails.image}
                  alt={orderDetails.name}
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
                  {orderDetails.name}
                </Typography>

                {/* Storage */}
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#666666',
                  mb: 1,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {orderDetails.storage}
                </Typography>

                {/* Specifications */}
                <Box sx={{ mb: 2 }}>
                  {orderDetails.specs.map((spec, index) => (
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
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: orderDetails.statusColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'white'
                      }}
                    />
                  </Box>
                  <Typography sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    fontWeight: 700,
                    color: orderDetails.statusColor,
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {orderDetails.status}
                  </Typography>
                </Box>

                {/* Delivery Date */}
                <Typography sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  color: orderDetails.statusColor,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {orderDetails.deliveryDate}
                </Typography>
              </Box>
            </Box>

            {/* Divider */}
            <Box sx={{ 
              height: 1, 
              background: '#e0e0e0', 
              mb: 2 
            }} />

            {/* Order Summary Section */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2,
              borderTop: '1px solid rgba(0, 0, 0, 0.15)',
         
              pt: 2
            }}>
              {/* Order Number */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  color: '#666666',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Order number
                </Typography>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: '#333333',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {orderDetails.orderNumber}
                </Typography>
              </Box>

              {/* Placed Date */}
              <Box>
                <Typography sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  color: '#666666',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Placed
                </Typography>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  color: '#333333',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {orderDetails.placedDate}
                </Typography>
              </Box>

              {/* Total Price */}
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  color: '#666666',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Total
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                  <Typography sx={{ 
                    color: '#AAAAAA', 
                    textDecoration: 'line-through', 
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {orderDetails.originalPrice}
                  </Typography>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      background: '#FFD700',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Typography sx={{ 
                      fontSize: '0.5rem', 
                      fontWeight: 800, 
                      color: '#800080' 
                    }}>
                      ⚡
                    </Typography>
                  </Box>
                  <Typography sx={{ 
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' }, 
                    fontWeight: 700, 
                    color: '#333333',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {orderDetails.currentPrice}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Divider */}
            <Box sx={{ 
              height: 1, 
              background: '#e0e0e0', 
              mb: 3 
            }} />

            {/* Order Status Timeline */}
            <Box sx={{ position: 'relative' }}>
              {/* Timeline Line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 12,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: '#4CAF50',
                  zIndex: 1
                }}
              />

              {/* Timeline Items */}
              {orderDetails.timeline.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    mb: 3,
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {/* Status Icon */}
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: item.completed ? item.color : 'white',
                      border: `2px solid ${item.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      flexShrink: 0
                    }}
                  >
                    {item.completed && (
                      <CheckCircle sx={{ 
                        fontSize: '1rem', 
                        color: 'white' 
                      }} />
                    )}
                  </Box>

                  {/* Status Details */}
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 700,
                      color: item.completed ? '#333333' : '#AAAAAA',
                      fontFamily: 'Arial, sans-serif',
                      mb: 0.5
                    }}>
                      {item.status}
                    </Typography>
                    {item.date && (
                      <Typography sx={{
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        color: '#AAAAAA',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {item.date}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>

          </CardContent>
        </Card>
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
