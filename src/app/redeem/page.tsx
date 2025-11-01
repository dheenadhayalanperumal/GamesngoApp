'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, TextField, InputAdornment, Card, CardContent, Chip, Avatar, Badge } from '@mui/material';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, 
  KeyboardArrowDown, 
  Search, 
  Menu,
  SportsEsports,
  LocalMovies,
  Restaurant,
  Today,
  Leaderboard,
  Home,
  Event,
  AccessTime,
  Star,
  BookmarkBorder,
  Bookmark
} from '@mui/icons-material';
import Image from 'next/image';

export default function RedeemPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  const categories = [
    { id: 'Today', label: 'Today', icon: <Today />, active: true },
    { id: 'Gaming', label: 'Gaming', icon: <SportsEsports />, active: false },
    { id: 'Movies', label: 'Movies', icon: <LocalMovies />, active: false },
    { id: 'Food', label: 'Food', icon: <Restaurant />, active: false }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    console.log('Category changed to:', categoryId);
    
    // Reset banner to first one when switching categories
    setCurrentBanner(0);
  };

  const handleMenuClick = () => {
    router.push('/menu');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const handleProductClick = (productId: number) => {
    router.push(`/redeem/product/${productId}`);
  };

  // Sample data for different categories
  const getCategoryContent = (category: string) => {
    switch (category) {
      case 'Gaming':
        return {
          banner: {
            title: 'GAMING GEAR DEALS',
            subtitle: 'SHOP GAMING',
            image: 'Gaming Chair',
            color: '#4A90E2'
          },
          hotOffers: [
            {
              id: 1,
              name: 'Zebronics Mouse Z...',
              originalPrice: 500,
              currentPrice: 250,
              discount: 50,
              features: ['Wireless', 'Optical Tracking'],
              rating: 4.9,
              image: '/images/banner/mouse_product.svg',
              isNew: true
            },
            {
              id: 2,
              name: 'Gaming Keyboard RGB',
              originalPrice: 800,
              currentPrice: 400,
              discount: 50,
              features: ['RGB Backlight', 'Mechanical Switches'],
              rating: 4.8,
              image: '/images/banner/mouse_product.svg',
              isNew: false
            },
            {
              id: 3,
              name: 'Gaming Keyboard RGB',
              originalPrice: 600,
              currentPrice: 300,
              discount: 50,
              features: ['7.1 Surround', 'Noise Cancellation'],
              rating: 4.7,
              image: '/images/banner/mouse_product.svg',
              isNew: true
            }
          ],
          gamingMouse: [
            {
              id: 4,
              name: 'Zebronics Mouse Z...',
              originalPrice: 500,
              currentPrice: 250,
              discount: 50,
              features: ['Wireless', 'Optical Tracking'],
              rating: 4.9,
              image: '/images/banner/mouse_product.svg',
              isNew: true
            },
            {
              id: 5,
              name: 'Gaming Keyboard RGB',
              originalPrice: 400,
              currentPrice: 200,
              discount: 50,
              features: ['High DPI', 'RGB Lighting'],
              rating: 4.6,
              image: '/images/banner/mouse_product.svg',
              isNew: false
            }
          ]
        };
      case 'Movies':
        return {
          banner: {
            title: 'MOVIE TICKETS & MORE',
            subtitle: 'BOOK NOW',
            image: 'Movie Tickets',
            color: '#E74C3C'
          },
          products: [
            {
              name: 'Movie Ticket Combo',
              originalPrice: 300,
              currentPrice: 150,
              discount: 50,
              features: ['2 Movie Tickets', 'Popcorn & Drink', 'Premium Seats', 'Online Booking']
            }
          ]
        };
      case 'Food':
        return {
          banner: {
            title: 'RESTAURANT DEALS',
            subtitle: 'ORDER NOW',
            image: 'Food Items',
            color: '#F39C12'
          },
          products: [
            {
              name: 'Restaurant Voucher',
              originalPrice: 200,
              currentPrice: 100,
              discount: 50,
              features: ['Valid for 30 days', 'Multiple restaurants', 'No expiry', 'Instant delivery']
            }
          ]
        };
      default: // Today
        return {
          banner: {
            title: 'TODAY\'S SPECIAL DEALS',
            subtitle: 'LIMITED TIME OFFER',
            image: 'Today Banner',
            color: '#6E6EFF'
          },
          products: [
            {
              name: 'Cosmic Byte MH301',
              originalPrice: 500,
              currentPrice: 250,
              discount: 50,
              features: ['Wireless technology', 'Ai Noise Cancellation', '40 Hours Playback', '20 Mins Charging Time']
            }
          ]
        };
    }
  };

  const currentContent = getCategoryContent(activeCategory);

  const banners = [
    { id: 1, image: 'deals_banner.svg' },
    { id: 2, image: 'deals_banner.svg' }
  ];

  // Auto-slider functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000); // Change banner every 3 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
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
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
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
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        {/* Category Tabs */}
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 3, sm: 3, md: 3 },
            py: { xs: 1.5, sm: 2, md: 2.5 },
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {categories.map((category) => (
            <Box
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                minWidth: { xs: '80px', sm: '80px', md: '90px' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              <Box
                sx={{
                  width: { xs: 80, sm: 80, md: 80 },
                  height: { xs: 80, sm: 80, md: 80 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: { xs: 0.5, sm: 1, md: 1 },
                  background: 'white',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}
              >
                <Image
                  src={`/images/banner/${category.id.toLowerCase()}_category.svg`}
                  alt={category.label}
                  width={80}
                  height={80}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <Typography
                sx={{
                  color: '#21175B',
                  fontSize: { xs: '1rem', sm: '0.75rem', md: '0.8rem' },
                  fontWeight: 600,
                  textAlign: 'center',
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.2
                }}
              >
                {category.label}
              </Typography>
              {category.id === activeCategory && (
                <Box
                  sx={{
                    width: '100%',
                    height: 6,
                    background: '#201070',
                    borderRadius: '2px',
                    mt: 0.8,
                    transition: 'all 0.3s ease'
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

         {/* Search Bar */}
        <Box sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Search Bar */}
            <TextField
              fullWidth
              placeholder="Search Anything"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search sx={{ 
                        color: 'rgba(33, 23, 91, 0.60)', 
                        width: '32px',
                        height: '32px'
                      }} />
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  background: 'rgba(172, 64, 249, 0.00)',
                    border: '1px solid rgba(0, 0, 0, 0.20)',
                  '& fieldset': {
                    border: 'none'
                  },
                  '&:hover fieldset': {
                    border: 'none'
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none'
                  }
                },
                '& .MuiInputBase-input': {
                  color: 'rgba(33, 23, 91, 0.50)',
                  fontSize: '1rem',
                  fontWeight: 400,
                  '&::placeholder': {
                    color: 'rgba(33, 23, 91, 0.50)',
                    opacity: 1
                  }
                }
              }}
            />

            {/* Hamburger Menu */}
            <IconButton
              onClick={handleMenuClick}
              sx={{
               backgroundColor: 'rgba(172, 64, 249, 0.00)',
                    border: '1px solid rgba(0, 0, 0, 0.20)',
                borderRadius: 3,
                width: 60,
                height: 60,
                minWidth: 60,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Menu sx={{ color: '#504070', fontSize: '3rem' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Conditional Content Based on Category */}
        {activeCategory === 'Gaming' ? (
          <>
            {/* Hot Offers Section for Gaming */}
            <Box sx={{ py: 2 }} data-testid="hot-offers-section">
              <Typography
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  fontWeight: 800,
                  color: '#21175B',
                  mb: 2,
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Hot Offers
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  overflowX: 'auto',
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  scrollSnapType: 'x mandatory',
                  '& > *': {
                    scrollSnapAlign: 'start'
                  }
                }}
              >
                {currentContent.hotOffers?.map((product) => (
                  <Card
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    sx={{
                      width: { xs: 'calc(50% - 8px)', sm: 'calc(50% - 8px)', md: 'calc(50% - 8px)' },
                      minWidth: { xs: 'calc(50% - 8px)', sm: 'calc(50% - 8px)', md: 'calc(50% - 8px)' },
                      flexShrink: 0,
                      borderRadius: 3,
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      background: 'white',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                      }
                    }}
                  >
                    {/* New Badge */}
                    {product.isNew && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          background: '#000',
                          color: 'white',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          zIndex: 2
                        }}
                      >
                        New
                      </Box>
                    )}

                    {/* Bookmark Icon */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 2
                      }}
                    >
                      <BookmarkBorder sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
                    </Box>

                    <CardContent sx={{ p: 0 }}>
                      {/* Product Image */}
                      <Box
                        sx={{
                         // height: { xs: '180px', sm: '200px', md: '220px' },
                          background: '#f8f9fa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={120}
                          height={120}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </Box>

                      {/* Product Details */}
                      <Box sx={{ p: 2 }}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 700,
                            color: '#1A1A1A',
                            mb: 1,
                            fontFamily: 'Arial, sans-serif'
                          }}
                        >
                          {product.name}
                        </Typography>

                        {/* Price */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              background: '#FFD700',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 1
                            }}
                          >
                            <Typography sx={{ fontSize: '0.5rem', fontWeight: 800, color: '#6E6EFF' }}>
                              ⚡
                            </Typography>
                          </Box>
                          <Typography sx={{ color: '#999', textDecoration: 'line-through', fontSize: '0.9rem', mr: 1 }}>
                            {product.originalPrice}
                          </Typography>
                          <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A1A1A' }}>
                            {product.currentPrice}
                          </Typography>
                        </Box>

                        {/* Features */}
                        <Box sx={{ mb: 1 }}>
                          {product.features.map((feature, index) => (
                            <Typography
                              key={index}
                              sx={{
                                fontSize: '0.8rem',
                                color: '#4A4A4A',
                                mb: 0.5,
                                fontFamily: 'Arial, sans-serif'
                              }}
                            >
                              • {feature}
                            </Typography>
                          ))}
                        </Box>

                        {/* Rating */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Star sx={{ color: '#FFD700', fontSize: '1rem', mr: 0.5 }} />
                          <Typography sx={{ fontSize: '0.8rem', color: '#4A4A4A' }}>
                            {product.rating}
                          </Typography>
                        </Box>

                        {/* Redeem Button */}
                        <Button
                          sx={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            color: '#1A1A1A',
                            borderRadius: 2,
                            py: 1,
                            px: 2,
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            width: '100%',
                            fontFamily: 'Arial, sans-serif',
                            boxShadow: '0 2px 8px rgba(255, 215, 0, 0.4)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(255, 215, 0, 0.6)'
                            }
                          }}
                        >
                          Redeem
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>

            {/* Gaming Mouse Section for Gaming */}
            <Box sx={{ py: 2 }} data-testid="gaming-mouse-section">
              <Typography
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  fontWeight: 800,
                  color: '#21175B',
                  mb: 2,
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Gaming Mouse
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  overflowX: 'auto',
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  scrollSnapType: 'x mandatory',
                  '& > *': {
                    scrollSnapAlign: 'start'
                  }
                }}
              >
                {currentContent.gamingMouse?.map((product) => (
                  <Card
                    key={product.id}
                    className="gaming-mouse-card"
                    onClick={() => handleProductClick(product.id)}
                    sx={{
                      width: { xs: 'calc(50% - 8px)', sm: 'calc(50% - 8px)', md: 'calc(50% - 8px)' },
                      minWidth: { xs: 'calc(50% - 8px)', sm: 'calc(50% - 8px)', md: 'calc(50% - 8px)' },
                      flexShrink: 0,
                      borderRadius: 3,
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      background: 'white',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                      }
                    }}
                  >
                    {/* New Badge */}
                    {product.isNew && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          background: '#000',
                          color: 'white',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          zIndex: 2
                        }}
                      >
                        New
                      </Box>
                    )}

                    {/* Bookmark Icon */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 2
                      }}
                    >
                      <BookmarkBorder sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
                    </Box>

                    <CardContent sx={{ p: 0 }}>
                      {/* Product Image */}
                      <Box
                        sx={{
                         // height: { xs: '180px', sm: '200px', md: '220px' },
                          background: '#f8f9fa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={120}
                          height={120}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </Box>

                      {/* Product Details */}
                      <Box sx={{ p: 2 }}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 700,
                            color: '#1A1A1A',
                            mb: 1,
                            fontFamily: 'Arial, sans-serif'
                          }}
                        >
                          {product.name}
                        </Typography>

                        {/* Price */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              background: '#FFD700',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 1
                            }}
                          >
                            <Typography sx={{ fontSize: '0.5rem', fontWeight: 800, color: '#6E6EFF' }}>
                              ⚡
                            </Typography>
                          </Box>
                          <Typography sx={{ color: '#999', textDecoration: 'line-through', fontSize: '0.9rem', mr: 1 }}>
                            {product.originalPrice}
                          </Typography>
                          <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A1A1A' }}>
                            {product.currentPrice}
                          </Typography>
                        </Box>

                        {/* Features */}
                        <Box sx={{ mb: 1 }}>
                          {product.features.map((feature, index) => (
                            <Typography
                              key={index}
                              sx={{
                                fontSize: '0.8rem',
                                color: '#4A4A4A',
                                mb: 0.5,
                                fontFamily: 'Arial, sans-serif'
                              }}
                            >
                              • {feature}
                            </Typography>
                          ))}
                        </Box>

                        {/* Rating */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Star sx={{ color: '#FFD700', fontSize: '1rem', mr: 0.5 }} />
                          <Typography sx={{ fontSize: '0.8rem', color: '#4A4A4A' }}>
                            {product.rating}
                          </Typography>
                        </Box>

                        {/* Redeem Button */}
                        <Button
                          sx={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            color: '#1A1A1A',
                            borderRadius: 2,
                            py: 1,
                            px: 2,
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            width: '100%',
                            fontFamily: 'Arial, sans-serif',
                            boxShadow: '0 2px 8px rgba(255, 215, 0, 0.4)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(255, 215, 0, 0.6)'
                            }
                          }}
                        >
                          Redeem
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </>
        ) : (
          <>
            {/* Original Banner Design for Today Category */}
         <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100 }}>
          <Card
            sx={{
              borderRadius: { xs: 2, sm: 3, md: 3, lg: 3 },
              background: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: { xs: '190px', sm: '220px', md: '300px', lg: '320px', xl: '380px' },
              boxShadow: { 
                xs: '0 2px 10px rgba(0, 0, 0, 0.2)', 
                sm: '0 4px 20px rgba(0, 0, 0, 0.3)',
                md: '0 4px 20px rgba(0, 0, 0, 0.3)'
              },
              mx: { xs: 0.5, sm: 2, md: 0 },
              '@media (max-width: 480px)': {
                minHeight: '180px',
                borderRadius: 2
              },
              '@media (min-width: 1920px)': {
                minHeight: '480px'
              }
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: { xs: '180px', sm: '220px', md: '280px', lg: '320px', xl: '380px' },
                    backgroundImage: `url(/images/banner/${banners[currentBanner].image})`,
                backgroundSize: { 
                  xs: 'cover', 
                  sm: 'cover', 
                  md: 'cover', 
                  lg: 'cover',
                  xl: 'cover'
                },
                backgroundPosition: { 
                  xs: 'center center', 
                  sm: 'center center', 
                  md: 'center center',
                  lg: 'center center',
                  xl: 'center center'
                },
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                minHeight: { xs: '180px', sm: '220px', md: '280px', lg: '320px', xl: '380px' },
                '@media (max-width: 480px)': {
                  height: '160px',
                  minHeight: '160px'
                },
                '@media (min-width: 1920px)': {
                  height: '420px',
                  minHeight: '420px'
                }
              }}
            >
              {/* Overlay for better text visibility */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
                }}
              />
              
              {/* Banner Content */}
              <Box sx={{ position: 'relative', zIndex: 2, p: 3, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                      <Box sx={{ flex: 1 }}></Box>
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Carousel Dots */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            {banners.map((banner, index) => (
              <Box
                key={banner.id}
                onClick={() => {
                  setCurrentBanner(index);
                  console.log('Switching to banner:', banner.image);
                }}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: index === currentBanner ? '#6E6EFF' : '#ccc',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: '#6E6EFF',
                    transform: 'scale(1.2)'
                  }
                }}
              />
            ))}
          </Box>
        </Box>

            {/* Original Product Card Design for Today Category */}
            <Box sx={{ pt: 1, pb: 2 }}>
             {(currentContent.products || []).map((product, index) => (
             <Card
               key={index}
               sx={{
                 borderRadius: 3,
                 boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                 overflow: 'hidden',
                 background: '#E8E8FF',
                 position: 'relative',
                 maxWidth: '100%',
                 minHeight: { xs: '200px', sm: '220px', md: '240px' },
                 mx: 'auto',
                 margin: 0
               }}
             >
               {/* Discount Badge - Ribbon Design */}
               <Box
                 sx={{
                   position: 'absolute',
                   top: 0,
                   left: 0,
                   zIndex: 2,
                   background: '#E74C3C',
                   color: 'white',
                   px: { xs: 1.5, sm: 2 },
                   py: { xs: 0.75, sm: 1 },
                   fontSize: { xs: '0.7rem', sm: '0.8rem' },
                   fontWeight: 700,
                   letterSpacing: 0.5,
                   fontFamily: 'Arial, sans-serif',
                   clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 0 100%, 6px 50%)',
                   boxShadow: '0 2px 6px rgba(231, 76, 60, 0.3)'
                 }}
               >
                 {product.discount}% OFF
               </Box>

              <CardContent sx={{ p: 0, height: '100%' }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  height: '100%',
                  minHeight: { xs: '200px', sm: '220px', md: '240px' }
                }}>
                  {/* Product Image - Left Side */}
                  <Box
                    sx={{
                      flex: '0 0 40%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: { xs: 1.5, sm: 2, md: 2.5 },
                      background: 'white',
                      borderRadius: { xs: '12px 0 0 12px', sm: '16px 0 0 16px', md: '20px 0 0 20px' }
                    }}
                  >
                    {/* Headphones Image */}
                    <Box
                      sx={{
                        width: { xs: '120px', sm: '140px', md: '160px' },
                        height: { xs: '120px', sm: '140px', md: '160px' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        borderRadius: 2,
                        overflow: 'hidden'
                      }}
                    >
                      <Image
                        src={`/images/banner/${activeCategory.toLowerCase()}_product.svg`}
                        alt={product.name}
                        width={140}
                        height={140}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          e.currentTarget.src = "/images/banner/headphone.svg";
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Product Details - Right Side */}
                  <Box sx={{ 
                    flex: '0 0 60%', 
                    p: { xs: 1.5, sm: 2, md: 2.5 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    background: '#E8E8FF'
                  }}>
                    {/* Content Section */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          color: '#1A1A1A',
                          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                          mb: { xs: 0.5, sm: 0.75, md: 1 },
                          fontFamily: 'Arial, sans-serif',
                          lineHeight: 1.2
                        }}
                      >
                        {product.name}
                      </Typography>

                      <Box sx={{ mb: { xs: 1, sm: 1.5, md: 2 } }}>
                        {product.features.map((feature, featureIndex) => (
                          <Box
                            key={featureIndex}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: { xs: 0.25, sm: 0.5, md: 0.5 },
                              color: '#000',
                              fontSize: '12px',
                              fontStyle: 'normal',
                              fontWeight: 500,
                              lineHeight: '20px'
                            }}
                          >
                            <Box
                              sx={{
                                width: { xs: 2, sm: 3, md: 3 },
                                height: { xs: 2, sm: 3, md: 3 },
                                borderRadius: '50%',
                                background: '#4A4A4A',
                                mr: { xs: 0.75, sm: 1, md: 1 },
                                flexShrink: 0
                              }}
                            />
                            {feature}
                          </Box>
                        ))}
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 1.5, md: 2 } }}>
                        <Box
                          sx={{
                            width: { xs: 16, sm: 18, md: 20 },
                            height: { xs: 16, sm: 18, md: 20 },
                            background: '#FFD700',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: { xs: 0.75, sm: 1, md: 1.25 }
                          }}
                        >
                          <Typography sx={{ 
                            fontSize: { xs: '0.4rem', sm: '0.5rem', md: '0.6rem' }, 
                            fontWeight: 800, 
                            color: '#6E6EFF' 
                          }}>
                            ⚡
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 0.75, md: 1 } }}>
                          <Typography sx={{ 
                            color: '#999', 
                            textDecoration: 'line-through', 
                            fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' } 
                          }}>
                            {product.originalPrice}
                          </Typography>
                          <Typography sx={{ 
                            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }, 
                            fontWeight: 800, 
                            color: '#1A1A1A', 
                            fontFamily: 'Arial, sans-serif' 
                          }}>
                            {product.currentPrice}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Button Container */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      mt: 'auto',
                      pt: 1
                    }}>
                      <Button
                        sx={{
                          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                          color: '#1A1A1A',
                          borderRadius: 3,
                          py: 1.25,
                          px: 2.5,
                          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                          fontWeight: 700,
                          textTransform: 'none',
                          width: '100%',
                          fontFamily: 'Arial, sans-serif',
                          minHeight: { xs: '36px', sm: '40px', md: '44px' },
                          boxShadow: '0 2px 6px rgba(255, 215, 0, 0.3)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 10px rgba(255, 215, 0, 0.5)'
                          }
                        }}
                      >
                        Redeem
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            ))}
          </Box>

          {/* Movie Banner Below Product Card */}
          <Box sx={{ py: 2 }}>
            <Card
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '248px'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '248px',
                  backgroundImage: 'url(/images/banner/movie_banner.svg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Overlay content if needed */}
              </Box>
            </Card>
          </Box>
          </>
        )}

      </Box>



      {/* Custom Bottom Navigation */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'white',
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
                  backgroundColor: 'rgba(110, 110, 255, 0.1)',
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
                  background: item.active ? '#6E6EFF' : 'transparent',
                  color: item.active ? 'white' : '#8E8E93',
                  mb: { xs: 0.25, sm: 0.5, md: 0.5 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: item.active ? '#5A5AFF' : 'rgba(110, 110, 255, 0.1)',
                    color: item.active ? 'white' : '#6E6EFF'
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
                  color: item.active ? '#6E6EFF' : '#8E8E93',
                  fontWeight: 600,
                  textAlign: 'center',
                  transition: 'color 0.3s ease'
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
