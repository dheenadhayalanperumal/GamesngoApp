'use client';

import React, { useState, useEffect, use } from 'react';
import { Box, Typography, Button, IconButton, Card, CardContent, CircularProgress, Alert } from '@mui/material';
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
import TabBar from '@/components/TabBar';
import HeaderWithBack from '@/components/HeaderWithBack';
import LoginPopup from '@/components/LoginPopup';
import { useAuth } from '@/contexts/AuthContext';

interface Product {
  id: number;
  title: string;
  actualCoin: number;
  discountCoin: number;
  coverUrl: string | null;
  gallery: string[];
  description: string;
  tagline: string;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Unwrap params using React.use()
  const resolvedParams = use(params);

  // Fetch product details from API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/public/products/${resolvedParams.id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
        });

        const data = await response.json();
        console.log('Product Details Response:', data);

        if (!response.ok) {
          setError(data.message || 'Failed to fetch product details');
          setIsLoading(false);
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [resolvedParams.id]);

  // Parse description into features array (split by newline)
  const getFeatures = (): string[] => {
    if (!product?.description) return [];
    return product.description.split('\n').filter(f => f.trim().length > 0);
  };

  // Get all images (coverUrl + gallery)
  const getAllImages = (): string[] => {
    if (!product) return [];
    const images: string[] = [];
    if (product.coverUrl) {
      images.push(product.coverUrl);
    }
    if (product.gallery && product.gallery.length > 0) {
      images.push(...product.gallery);
    }
    // Fallback if no images
    if (images.length === 0) {
      return ['/images/banner/headphone.svg'];
    }
    return images;
  };


  const handleRedeem = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    } else {
      // Pass product ID as URL param
      router.push(`/saved-address?productId=${resolvedParams.id}`);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    router.push(`/saved-address?productId=${resolvedParams.id}`);
  };

  const toggleBookmark = async () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }

    // Store previous state to revert on error
    const previousState = isBookmarked;

    // Don't toggle state immediately - wait for API response
    try {
      // Create FormData with productId
      const formData = new FormData();
      formData.append('productId', resolvedParams.id);

      const response = await fetch('/api/products/saved', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Update bookmark state based on API response
        // API is idempotent, so if already saved, it returns saved: true
        setIsBookmarked(data.saved || true);
      } else {
        // Handle errors
        if (response.status === 401) {
          setIsLoginOpen(true);
          // Revert to previous state on auth error
          setIsBookmarked(previousState);
        } else {
          console.error('Failed to save product:', data.message || 'Unknown error');
          // Revert to previous state on error
          setIsBookmarked(previousState);
        }
      }
    } catch (err) {
      console.error('Error saving product:', err);
      // Revert to previous state on error
      setIsBookmarked(previousState);
    }
  };

  const toggleFeatures = () => {
    setShowAllFeatures(!showAllFeatures);
  };

  const handleMenuClick = () => {
    router.push('/menu');
  };

  const features = getFeatures();
  const images = getAllImages();

  // Loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent'
        }}
      >
        <CircularProgress size={60} sx={{ color: '#6E6EFF' }} />
      </Box>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          p: 3
        }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Product not found'}
        </Alert>
        <Button onClick={() => router.back()} variant="contained">
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: 'transparent'
      }}
    >
      {/* Header with Back */}
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
        pt: { xs: '70px', sm: '80px', md: '90px' }, 
        pb: { xs: '100px', sm: '120px', md: '140px' },
        backgroundColor: 'white',
        margin:"0 -15px",
        width:"calc(100% + 30px)",
        // px: '15px',
      }}>
        {/* Search Bar */}
        <Box sx={{ py: 2, px: { xs: 2, sm: 3, md: 4 } }}>
          <Box sx={{ display: 'flex',
           alignItems: 'center', gap: 2 }}>
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
                backgroundColor: 'transparent',
                border: '1px solid rgba(0, 0, 0, 0.20)',
                borderRadius: 2,
                width: 40,
                height: 40,
                minWidth: 45,
                fontSize: '2rem',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Menu sx={{ color: '#504070', fontSize: '2rem' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Product Image Section */}
        <Box sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
          <Card
            sx={{
             // borderRadius: 3,
             display: 'flex',
              background: 'white',
              boxShadow: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
              flexDirection: 'column',
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
                // background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: 'white',
                height: '360px',
              }}
            >
              <Image
                src={images[selectedImage]}
                alt={product.title}
                width={200}
                height={200}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.currentTarget.src = '/images/banner/headphone.svg';
                }}
              />
            </Box>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  p: 2,
                  background: 'transparent',
                  overflowX: 'auto',
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none'
                }}
              >
                {images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      border: selectedImage === index ? '2px solid #6E6EFF' : '2px solid transparent',
                      background: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      flexShrink: 0
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
                      onError={(e) => {
                        e.currentTarget.src = '/images/banner/headphone.svg';
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* Product Information */}
            <CardContent sx={{ 
              p: { xs: 2.5, sm: 3, md: 3.5 },
              background: 'transparent',
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
                {product.title}
              </Typography>

              {/* Rating - Default to 4.5 if not available */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1.5, sm: 2, md: 2.5 } }}>
                <Star sx={{ color: '#FFD700', fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' }, mr: 0.75 }} />
                <Typography sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, 
                  color: '#21175B',
                  fontWeight: 600,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  4.5
                </Typography>
              </Box>

              {/* Price */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 2.5, md: 3 } }}>
              <Image src="/coin.png" alt="Coin" width={20} height={20} />
                <Typography sx={{ 
                  color: '#999', 
                  textDecoration: 'line-through', 
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }, 
                  mr: { xs: 1.25, sm: 1.5, md: 1.75 },
                  fontWeight: 500
                }}>
                  {product.actualCoin}
                </Typography>
                <Typography sx={{ 
                  fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' }, 
                  fontWeight: 800, 
                  color: '#21175B',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {product.discountCoin}
                </Typography>
              </Box>

              {/* Features */}
              {features.length > 0 && (
                <Box sx={{ mb: { xs: 2.5, sm: 3, md: 3.5 }, flex: 1 }}>
                  {(showAllFeatures ? features : features.slice(0, 4)).map((feature, index) => (
                    <Typography
                      key={index}
                      component="div"
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
                      {feature.trim()}
                    </Typography>
                  ))}
                  
                  {features.length > 4 && (
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
              )}

              {/* Redeem Button */}
              <Button
                onClick={handleRedeem}
                sx={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: 'white',
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

      {/* Tab Bar */}
      <TabBar />

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </Box>
  );
}
