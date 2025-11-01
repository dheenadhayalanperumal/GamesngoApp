'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import { 
  Remove,
  Add
} from '@mui/icons-material';
import { useRouter, useSearchParams as useNextSearchParams } from 'next/navigation';
import Image from 'next/image';
import HeaderWithBack from '@/components/HeaderWithBack';
import TabBar from '@/components/TabBar';

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

interface QuoteResponse {
  status: string;
  quote: {
    product: {
      id: number;
      title: string;
      actualCoin: number;
      discountCoin: number;
    };
    qty: number;
    price: number;
    discount: number;
    payable: number;
    walletCoins: number;
    canProceed: boolean;
  };
}

interface ConfirmResponse {
  status: string;
  order?: {
    orderNo: string;
    customerProductId: number;
    deliveryId: number;
    status: string;
    payable: number;
  };
  message?: string;
  walletCoins?: number;
  required?: number;
}

export default function ItemsViewPage() {
  const router = useRouter();
  const searchParams = useNextSearchParams();
  const productId = searchParams.get('productId');
  const addressId = searchParams.get('addressId');

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [quote, setQuote] = useState<QuoteResponse['quote'] | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [confirmResult, setConfirmResult] = useState<ConfirmResponse | null>(null);

  // Fetch product details
  useEffect(() => {
    if (!productId) {
      setError('Product ID is required');
      setIsLoadingProduct(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setIsLoadingProduct(true);
        setError(null);
        const response = await fetch(`/api/public/products/${productId}`, {
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
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product details');
      } finally {
        setIsLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Fetch quote when product and quantity change
  useEffect(() => {
    if (!productId || !product || quantity < 1) return;

    const fetchQuote = async () => {
      try {
        setIsLoadingQuote(true);
        const response = await fetch('/api/purchase/quote', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            product_id: parseInt(productId),
            qty: quantity,
          }),
        });

        const data: QuoteResponse = await response.json();
        console.log('Quote Response:', data);

        if (response.ok && data.status === 'success') {
          setQuote(data.quote);
        } else {
          console.error('Failed to fetch quote:', data);
          if (response.status === 401) {
            setError('Please login to continue');
          } else {
            setError((data as any).message || 'Failed to get quote');
          }
        }
      } catch (err) {
        console.error('Error fetching quote:', err);
        setError('Failed to get quote');
      } finally {
        setIsLoadingQuote(false);
      }
    };

    fetchQuote();
  }, [productId, product, quantity]);

  const handleBack = () => {
    router.back();
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleRedeem = () => {
    if (!quote) {
      setError('Quote not available');
      return;
    }

    if (!quote.canProceed) {
      setError(`Insufficient wallet balance. You have ${quote.walletCoins} coins but need ${quote.payable} coins.`);
      return;
    }

    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleYes = async () => {
    if (!productId || !addressId || !quote) {
      setError('Missing required information');
      return;
    }

    setIsConfirming(true);
    setShowPopup(false);

    try {
      const response = await fetch('/api/purchase/confirm', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: parseInt(productId),
          address_id: parseInt(addressId),
          qty: quantity,
        }),
      });

      const data: ConfirmResponse = await response.json();
      console.log('Confirm Response:', data);

      if (response.ok && data.status === 'success') {
        setConfirmResult(data);
        setShowSuccessPopup(true);
      } else {
        if (response.status === 422 && data.message === 'Insufficient wallet balance') {
          setError(`Insufficient wallet balance. You have ${data.walletCoins || 0} coins but need ${data.required || quote.payable} coins.`);
        } else {
          setError(data.message || 'Failed to confirm purchase');
        }
        setIsConfirming(false);
      }
    } catch (err) {
      console.error('Error confirming purchase:', err);
      setError('Failed to confirm purchase. Please try again.');
      setIsConfirming(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    if (confirmResult?.order) {
      // Navigate to order details page
      router.push(`/order-details/${confirmResult.order.customerProductId}`);
    } else {
      router.push('/redeem');
    }
  };

  const handleNo = () => {
    setShowPopup(false);
  };

  // Get all images for product
  const getAllImages = (): string[] => {
    if (!product) return ['/images/banner/headphone.svg'];
    const images: string[] = [];
    if (product.coverUrl) {
      images.push(product.coverUrl);
    }
    if (product.gallery && product.gallery.length > 0) {
      images.push(...product.gallery);
    }
    if (images.length === 0) {
      return ['/images/banner/headphone.svg'];
    }
    return images;
  };

  // Parse description into features
  const getFeatures = (): string[] => {
    if (!product?.description) return [];
    return product.description.split('\n').filter(f => f.trim().length > 0);
  };

  // Calculate discount percentage
  const getDiscountPercent = (): number => {
    if (!quote || quote.product.actualCoin === 0) return 0;
    return Math.round(((quote.product.actualCoin - quote.price) / quote.product.actualCoin) * 100);
  };

  // Loading state
  if (isLoadingProduct) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#F5F5F5' }}>
        <CircularProgress size={60} sx={{ color: '#FFC107' }} />
      </Box>
    );
  }

  // Error state
  if (error && !product) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#F5F5F5', p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button onClick={() => router.back()} variant="contained">Go Back</Button>
      </Box>
    );
  }

  const images = product ? getAllImages() : [];
  const features = getFeatures();
  const discountPercent = quote ? getDiscountPercent() : 0;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#F5F5F5',
        position: 'relative'
      }}
    >
      {/* Header */}
    <HeaderWithBack/>

      {/* Main Content */}
      <Box sx={{ 
        pt: { xs: '70px', sm: '80px', md: '90px' }, 
        pb: { xs: '100px', sm: '120px', md: '140px' },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        {/* Title */}
        <Typography
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
            fontWeight: 600,
            color: '#616161',
            textAlign: 'center',
            mb: 3,
            fontFamily: 'Arial, sans-serif'
          }}
        >
          Items View
        </Typography>

        {/* Product Card */}
        {product ? (
          <Card
            sx={{
              borderRadius: 3,
              background: 'white',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              mb: 3
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                {/* Product Image */}
                <Box
                  sx={{
                    width: { xs: 80, sm: 100, md: 120 },
                    height: { xs: 80, sm: 100, md: 120 },
                    background: 'white',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #E0E0E0',
                    flexShrink: 0,
                    overflow: 'hidden'
                  }}
                >
                  <Image
                    src={images[0] || '/images/banner/headphone.svg'}
                    alt={product.title}
                    width={120}
                    height={120}
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
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontWeight: 700,
                      color: '#212121',
                      mb: 1,
                      fontFamily: 'Arial, sans-serif'
                    }}
                  >
                    {product.title}
                  </Typography>

                  {product.category && (
                    <Typography
                      sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        color: '#616161',
                        mb: 2,
                        fontFamily: 'Arial, sans-serif'
                      }}
                    >
                      {product.category.name}
                    </Typography>
                  )}

                  {/* Specifications/Features */}
                  {features.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      {features.slice(0, 4).map((feature, index) => (
                        <Typography
                          key={index}
                          component="div"
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                            color: '#616161',
                            mb: 0.5,
                            fontFamily: 'Arial, sans-serif'
                          }}
                        >
                          • {feature.trim()}
                        </Typography>
                      ))}
                    </Box>
                  )}

                {/* Quantity and Price */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Quantity Selector */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      onClick={() => handleQuantityChange(-1)}
                      disabled={isLoadingQuote || quantity <= 1}
                      sx={{
                        width: 32,
                        height: 32,
                        background: '#E0E0E0',
                        borderRadius: 1,
                        '&:hover': {
                          background: '#BDBDBD'
                        },
                        '&:disabled': {
                          background: '#F5F5F5',
                          color: '#BDBDBD'
                        }
                      }}
                    >
                      <Remove sx={{ fontSize: '1rem', color: '#616161' }} />
                    </IconButton>
                    
                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                        fontWeight: 600,
                        color: '#212121',
                        minWidth: 40,
                        textAlign: 'center',
                        fontFamily: 'Arial, sans-serif'
                      }}
                    >
                      {quantity}
                    </Typography>
                    
                    <IconButton
                      onClick={() => handleQuantityChange(1)}
                      disabled={isLoadingQuote}
                      sx={{
                        width: 32,
                        height: 32,
                        background: '#E0E0E0',
                        borderRadius: 1,
                        '&:hover': {
                          background: '#BDBDBD'
                        },
                        '&:disabled': {
                          background: '#F5F5F5',
                          color: '#BDBDBD'
                        }
                      }}
                    >
                      <Add sx={{ fontSize: '1rem', color: '#616161' }} />
                    </IconButton>
                  </Box>

                  {/* Price */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        background: '#FFC107',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: '#4A148C' }}>
                        ⚡
                      </Typography>
                    </Box>
                    {quote && (
                      <>
                        {quote.product.actualCoin > quote.price && (
                          <Typography sx={{ 
                            color: '#616161', 
                            textDecoration: 'line-through', 
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                            mr: 1
                          }}>
                            {quote.product.actualCoin}
                          </Typography>
                        )}
                        <Typography sx={{ 
                          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' }, 
                          fontWeight: 700, 
                          color: '#212121',
                          fontFamily: 'Arial, sans-serif'
                        }}>
                          {quote.price}
                        </Typography>
                        {discountPercent > 0 && (
                          <Typography sx={{ 
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                            color: '#F44336',
                            fontWeight: 600,
                            fontFamily: 'Arial, sans-serif'
                          }}>
                            {discountPercent}% Off
                          </Typography>
                        )}
                      </>
                    )}
                    {!quote && isLoadingQuote && (
                      <CircularProgress size={20} sx={{ color: '#616161' }} />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        ) : (
          <Alert severity="error">Product not found</Alert>
        )}

        {/* Order Details Card */}
        <Card
          sx={{
            borderRadius: 3,
            background: '#EDE7F6',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            mb: 3
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                fontWeight: 700,
                color: '#4A148C',
                mb: 2,
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Order Details
            </Typography>

            {isLoadingQuote ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress size={30} sx={{ color: '#4A148C' }} />
              </Box>
            ) : quote ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ 
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    color: '#616161',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    Price (per unit)
                  </Typography>
                  <Typography sx={{ 
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    color: '#616161',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {quote.price} Coins
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ 
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    color: '#616161',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    Quantity
                  </Typography>
                  <Typography sx={{ 
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    color: '#616161',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {quote.qty}
                  </Typography>
                </Box>

                {quote.discount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ 
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      color: '#616161',
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      Discount
                    </Typography>
                    <Typography sx={{ 
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      color: '#F44336',
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      -{quote.discount} Coins
                    </Typography>
                  </Box>
                )}

                <Box sx={{ 
                  height: 1, 
                  background: 'repeating-linear-gradient(to right, #BDBDBD 0px, #BDBDBD 4px, transparent 4px, transparent 8px)',
                  mb: 2 
                }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ 
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                    fontWeight: 600,
                    color: '#616161',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    Total
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        background: '#FFC107',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography sx={{ fontSize: '0.5rem', fontWeight: 800, color: '#4A148C' }}>
                        ⚡
                      </Typography>
                    </Box>
                    <Typography sx={{ 
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontWeight: 600,
                      color: '#616161',
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      {quote.payable} Coins
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography sx={{ 
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    color: '#616161',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    Wallet Balance
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        background: '#FFC107',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography sx={{ fontSize: '0.4rem', fontWeight: 800, color: '#4A148C' }}>
                        ⚡
                      </Typography>
                    </Box>
                    <Typography sx={{ 
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: quote.canProceed ? 600 : 700,
                      color: quote.canProceed ? '#616161' : '#F44336',
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      {quote.walletCoins} Coins
                    </Typography>
                  </Box>
                </Box>

                {!quote.canProceed && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Insufficient wallet balance. You need {quote.payable} coins but only have {quote.walletCoins} coins.
                  </Alert>
                )}
              </>
            ) : (
              <Alert severity="error">Failed to load quote. Please try again.</Alert>
            )}
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Redeem Button */}
        <Button
          onClick={handleRedeem}
          disabled={!quote || isLoadingQuote || isConfirming || !quote.canProceed}
          sx={{
            background: (!quote || !quote.canProceed) ? '#ccc' : '#FFC107',
            color: 'white',
            borderRadius: 3,
            py: 2,
            px: 4,
            fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
            fontWeight: 700,
            textTransform: 'none',
            width: '100%',
            fontFamily: 'Arial, sans-serif',
            boxShadow: (!quote || !quote.canProceed) ? 'none' : '0 4px 16px rgba(255, 193, 7, 0.4)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: (!quote || !quote.canProceed) ? '#ccc' : '#FFB300',
              transform: (!quote || !quote.canProceed) ? 'none' : 'translateY(-2px)',
              boxShadow: (!quote || !quote.canProceed) ? 'none' : '0 6px 20px rgba(255, 193, 7, 0.6)'
            },
            '&:disabled': {
              background: '#ccc',
              color: 'white'
            }
          }}
        >
          {isConfirming ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} sx={{ color: 'white' }} />
              Confirming...
            </Box>
          ) : isLoadingQuote ? (
            'Loading...'
          ) : !quote ? (
            'Loading Quote...'
          ) : !quote.canProceed ? (
            'Insufficient Coins'
          ) : (
            'Redeem'
          )}
        </Button>
      </Box>

      {/* Tab Bar */}
      <TabBar />

      {/* Popup Modal */}
      {showPopup && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2000,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3
          }}
          onClick={handlePopupClose}
        >
          <Card
            onClick={(e) => e.stopPropagation()}
            sx={{
              background: 'white',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              maxWidth: { xs: '90%', sm: '400px', md: '450px' },
              width: '100%',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              {/* Title */}
              <Typography
                sx={{
                  fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
                  fontWeight: 700,
                  color: '#4A148C',
                  mb: 3,
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Note !
              </Typography>

              {/* Message */}
              <Typography
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  color: '#616161',
                  mb: 4,
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.5
                }}
              >
                By clicking 'Yes' you are using coins from Wallet
              </Typography>

              {/* Buttons */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                {/* No Button */}
                <Button
                  onClick={handleNo}
                  sx={{
                    background: 'white',
                    color: '#4A148C',
                    border: '2px solid #4A148C',
                    borderRadius: 3,
                    py: 1.5,
                    px: 4,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                    fontWeight: 600,
                    textTransform: 'none',
                    fontFamily: 'Arial, sans-serif',
                    minWidth: { xs: '100px', sm: '120px', md: '140px' },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: '#4A148C',
                      color: 'white'
                    }
                  }}
                >
                  No
                </Button>

                {/* Yes Button */}
                <Button
                  onClick={handleYes}
                  sx={{
                    background: '#FFC107',
                    color: 'white',
                    borderRadius: 3,
                    py: 1.5,
                    px: 4,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                    fontWeight: 600,
                    textTransform: 'none',
                    fontFamily: 'Arial, sans-serif',
                    minWidth: { xs: '100px', sm: '120px', md: '140px' },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: '#FFB300',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  Yes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2000,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3
          }}
          onClick={handleSuccessClose}
        >
          <Card
            onClick={(e) => e.stopPropagation()}
            sx={{
              background: 'white',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              maxWidth: { xs: '90%', sm: '400px', md: '450px' },
              width: '100%',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              {/* Success Icon */}
              <Box
                sx={{
                  width: { xs: 80, sm: 100, md: 120 },
                  height: { xs: 80, sm: 100, md: 120 },
                  background: 'linear-gradient(135deg, #8BC34A 0%, #4CAF50 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '120%',
                    height: '120%',
                    background: 'linear-gradient(135deg, #8BC34A 0%, #4CAF50 100%)',
                    borderRadius: '50%',
                    zIndex: -1,
                    filter: 'blur(8px)',
                    opacity: 0.3
                  }
                }}
              >
                <Box
                  sx={{
                    width: { xs: 50, sm: 60, md: 70 },
                    height: { xs: 50, sm: 60, md: 70 },
                    background: '#4CAF50',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      color: 'white',
                      fontWeight: 800,
                      fontFamily: 'Arial, sans-serif'
                    }}
                  >
                    ✓
                  </Typography>
                </Box>
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
                  fontWeight: 700,
                  color: '#4CAF50',
                  mb: 3,
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Your Order Placed Successfully!
              </Typography>

              {/* Message */}
              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#616161',
                  mb: 4,
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.5
                }}
              >
                Your order has been placed successfully! Keep playing more games to earn exciting rewards, discounts, and vouchers
              </Typography>

              {/* Close Button */}
              <Button
                onClick={handleSuccessClose}
                sx={{
                  background: '#4CAF50',
                  color: 'white',
                  borderRadius: 3,
                  py: 1.5,
                  px: 4,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  fontWeight: 600,
                  textTransform: 'none',
                  fontFamily: 'Arial, sans-serif',
                  minWidth: { xs: '120px', sm: '140px', md: '160px' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: '#45A049',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}
