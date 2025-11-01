'use client';

import React, { useState, use } from 'react';
import { Box, Typography, Button, IconButton, Card, CardContent } from '@mui/material';
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
  Star,
  BookmarkBorder,
  Bookmark,
  ExpandMore,
} from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  // Unwrap params using React.use()
  const resolvedParams = use(params);

  // Sample product data based on the reference image
  const product = {
    id: params.id,
    name: 'Zebronics Mouse Z-300 Wireless Technology',
    rating: 4.9,
    originalPrice: 500,
    currentPrice: 250,
    features: [
      'Wireless technology',
      'Ai Noise Cancellation',
      '40 Hours Playback',
      '20 Mins Charging Time',
      'Ergonomic Design',
      'High Precision Sensor',
      'Long Battery Life',
      'Plug & Play'
    ],
    images: [
      '/images/banner/mouse_product.svg',
      '/images/banner/mouse_product.svg',
      '/images/banner/mouse_product.svg',
      '/images/banner/mouse_product.svg'
    ]
  };


  const handleRedeem = () => {
    // Navigate to saved-address page
    router.push('/saved-address');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const toggleFeatures = () => {
    setShowAllFeatures(!showAllFeatures);
  };

  const handleMenuClick = () => {
    router.push('/menu');
  };

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
        pb: { xs: '100px', sm: '120px', md: '140px' }
      }}>
        {/* Search Bar */}
        <Box sx={{ py: 2, px: { xs: 2, sm: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Search Bar */}
            <Box
              sx={{
                flex: 1,
                position: 'relative',
                background: 'white',
                borderRadius: '10px',
                border: '1px solid rgba(0, 0, 0, 0.20)',
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1
              }}
            >
              <Typography sx={{ 
                color: 'rgba(33, 23, 91, 0.50)',
                fontSize: '1rem',
                fontWeight: 400,
                flex: 1
              }}>
                Search Anything
              </Typography>
              <Search sx={{ 
                color: 'rgba(33, 23, 91, 0.60)', 
                width: '32px',
                height: '32px'
              }} />
            </Box>

            {/* Hamburger Menu */}
            <IconButton
              onClick={handleMenuClick}
              sx={{
                backgroundColor: 'white',
                border: '1px solid rgba(0, 0, 0, 0.20)',
                borderRadius: 2,
                width: 45,
                height: 45,
                minWidth: 45,
                fontSize: '2rem',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Menu sx={{ color: '#504070', fontSize: '3rem' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Product Image Section */}
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Card
            sx={{
             // borderRadius: 3,
              background: 'white',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Bookmark Icon */}
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 2
              }}
            >
              <IconButton onClick={toggleBookmark}>
                {isBookmarked ? (
                  <Bookmark sx={{ color: '#6E6EFF', fontSize: '1.5rem' }} />
                ) : (
                  <BookmarkBorder sx={{ color: '#6E6EFF', fontSize: '1.5rem' }} />
                )}
              </IconButton>
            </Box>

            {/* Main Product Image */}
            <Box
              sx={{
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={200}
                height={200}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </Box>

            {/* Thumbnail Images */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                p: 2,
                background: '#f8f9fa'
              }}
            >
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    border: selectedImage === index ? '2px solid #6E6EFF' : '2px solid transparent',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                >
                  <Image
                    src={image}
                    alt={`Product view ${index + 1}`}
                    width={50}
                    height={50}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              ))}
        </Box>

            {/* Product Information */}
            <CardContent sx={{ 
              p: { xs: 2.5, sm: 3, md: 3.5 },
              background: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {/* Product Name */}
              <Typography
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                  fontWeight: 800,
                  color: '#21175B',
                  mb: { xs: 1.5, sm: 2, md: 2.5 },
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.2
                }}
              >
                {product.name}
              </Typography>

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1.5, sm: 2, md: 2.5 } }}>
                <Star sx={{ color: '#FFD700', fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' }, mr: 0.75 }} />
                <Typography sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, 
                  color: '#21175B',
                  fontWeight: 600,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {product.rating}
                </Typography>
              </Box>

              {/* Price */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 2.5, md: 3 } }}>
                <Box
                  sx={{
                    width: { xs: 24, sm: 26, md: 28 },
                    height: { xs: 24, sm: 26, md: 28 },
                    background: '#FFD700',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: { xs: 1.25, sm: 1.5, md: 1.75 }
                  }}
                >
                  <Typography sx={{ 
                    fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' }, 
                    fontWeight: 800, 
                    color: '#6E6EFF' 
                  }}>
                    ⚡
                  </Typography>
                </Box>
                <Typography sx={{ 
                  color: '#999', 
                  textDecoration: 'line-through', 
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }, 
                  mr: { xs: 1.25, sm: 1.5, md: 1.75 },
                  fontWeight: 500
                }}>
                  {product.originalPrice}
                </Typography>
                <Typography sx={{ 
                  fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' }, 
                  fontWeight: 800, 
                  color: '#21175B',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {product.currentPrice}
                </Typography>
              </Box>

              {/* Features */}
              <Box sx={{ mb: { xs: 2.5, sm: 3, md: 3.5 }, flex: 1 }}>
                {(showAllFeatures ? product.features : product.features.slice(0, 4)).map((feature, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                      color: '#4A4A4A',
                      mb: { xs: 0.75, sm: 1, md: 1.25 },
                      fontFamily: 'Arial, sans-serif',
                      fontWeight: 500,
                      lineHeight: 1.4,
                      display: 'flex',
                      alignItems: 'flex-start'
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 3, sm: 4, md: 4 },
                        height: { xs: 3, sm: 4, md: 4 },
                        borderRadius: '50%',
                        background: '#4A4A4A',
                        mr: { xs: 1, sm: 1.25, md: 1.5 },
                        mt: { xs: 0.5, sm: 0.6, md: 0.7 },
                        flexShrink: 0
                      }}
                    />
                    {feature}
                  </Typography>
                ))}
                
                {product.features.length > 4 && (
                  <Box
                    onClick={toggleFeatures}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      color: '#6E6EFF',
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                      fontWeight: 600,
                      mt: { xs: 1, sm: 1.25, md: 1.5 }
                    }}
                  >
                    <ExpandMore sx={{ 
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      transform: showAllFeatures ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      mr: 0.5
                    }} />
                    {showAllFeatures ? 'Show Less' : 'Show More'}
                  </Box>
                )}
              </Box>

              {/* Redeem Button */}
              <Button
                onClick={handleRedeem}
                sx={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#21175B',
                  borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
                  py: { xs: 1.5, sm: 1.75, md: 2 },
                  px: { xs: 2.5, sm: 3, md: 3.5 },
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  fontWeight: 800,
                  textTransform: 'none',
                  width: '100%',
                  fontFamily: 'Arial, sans-serif',
                  boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)',
                  minHeight: { xs: '48px', sm: '52px', md: '56px' },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(255, 215, 0, 0.6)'
                  }
                }}
              >
                Redeem
              </Button>
            </CardContent>
          </Card>
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
