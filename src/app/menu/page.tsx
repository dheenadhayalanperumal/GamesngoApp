'use client';

// ========================================
// IMPORTS
// ========================================
import React from 'react';
import { Box, Typography, IconButton, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
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
  ShoppingBag,
  Support,
  Help,
  Description
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

// ========================================
// MAIN COMPONENT
// ========================================
export default function MenuPage() {
  const router = useRouter();

  // ========================================
  // EVENT HANDLERS
  // ========================================
  
  /**
   * Handle back button click - navigates to previous page
   */
  const handleBack = () => {
    router.back();
  };

  /**
   * Handle interactive card clicks - navigates to respective pages
   * @param cardType - Type of card clicked ('orders', 'saved', 'address')
   */
  const handleCardClick = (cardType: string) => {
    if (cardType === 'saved') {
      router.push('/saved-items');
    } else if (cardType === 'orders') {
      router.push('/your-orders');
    } else if (cardType === 'address') {
      router.push('/saved-address');
    } else {
      console.log('Clicked:', cardType);
      // Handle navigation based on card type
    }
  };

  /**
   * Handle account section item clicks - navigates to respective pages
   * @param item - Account item clicked ('faq', 'support', 'terms')
   */
  const handleAccountItemClick = (item: string) => {
    if (item === 'faq') {
      router.push('/faq');
    } else if (item === 'support') {
      router.push('/order-support');
    } else if (item === 'terms') {
      router.push('/terms-conditions');
    } else {
      console.log('Clicked account item:', item);
      // Handle navigation based on account item
    }
  };

  /**
   * Handle bottom navigation clicks
   * @param item - Bottom nav item clicked
   */
  const handleBottomNavClick = (item: string) => {
    console.log('Clicked bottom nav:', item);
    // Handle navigation based on bottom nav item
  };

  // ========================================
  // RENDER COMPONENT
  // ========================================
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f5f5f5',
        position: 'relative'
      }}
    >
      {/* ========================================
          HEADER SECTION
          ======================================== */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          background: '#3C3CD2',
          padding: { xs: '10px 12px', sm: '12px 16px', md: '15px 20px', lg: '18px 24px' },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: { xs: '56px', sm: '64px', md: '72px', lg: '80px' }
        }}
      >
        {/* Back Button - Left side navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          <IconButton 
            onClick={handleBack}
            sx={{ 
              color: 'white',
              padding: { xs: 0.4, sm: 0.6, md: 0.8, lg: 1 },
              mr: { xs: 0.5, sm: 0.75, md: 1 }
            }}
          >
            <ChevronLeft sx={{ 
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem', lg: '1.7rem' }
            }} />
          </IconButton>
          <Typography sx={{ 
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
            fontWeight: 600,
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1.2
          }}>
            Back
          </Typography>
        </Box>

        {/* Wallet Section - Right side */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          color: 'white',
          gap: { xs: 0.4, sm: 0.6, md: 0.8, lg: 1 }
        }}>
          <Typography sx={{ 
            mr: { xs: 0.4, sm: 0.6, md: 0.8, lg: 1 }, 
            fontWeight: 600,
            fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.05rem', lg: '1.15rem' },
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1.2
          }}>
            Wallet
          </Typography>
          <KeyboardArrowDown sx={{ 
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem', lg: '1.7rem' }
          }} />
        </Box>
      </Box>

      {/* ========================================
          MAIN CONTENT SECTION
          ======================================== */}
      <Box sx={{ 
        pt: { xs: '66px', sm: '74px', md: '82px', lg: '90px' }, 
        pb: { xs: '90px', sm: '100px', md: '110px', lg: '120px' },
        background: '#EEEEEE',
        minHeight: '100vh'
      }}>
        {/* ========================================
            INTERACTIVE CARDS SECTION
            ======================================== */}
        <Box sx={{ 
          p: { xs: 2, sm: 2.5, md: 3, lg: 4 },
          mb: { xs: 3, sm: 4, md: 5 }
        }}>
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            {/* Your Orders Card - Navigate to orders page */}
            <Card
              onClick={() => handleCardClick('orders')}
              sx={{
                flex: 1,
                borderRadius: 3,
                background: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minHeight: '120px',
                maxHeight: '120px',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <CardContent sx={{ 
                p: 2, 
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Box sx={{ mb: 1.5 }}>
                  <ShoppingBag sx={{ 
                    fontSize: '2.5rem', 
                    color: '#6E6EFF' 
                  }} />
                </Box>
                <Typography sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#4A4A4A',
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.2
                }}>
                  Your Orders
                </Typography>
              </CardContent>
            </Card>

            {/* Saved Items Card - Navigate to saved items page */}
            <Card
              onClick={() => handleCardClick('saved')}
              sx={{
                flex: 1,
                borderRadius: 3,
                background: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minHeight: '120px',
                maxHeight: '120px',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <CardContent sx={{ 
                p: 2, 
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Box sx={{ mb: 1.5 }}>
                  <ShoppingCart sx={{ 
                    fontSize: '2.5rem', 
                    color: '#6E6EFF' 
                  }} />
                </Box>
                <Typography sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#4A4A4A',
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.2
                }}>
                  Saved Items
                </Typography>
              </CardContent>
            </Card>

            {/* Saved Address Card - Navigate to saved address page */}
            <Card
              onClick={() => handleCardClick('address')}
              sx={{
                flex: 1,
                borderRadius: 3,
                background: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minHeight: '120px',
                maxHeight: '120px',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <CardContent sx={{ 
                p: 2, 
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Box sx={{ mb: 1.5 }}>
                  <Box sx={{ 
                    fontSize: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    📍
                  </Box>
                </Box>
                <Typography sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#4A4A4A',
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.2
                }}>
                  Saved Address
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* ========================================
            ACCOUNT SECTION
            ======================================== */}
        <Box sx={{ 
          p: { xs: 2, sm: 2.5, md: 3, lg: 4 },
          background: '#F5F5F5'
        }}>
          {/* Account Section Title */}
          <Typography sx={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#4A4A4A',
            mb: 2,
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1.2
          }}>
            Account
          </Typography>

          {/* Account Options Card */}
          <Card sx={{
            borderRadius: 3,
            background: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <List sx={{ p: 0 }}>
              {/* Order Support - Navigate to support page */}
              <ListItem
                onClick={() => handleAccountItemClick('support')}
                sx={{
                  cursor: 'pointer',
                  py: 2,
                  px: 3,
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(60, 60, 210, 0.05)'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Support sx={{ 
                    fontSize: '1.5rem', 
                    color: '#FFD700' 
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Order Support"
                  primaryTypographyProps={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#4A4A4A',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: 1.3
                  }}
                />
              </ListItem>

              <Divider sx={{ backgroundColor: '#e0e0e0', mx: 3 }} />

              {/* Browse FAQ's - Navigate to FAQ page */}
              <ListItem
                onClick={() => handleAccountItemClick('faq')}
                sx={{
                  cursor: 'pointer',
                  py: 2,
                  px: 3,
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(60, 60, 210, 0.05)'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Help sx={{ 
                    fontSize: '1.5rem', 
                    color: '#FFD700' 
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Browse FAQ's"
                  primaryTypographyProps={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#4A4A4A',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: 1.3
                  }}
                />
              </ListItem>

              <Divider sx={{ backgroundColor: '#e0e0e0', mx: 3 }} />

              {/* Terms & Conditions, Policy - Navigate to terms page */}
              <ListItem
                onClick={() => handleAccountItemClick('terms')}
                sx={{
                  cursor: 'pointer',
                  py: 2,
                  px: 3,
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(60, 60, 210, 0.05)'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Description sx={{ 
                    fontSize: '1.5rem', 
                    color: '#FFD700' 
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Terms & Conditions, Policy"
                  primaryTypographyProps={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#4A4A4A',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: 1.3
                  }}
                />
              </ListItem>
            </List>
          </Card>
        </Box>
      </Box>

      {/* ========================================
          BOTTOM NAVIGATION SECTION
          ======================================== */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: '#F5F5F5',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
          padding: '8px 0'
        }}
      >
        {/* Navigation Items Container */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {/* Navigation Items Array - Games, Leader, Home, Redeem, Events */}
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
                py: 0.5,
                px: 1,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(60, 60, 210, 0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {/* Icon Container */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: item.active ? '#3C3CD2' : 'transparent',
                  color: item.active ? 'white' : '#6E6EFF',
                  mb: 0.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: item.active ? '#2A2A9E' : 'rgba(60, 60, 210, 0.1)',
                    color: item.active ? 'white' : '#6E6EFF'
                  }
                }}
              >
                {React.cloneElement(item.icon, {
                  sx: { 
                    fontSize: '1.5rem'
                  }
                })}
              </Box>
              {/* Navigation Label */}
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#4A4A4A',
                  fontWeight: 500,
                  textAlign: 'center',
                  transition: 'color 0.3s ease',
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.2
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
