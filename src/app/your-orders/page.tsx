'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Fab, CircularProgress, Alert } from '@mui/material';
import { 
  ShoppingCart, 
  CheckCircle,
  RadioButtonUnchecked
} from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeaderWithBack from '@/components/HeaderWithBack';
import TabBar from '@/components/TabBar';

interface Product {
  id: number;
  title: string;
  coverUrl: string | null;
  actualCoin: number;
  discountCoin: number;
  unitPrice: number;
  qty: number;
}

interface Order {
  id: number;
  orderNo: string;
  status: string;
  createdAt: string;
  product: Product;
  total: number;
}

interface OrdersResponse {
  status: string;
  orders: Order[];
}

export default function YourOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/orders?limit=50', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store',
        });

        const data: OrdersResponse = await response.json();
        console.log('Orders API Response:', data);

        if (response.ok && data.status === 'success') {
          setOrders(data.orders || []);
        } else {
          if (response.status === 401) {
            setError('Please login to view orders');
          } else {
            setError(data.message || 'Failed to fetch orders');
          }
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Format date for display
  const formatDate = (dateString: string): string => {
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

  // Get delivery message based on status
  const getDeliveryMessage = (status: string, createdAt: string): string => {
    switch (status.toLowerCase()) {
      case 'processing':
        return `Order placed on ${formatDate(createdAt)}`;
      case 'shipped':
        return 'Expected Delivery soon';
      case 'delivered':
        return `Delivered on ${formatDate(createdAt)}`;
      default:
        return `Order placed on ${formatDate(createdAt)}`;
    }
  };

  const handleViewDetails = (orderIdOrNo: number | string) => {
    router.push(`/order-details/${orderIdOrNo}`);
  };

  const handleFabClick = () => {
    router.push('/redeem');
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
        background: '#ffffff',
        borderRadius: { xs: 2, sm: 3, md: 4 },
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
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
          marginBottom: '20px'
        }}>
          Your Orders
        </Typography>

        {/* Loading State */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress size={60} sx={{ color: '#3C3CD2' }} />
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        ) : orders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ color: '#666', fontSize: '1rem' }}>
              No orders found. Start redeeming products to see your orders here.
            </Typography>
          </Box>
        ) : (
          /* Orders List */
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '6px',
            padding: '12px',
            borderRadius: '10px',
            background: '#EEE'
          }}>
            {orders.map((order) => {
              const statusColor = getStatusColor(order.status);
              return (
            <Card
              key={order.id}
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
                      src={order.product.coverUrl || '/images/banner/headphone.svg'}
                      alt={order.product.title}
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
                      {order.product.title}
                    </Typography>

                    {/* Order Number */}
                    <Typography sx={{
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                      color: '#666666',
                      mb: 0.5,
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      Order #{order.orderNo}
                    </Typography>

                    {/* Quantity and Price */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography sx={{
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                        color: '#666666',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        Qty: {order.product.qty}
                      </Typography>
                      <Typography sx={{
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                        color: '#666666',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        •
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography sx={{
                          fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                          fontWeight: 600,
                          color: '#333333',
                          fontFamily: 'Arial, sans-serif'
                        }}>
                          {order.total}
                        </Typography>
                        <Typography sx={{ fontSize: '0.7rem', color: '#333333' }}>⚡</Typography>
                      </Box>
                    </Box>

                    {/* Order Status */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      {order.status === 'Processing' ? (
                        <RadioButtonUnchecked sx={{ 
                          fontSize: '1.2rem', 
                          color: statusColor 
                        }} />
                      ) : (
                        <CheckCircle sx={{ 
                          fontSize: '1.2rem', 
                          color: statusColor 
                        }} />
                      )}
                      <Typography sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        fontWeight: 700,
                        color: statusColor,
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {order.status}
                      </Typography>
                    </Box>

                    {/* Delivery Date/Message */}
                    <Typography sx={{
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                      color: '#AAAAAA',
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      {getDeliveryMessage(order.status, order.createdAt)}
                    </Typography>
                  </Box>
                </Box>

                {/* Dotted Divider */}
                <Box sx={{ 
                  height: 1, 
                  background: 'repeating-linear-gradient(to right, #e0e0e0 0px, #e0e0e0 4px, transparent 4px, transparent 8px)',
                  mb: 2 
                }} />

                {/* View Details Button */}
                <Box sx={{ 
                  textAlign: 'center',
                  borderTop: '1px solid rgba(0, 0, 0, 0.15)',
                  //background: rgba(0, 0, 0, 0.15);
                  pt: 2
                }}>
                  <Button
                    onClick={() => handleViewDetails(order.orderNo)}
                    sx={{
                      color: '#3C3CD2',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      textTransform: 'none',
                      fontFamily: 'Arial, sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(60, 60, 210, 0.1)'
                      }
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
            );
            })}
          </Box>
        )}
      </Box>

      {/* Floating Action Button */}
      <Fab
        onClick={handleFabClick}
        sx={{
          position: 'fixed',
          bottom: { xs: 80, sm: 90, md: 100 },
          right: { xs: 16, sm: 20, md: 24 },
          zIndex: 1001,
          background: '#3C3CD2',
          color: 'white',
          width: { xs: 56, sm: 64, md: 72 },
          height: { xs: 56, sm: 64, md: 72 },
          '&:hover': {
            background: '#2A2A9E'
          }
        }}
      >
        <ShoppingCart sx={{ 
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
        }} />
      </Fab>

      {/* Tab Bar */}
      <TabBar />
    </Box>
  );
}
