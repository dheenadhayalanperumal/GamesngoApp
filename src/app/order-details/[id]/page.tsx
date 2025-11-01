'use client';

import React, { useState, useEffect, use } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { 
  CheckCircle
} from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeaderWithBack from '@/components/HeaderWithBack';
import TabBar from '@/components/TabBar';

interface Product {
  id: number;
  title: string;
  coverUrl: string | null;
  gallery: string[];
  actualCoin: number;
  discountCoin: number;
  description: string;
  tagline: string;
}

interface DeliveryAddress {
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  landmark: string | null;
}

interface Delivery {
  id: number;
  status: string;
  name: string;
  phone: string;
  address: DeliveryAddress;
}

interface TimelineItem {
  label: string;
  status: boolean;
  at: string | null;
}

interface OrderDetail {
  id: number;
  orderNo: string;
  status: string;
  createdAt: string;
  qty: number;
  unitPrice: number;
  total: number;
  product: Product;
  delivery: Delivery | null;
  timeline: TimelineItem[];
}

interface OrderDetailsResponse {
  status: string;
  order: OrderDetail;
}

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [orderDetails, setOrderDetails] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch order details from API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/orders/${resolvedParams.id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store',
        });

        const data: OrderDetailsResponse = await response.json();
        console.log('Order Details API Response:', data);

        if (response.ok && data.status === 'success') {
          setOrderDetails(data.order);
        } else {
          if (response.status === 401) {
            setError('Please login to view order details');
          } else if (response.status === 404) {
            setError('Order not found');
          } else {
            setError(data.message || 'Failed to fetch order details');
          }
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to fetch order details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [resolvedParams.id]);

  // Format date for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // Format date short (date only)
  const formatDateShort = (dateString: string | null): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'processing':
        return '#4CAF50';
      case 'shipped':
        return '#FF9800';
      case 'delivered':
        return '#3C3CD2';
      case 'cancelled':
        return '#F44336';
      default:
        return '#616161';
    }
  };

  // Parse description into features
  const getFeatures = (description: string): string[] => {
    if (!description) return [];
    return description.split('\n').filter(f => f.trim().length > 0);
  };

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
        <CircularProgress size={60} sx={{ color: '#3C3CD2' }} />
      </Box>
    );
  }

  // Error state
  if (error || !orderDetails) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error || 'Order not found'}</Alert>
      </Box>
    );
  }

  const statusColor = getStatusColor(orderDetails.status);
  const features = getFeatures(orderDetails.product.description);
  const allImages = [
    orderDetails.product.coverUrl,
    ...(orderDetails.product.gallery || [])
  ].filter(Boolean) as string[];

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
          zIndex: 1100
        }}
      >
        <HeaderWithBack 
          title="Back" 
          backgroundColor="#3C3CD2"
        />
      </Box>


       {/* Main Content */}
       <Box sx={{ 
         pt: { xs: '64px', sm: '64px', md: '64px' }, 
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
                  src={allImages[0] || '/images/banner/headphone.svg'}
                  alt={orderDetails.product.title}
                  width={100}
                  height={100}
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
                  mb: 0.5,
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.2
                }}>
                  {orderDetails.product.title}
                </Typography>

                {/* Specifications/Features */}
                {features.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    {features.slice(0, 3).map((feature, index) => (
                      <Typography
                        key={index}
                        component="div"
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
                        {feature.trim()}
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* Order Status */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: statusColor,
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
                    color: statusColor,
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {orderDetails.status}
                  </Typography>
                </Box>

                {/* Order Date */}
                <Typography sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  color: '#AAAAAA',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Order placed on {formatDateShort(orderDetails.createdAt)}
                </Typography>
              </Box>
            </Box>

            {/* Divider */}
            <Box sx={{ 
              height: 1, 
              background: '#e0e0e0', 
              mb: 2 
            }} />

            {/* Quantity Info */}
            <Box sx={{ mb: 2 }}>
              <Typography sx={{
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                color: '#666666',
                fontFamily: 'Arial, sans-serif',
                mb: 0.5
              }}>
                Quantity: {orderDetails.qty} × {orderDetails.unitPrice} coins
              </Typography>
            </Box>

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
                  {orderDetails.orderNo}
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
                  {formatDateShort(orderDetails.createdAt)}
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
                  {orderDetails.product.actualCoin > orderDetails.unitPrice && (
                    <Typography sx={{ 
                      color: '#AAAAAA', 
                      textDecoration: 'line-through', 
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      {orderDetails.product.actualCoin}
                    </Typography>
                  )}
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
                    {orderDetails.total}
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

            {/* Delivery Address Section */}
            {orderDetails.delivery && (
              <Box sx={{ mb: 3 }}>
                <Typography sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  fontWeight: 700,
                  color: '#333333',
                  mb: 2,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Delivery Address
                </Typography>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#666666',
                  mb: 0.5,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {orderDetails.delivery.name}
                </Typography>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#666666',
                  mb: 0.5,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {orderDetails.delivery.phone}
                </Typography>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#666666',
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.5
                }}>
                  {orderDetails.delivery.address.line1}
                  {orderDetails.delivery.address.line2 && `, ${orderDetails.delivery.address.line2}`}
                  {`, ${orderDetails.delivery.address.city}, ${orderDetails.delivery.address.state} ${orderDetails.delivery.address.pincode}`}
                  {orderDetails.delivery.address.landmark && `, ${orderDetails.delivery.address.landmark}`}
                </Typography>
              </Box>
            )}

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
                  background: orderDetails.timeline.some(item => item.status) ? '#4CAF50' : '#E0E0E0',
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
                      background: item.status ? '#4CAF50' : 'white',
                      border: `2px solid ${item.status ? '#4CAF50' : '#AAAAAA'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      flexShrink: 0
                    }}
                  >
                    {item.status && (
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
                      color: item.status ? '#333333' : '#AAAAAA',
                      fontFamily: 'Arial, sans-serif',
                      mb: 0.5
                    }}>
                      {item.label}
                    </Typography>
                    {item.at && (
                      <Typography sx={{
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        color: '#AAAAAA',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {formatDate(item.at)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>

          </CardContent>
        </Card>
      </Box>

      {/* Tab Bar */}
      <TabBar />
    </Box>
  );
}
