'use client';

import React, { useState, use } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Button } from '@mui/material';
import { 
  ShoppingCart, 
  KeyboardArrowDown, 
  ChevronLeft,
  SportsEsports,
  Leaderboard,
  Home,
  Event,
  CheckCircle,
  Download
} from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CompletedOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [orderDetails] = useState({
    id: resolvedParams.id,
    name: 'SanDisk SDCZ48-064G 6...',
    storage: '64 GB RAM',
    specs: ['USB 3.0 | 64 GB', 'Plastic Body...'],
    status: 'Delivered',
    statusColor: '#4CAF50',
    deliveryDate: 'Delivered by 12 Sep 25',
    orderNumber: 'SF-25658AZ5468',
    originalPrice: 500,
    currentPrice: 250,
    placedDate: '5 sep 25',
    deliveredDate: '12 sep 25',
    image: '/images/banner/usb_drive.svg',
    timeline: [
      {
        status: 'Order Confirmed',
        completed: true,
        date: '5 sep 25 6:36 PM',
        color: '#4CAF50'
      },
      {
        status: 'Delivered',
        completed: true,
        date: '6 sep 25 9:26 AM',
        color: '#4CAF50'
      }
    ]
  });

  const handleBack = () => {
    router.back();
  };

  const handleDownloadInvoice = () => {
    // Create a simple PDF download
    const element = document.createElement('a');
    const file = new Blob([`
      <html>
        <head>
          <title>Invoice - Order ${orderDetails.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .order-info { margin-bottom: 20px; }
            .product-info { margin-bottom: 20px; }
            .total { font-weight: bold; font-size: 18px; }
            .footer { margin-top: 30px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Invoice</h1>
            <h2>Order ${orderDetails.orderNumber}</h2>
          </div>
          <div class="order-info">
            <p><strong>Order Date:</strong> ${orderDetails.placedDate}</p>
            <p><strong>Delivery Date:</strong> ${orderDetails.deliveredDate}</p>
            <p><strong>Status:</strong> ${orderDetails.status}</p>
          </div>
          <div class="product-info">
            <h3>Product Details</h3>
            <p><strong>Product:</strong> ${orderDetails.name}</p>
            <p><strong>Storage:</strong> ${orderDetails.storage}</p>
            <p><strong>Specifications:</strong></p>
            <ul>
              ${orderDetails.specs.map(spec => `<li>${spec}</li>`).join('')}
            </ul>
          </div>
          <div class="total">
            <p><strong>Total Amount:</strong> ${orderDetails.currentPrice} coins</p>
            <p><strong>Original Price:</strong> <s>${orderDetails.originalPrice} coins</s></p>
          </div>
          <div class="footer">
            <p>Thank you for your order!</p>
          </div>
        </body>
      </html>
    `], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `invoice-${orderDetails.orderNumber}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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

        {/* Center Title */}
        <Typography sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
          fontWeight: 700,
          color: '#333333',
          fontFamily: 'Arial, sans-serif'
        }}>
          Order Details
        </Typography>

        {/* Cart and Wallet */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Cart Icon */}
          <Box sx={{ position: 'relative' }}>
            <IconButton sx={{ 
              color: 'white',
              padding: { xs: 1, sm: 1.5, md: 2 }
            }}>
              <ShoppingCart sx={{ 
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
              }} />
            </IconButton>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: '#ff4444',
                color: 'white',
                borderRadius: '50%',
                width: { xs: 18, sm: 20, md: 22 },
                height: { xs: 18, sm: 20, md: 22 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                fontWeight: 'bold'
              }}
            >
              3
            </Box>
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
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        pt: { xs: '70px', sm: '80px', md: '90px' }, 
        pb: { xs: '100px', sm: '120px', md: '140px' },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
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
                  width: { xs: 80, sm: 100, md: 120 },
                  height: { xs: 80, sm: 100, md: 120 },
                  borderRadius: 2,
                  background: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Image
                  src={orderDetails.image}
                  alt={orderDetails.name}
                  width={60}
                  height={60}
                  style={{
                    width: '60%',
                    height: '60%',
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
                  <CheckCircle sx={{ 
                    fontSize: '1.2rem', 
                    color: orderDetails.statusColor 
                  }} />
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

            {/* Order Summary Section */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mb: 3
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
                    color: '#AAAAAA', 
                    textDecoration: 'line-through', 
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {orderDetails.originalPrice}
                  </Typography>
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

            {/* Placed Date */}
            <Box sx={{ mb: 3 }}>
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

            {/* Divider */}
            <Box sx={{ 
              height: 1, 
              background: '#e0e0e0', 
              mb: 3 
            }} />

            {/* Order Status Timeline */}
            <Box sx={{ position: 'relative', mb: 4 }}>
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

            {/* Download Invoice Button */}
            <Box sx={{ textAlign: 'center' }}>
              <Button
                onClick={handleDownloadInvoice}
                startIcon={<Download sx={{ fontSize: '1.2rem', color: '#3C3CD2' }} />}
                sx={{
                  color: '#3C3CD2',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontFamily: 'Arial, sans-serif',
                  textDecoration: 'underline',
                  '&:hover': {
                    backgroundColor: 'rgba(60, 60, 210, 0.1)',
                    textDecoration: 'underline'
                  }
                }}
              >
                Download Invoice
              </Button>
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
