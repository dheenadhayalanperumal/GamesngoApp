'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
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
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/LoginPopup';
import HeaderWithBack from '@/components/HeaderWithBack';

interface SavedProduct {
  id: number;
  title: string;
  actualCoin: number;
  discountCoin: number;
  coverUrl: string | null;
  savedAt: string;
}

export default function SavedItemsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [savedItems, setSavedItems] = useState<SavedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());

  // Fetch saved products from API
  useEffect(() => {
    const fetchSavedProducts = async () => {
      if (!isLoggedIn) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/products/saved', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            setIsLoginOpen(true);
            setError('Please login to view saved items');
          } else {
            setError(data.message || 'Failed to fetch saved items');
          }
          setIsLoading(false);
          return;
        }

        if (data.status === 'success' && data.saved) {
          setSavedItems(data.saved);
        } else {
          setSavedItems([]);
        }
      } catch (err) {
        console.error('Error fetching saved products:', err);
        setError('Failed to fetch saved items. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedProducts();
  }, [isLoggedIn]);

  // Calculate discount percentage
  const calculateDiscount = (actualCoin: number, discountCoin: number): string => {
    if (actualCoin === 0) return '0% Off';
    const discount = ((actualCoin - discountCoin) / actualCoin) * 100;
    return `${Math.round(discount)}% Off`;
  };

  const handleBack = () => {
    router.back();
  };

  const handleRemoveItem = async (itemId: number) => {
    // Check if user is logged in
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }

    // Add to removing set to show loading state
    setRemovingIds(prev => new Set(prev).add(itemId));

    try {
      // Create FormData with productId
      const formData = new FormData();
      formData.append('productId', itemId.toString());

      const response = await fetch('/api/products/saved', {
        method: 'DELETE',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Remove item from list on success
        setSavedItems(savedItems.filter(item => item.id !== itemId));
      } else {
        // Handle errors
        if (response.status === 401) {
          setIsLoginOpen(true);
        } else {
          console.error('Failed to remove product:', data.message || 'Unknown error');
          setError(data.message || 'Failed to remove product');
          // Clear error after 3 seconds
          setTimeout(() => setError(null), 3000);
        }
      }
    } catch (err) {
      console.error('Error removing product:', err);
      setError('Failed to remove product. Please try again.');
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    } finally {
      // Remove from removing set
      setRemovingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleBuyNow = (itemId: number) => {
    // Navigate to product detail page
    router.push(`/redeem/product/${itemId}`);
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    // Refetch saved items after login
    window.location.reload();
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
        position: 'relative',
        margin:"0 -15px",
        width:"calc(100% + 30px)",
      }}
    >
      {/* Header */}
      <HeaderWithBack 
        title="Back" 
        backgroundColor="#3F51B5"
      />

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

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px' 
          }}>
            <CircularProgress size={60} sx={{ color: '#6E6EFF' }} />
          </Box>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Box sx={{ mb: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {/* Empty State */}
        {!isLoading && !error && savedItems.length === 0 && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            color: 'rgba(33, 23, 91, 0.50)'
          }}>
            <Typography sx={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              mb: 1,
              fontFamily: 'Arial, sans-serif'
            }}>
              No saved items yet
            </Typography>
            <Typography sx={{ 
              fontSize: '1rem',
              fontFamily: 'Arial, sans-serif'
            }}>
              Start saving products you like!
            </Typography>
          </Box>
        )}

        {/* Saved Items List */}
        {!isLoading && savedItems.length > 0 && (
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
                      src={item.coverUrl || '/images/banner/headphone.svg'}
                      alt={item.title}
                      width={60}
                      height={60}
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

                  {/* Product Details */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {/* Product Name */}
                    <Typography sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontWeight: 700,
                      color: '#333333',
                      mb: 1,
                      fontFamily: 'Arial, sans-serif',
                      lineHeight: 1.2
                    }}>
                      {item.title}
                    </Typography>

                    {/* Pricing */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {/* Coin Icon */}
                      <Image src="/coin.png" alt="Coin" width={20} height={20} />

                      {/* Original Price */}
                      <Typography sx={{ 
                        color: '#AAAAAA', 
                        textDecoration: 'line-through', 
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {item.actualCoin}
                      </Typography>

                      {/* Current Price */}
                      <Typography sx={{ 
                        fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' }, 
                        fontWeight: 700, 
                        color: '#333333',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {item.discountCoin}
                      </Typography>

                      {/* Discount */}
                      <Typography sx={{ 
                        color: '#FF0000',
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        fontWeight: 600,
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {calculateDiscount(item.actualCoin, item.discountCoin)}
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
                    disabled={removingIds.has(item.id)}
                    startIcon={
                      removingIds.has(item.id) ? (
                        <CircularProgress size={16} sx={{ color: '#4A47E0' }} />
                      ) : (
                        <Delete sx={{ fontSize: '1.2rem' }} />
                      )
                    }
                    sx={{
                      color: '#4A47E0',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      textTransform: 'none',
                      fontFamily: 'Arial, sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(74, 71, 224, 0.1)'
                      },
                      '&:disabled': {
                        color: '#4A47E0',
                        opacity: 0.6
                      }
                    }}
                  >
                    {removingIds.has(item.id) ? 'Removing...' : 'Remove'}
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

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </Box>
  );
}
