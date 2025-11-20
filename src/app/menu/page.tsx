'use client';

// ========================================
// IMPORTS
// ========================================
import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { 
  ShoppingBag,
  ShoppingCart,
  Support,
  Help,
  Description
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from '@/components/TabBar';
import HeaderWithBack from '@/components/HeaderWithBack';

// ========================================
// MAIN COMPONENT
// ========================================
export default function MenuPage() {
  const router = useRouter();

  // ========================================
  // EVENT HANDLERS
  // ========================================
  
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


  // ========================================
  // RENDER COMPONENT
  // ========================================
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f5f5f5',
        position: 'relative',
        margin:"0 -15px",
        width:"calc(100% + 30px)",
      }}
    >
      {/* ========================================
          HEADER SECTION
          ======================================== */}
     <HeaderWithBack 
       title="Back" 
       backgroundColor="#4848DB"
       sx={{
         backgroundColor: '#4848DB',
         textAlign: 'center',
         color: 'white',
         position: 'fixed',
         top: 0,
         left: 0,
         right: 0,
         zIndex: 1100,
       }}
     />

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
        <TabBar />
      </Box>
    </Box>
  );
}
