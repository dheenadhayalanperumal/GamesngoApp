'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, TextField, InputAdornment, Card, CardContent, Chip, Avatar, Badge, CircularProgress } from '@mui/material';
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
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import LoginPopup from '@/components/LoginPopup';
import { useAuth } from '@/contexts/AuthContext';

// API Types
interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  title: string;
  actualCoin: number;
  discountCoin: number;
  coverUrl: string | null;
  tagline?: string;
}

interface CategoryProductsResponse {
  category: {
    id: number;
    name: string;
    slug: string;
  };
  products: Product[];
}

interface TodayOffer {
  id: number;
  title: string;
  discountPercent: number;
  bannerUrl: string;
  product: Product;
}

interface Banner {
  offerId: number;
  title: string;
  url: string;
}

interface OffersApiResponse {
  categories: Category[];
  todayOffers: TodayOffer[];
  banners: Banner[];
}

export default function RedeemPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [activeCategory, setActiveCategory] = useState<number | 'Today'>('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // API data state
  const [categories, setCategories] = useState<Category[]>([]);
  const [todayOffers, setTodayOffers] = useState<TodayOffer[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Category products state
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [isLoadingCategoryProducts, setIsLoadingCategoryProducts] = useState(false);

  // Fetch offers data from API
  useEffect(() => {
    const fetchOffersData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/public/offers', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store', // Disable caching
        });
        const data = await response.json();
        
        console.log('=== Offers API Response ===');
        console.log('Response status:', response.status);
        console.log('Full data:', data);
        console.log('Categories:', data.categories);
        console.log('Today Offers:', data.todayOffers);
        console.log('Banners:', data.banners);
        
        if (response.ok) {
          // API returns data directly without status wrapper
          const categories = data.categories || [];
          const todayOffers = data.todayOffers || [];
          const banners = data.banners || [];
          
          setCategories(categories);
          setTodayOffers(todayOffers);
          setBanners(banners);
          
          console.log('=== State Updated ===');
          console.log('Categories count:', categories.length);
          console.log('Offers count:', todayOffers.length);
          console.log('Banners count:', banners.length);
          
          if (categories.length > 0) {
            console.log('First category:', categories[0]);
          }
          if (todayOffers.length > 0) {
            console.log('First offer:', todayOffers[0]);
          }
          if (banners.length > 0) {
            console.log('First banner:', banners[0]);
          }
        } else {
          console.error('Failed to fetch offers data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching offers data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffersData();
  }, []);

  const handleCategoryClick = async (categoryId: number | 'Today') => {
    setActiveCategory(categoryId);
    console.log('Category changed to:', categoryId);
    
    // Reset banner to first one when switching categories
    setCurrentBanner(0);
    
    // Clear category products if switching to "Today"
    if (categoryId === 'Today') {
      setCategoryProducts([]);
      return;
    }
    
    // Fetch products for the selected category
    try {
      setIsLoadingCategoryProducts(true);
      const response = await fetch(`/api/public/products/category/${categoryId}?limit=50`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });
      
      const data: CategoryProductsResponse = await response.json();
      console.log('Category Products Response:', data);
      
      if (response.ok && data.products) {
        setCategoryProducts(data.products);
        console.log('Category products loaded:', data.products.length);
      } else {
        console.error('Failed to fetch category products. Status:', response.status);
        setCategoryProducts([]);
      }
    } catch (error) {
      console.error('Error fetching category products:', error);
      setCategoryProducts([]);
    } finally {
      setIsLoadingCategoryProducts(false);
    }
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

  const handleRedeemClick = (productId?: number) => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      // Store productId in sessionStorage for after login
      if (productId) {
        sessionStorage.setItem('pendingProductId', productId.toString());
      }
    } else {
      if (productId) {
        router.push(`/saved-address?productId=${productId}`);
      } else {
        router.push('/saved-address');
      }
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    // Get pending productId from sessionStorage if exists
    const pendingProductId = sessionStorage.getItem('pendingProductId');
    if (pendingProductId) {
      sessionStorage.removeItem('pendingProductId');
      router.push(`/saved-address?productId=${pendingProductId}`);
    } else {
      router.push('/saved-address');
    }
  };

  // Auto-slider functionality for banners
  useEffect(() => {
    if (banners.length === 0) return;
    
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
    
     <Header 
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

      {/* Main Content */}
      <Box sx={{ 
        pt: { xs: '70px', sm: '80px', md: '90px' }, 
        pb: { xs: '100px', sm: '120px', md: '140px' },
        // px: { xs: 2, sm: 3, md: 4 }
      }}>
        {/* Loading State */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress size={60} sx={{ color: '#6E6EFF' }} />
          </Box>
        ) : (
          <>
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
          {/* Today Category - Always first */}
            <Box
            onClick={() => {
              void handleCategoryClick('Today');
            }}
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
                background: activeCategory === 'Today' ? '#6E6EFF' : 'white',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
              }}
            >
              <Today sx={{ fontSize: 40, color: activeCategory === 'Today' ? 'white' : '#6E6EFF' }} />
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
              Today
            </Typography>
            {activeCategory === 'Today' && (
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

          {/* API Categories */}
          {categories.map((category) => (
            <Box
              key={category.id}
              onClick={() => {
                void handleCategoryClick(category.id);
              }}
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
                  background: activeCategory === category.id ? '#6E6EFF' : 'white',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography sx={{ fontSize: 24, fontWeight: 600, color: activeCategory === category.id ? 'white' : '#6E6EFF' }}>
                  {category.name.charAt(0).toUpperCase()}
                </Typography>
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
                {category.name}
              </Typography>
              {activeCategory === category.id && (
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

        {/* Banner - Only show for Today category */}
        {activeCategory === 'Today' && (
          <Box sx={{ position: 'sticky', top: 0, zIndex: 100 }}>
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
                  minHeight: '160px',
                borderRadius: 2
              },
              '@media (min-width: 1920px)': {
                minHeight: '480px'
              }
            }}
          >
              {banners.length > 0 && (
            <Box
              sx={{
                width: '100%',
                    height: { xs: '180px', sm: '220px', md: '280px', lg: '280px', xl: '380px' },
                    backgroundImage: `url(${banners[currentBanner]?.url || '/images/banner/deals_banner.svg'})`,
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
                </Box>
              )}
          </Card>

          {/* Carousel Dots */}
            {banners.length > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            {banners.map((banner, index) => (
              <Box
                    key={banner.offerId}
                onClick={() => {
                  setCurrentBanner(index);
                      console.log('Switching to banner:', banner.title);
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
            )}
        </Box>
        )}

        {/* Products Display - Today's Offers or Category Products */}
        <Box sx={{ pt: 2 }}>
          {/* Loading state for category products */}
          {isLoadingCategoryProducts ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
              <CircularProgress size={40} sx={{ color: '#6E6EFF' }} />
            </Box>
          ) : (
            <>
              {/* Today's Offers */}
              {activeCategory === 'Today' && todayOffers.length > 0 ? (
                todayOffers.map((offer) => (
             <Card
               key={offer.id}
               onClick={() => handleProductClick(offer.product.id)}
               sx={{
                 borderRadius: 3,
                 boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                 overflow: 'hidden',
                 background: '#E8E8FF',
                 position: 'relative',
                 maxWidth: '100%',
                 minHeight: { xs: '200px', sm: '220px', md: '240px' },
                 mx: 'auto',
                 margin: 0,
                 mb: 2,
                 cursor: 'pointer',
                 transition: 'all 0.3s ease',
                 '&:hover': {
                   transform: 'translateY(-4px)',
                   boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                 }
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
                 {offer.discountPercent}% OFF
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
                        src={offer.product.coverUrl}
                        alt={offer.product.title}
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
                        {offer.product.title}
                      </Typography>

                      <Typography
                            sx={{
                          color: '#666',
                          fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                          mb: { xs: 1, sm: 1.5, md: 2 },
                          fontFamily: 'Arial, sans-serif'
                        }}
                      >
                        {offer.title}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 1.5, md: 2 } }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: { xs: 1, sm: 1.5 },
                            py: { xs: 0.5, sm: 0.75 },
                            borderRadius: 2,
                            background: 'rgba(255, 255, 255, 0.5)'
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                              fontWeight: 700,
                              color: '#21175B',
                              fontFamily: 'Arial, sans-serif'
                            }}
                          >
                            {offer.product.discountCoin}
                          </Typography>
                          <Image
                            src="/coin.png"
                            alt="Coin"
                            width={20}
                            height={20}
                            style={{ width: '20px', height: '20px' }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            ml: 1,
                            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                            color: '#999', 
                            textDecoration: 'line-through', 
                            fontFamily: 'Arial, sans-serif' 
                          }}
                        >
                          {offer.product.actualCoin}
                          </Typography>
                      </Box>
                    </Box>

                    {/* Redeem Button */}
                      <Button
                      variant="contained"
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRedeemClick(offer.product.id);
                      }}
                        sx={{
                        background: '#6E6EFF',
                        color: 'white',
                          fontWeight: 700,
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                        py: { xs: 1, sm: 1.25, md: 1.5 },
                        borderRadius: 2,
                          textTransform: 'none',
                          fontFamily: 'Arial, sans-serif',
                        boxShadow: '0 4px 12px rgba(110, 110, 255, 0.3)',
                          '&:hover': {
                          background: '#5555DD',
                          boxShadow: '0 6px 16px rgba(110, 110, 255, 0.4)'
                          }
                        }}
                      >
                      Redeem Now
                      </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
               ))
             ) : null}
              
              {/* Category Products - Grid Layout */}
              {activeCategory !== 'Today' && categoryProducts.length > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'space-between', sm: 'flex-start' }
                  }}
                >
                  {categoryProducts.map((product) => (
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
                      {/* Discount Badge (if discount available) */}
                      {product.actualCoin > product.discountCoin && (
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
                          {Math.round(((product.actualCoin - product.discountCoin) / product.actualCoin) * 100)}% OFF
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
                            background: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            minHeight: { xs: '180px', sm: '200px', md: '220px' },
                            p: 2
                          }}
                        >
                          <Image
                            src={product.coverUrl || '/images/banner/headphone.svg'}
                            alt={product.title}
                            width={120}
                            height={120}
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
                            {product.title}
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
                              {product.actualCoin}
                            </Typography>
                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A1A1A' }}>
                              {product.discountCoin}
                            </Typography>
                          </Box>

                          {/* Features from tagline (if available) */}
                          {product.tagline && (
                            <Box sx={{ mb: 1 }}>
                              {product.tagline.split(',').slice(0, 3).map((feature, index) => (
              <Typography
                                  key={index}
                sx={{
                                    fontSize: '0.8rem',
                                    color: '#4A4A4A',
                                    mb: 0.5,
                                    fontFamily: 'Arial, sans-serif'
                                  }}
                                >
                                  • {feature.trim()}
              </Typography>
                              ))}
            </Box>
                          )}

                          {/* Rating (if available - using a default or can be removed if not needed) */}
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                            <Star sx={{ color: '#FFD700', fontSize: '1rem', mr: 0.5 }} />
                            <Typography sx={{ fontSize: '0.8rem', color: '#4A4A4A' }}>
                              4.5
                            </Typography>
                          </Box>

                          {/* Redeem Button */}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRedeemClick(product.id);
                            }}
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
              ) : activeCategory !== 'Today' && !isLoadingCategoryProducts && categoryProducts.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                  <Typography sx={{ color: '#666', fontSize: '1rem' }}>
                    No products found in this category
                  </Typography>
      </Box>
              ) : null}
            </>
          )}
        </Box>
        </>
      )}
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
