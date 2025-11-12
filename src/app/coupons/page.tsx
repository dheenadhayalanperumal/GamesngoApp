"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Pagination,
} from '@mui/material';
import { LocalOffer } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from "@/components/TabBar";
import QRCodePopup from "@/components/QRCodePopup";
import VoucherClaimedPopup from "@/components/VoucherClaimedPopup";
import HeaderWithBack from '@/components/HeaderWithBack';
import { useAuth } from '@/contexts/AuthContext';

export default function Coupons() {
  const router = useRouter();
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [qrPopupOpen, setQrPopupOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<{
    id: number;
    offerId: number;
    voucherCode: string;
    title: string;
    discountPercent?: number;
    shop?: {
      name: string;
      logoUrl?: string;
    };
    status: string;
    isRedeemed: boolean;
    isExpired: boolean;
    issuedAt: string;
    expiresAt?: string;
    redeemedAt?: string;
  } | null>(null);
  const [voucherClaimedOpen, setVoucherClaimedOpen] = useState(false);
  
  // API state
  const [vouchers, setVouchers] = useState<{
    id: number;
    offerId: number;
    voucherCode: string;
    title: string;
    discountPercent?: number;
    shop?: {
      name: string;
      logoUrl?: string;
    };
    status: string;
    isRedeemed: boolean;
    isExpired: boolean;
    issuedAt: string;
    expiresAt?: string;
    redeemedAt?: string;
  }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 0,
    hasNext: false
  });


  // API functions
  const fetchVouchers = async (filter: string = 'all', page: number = 1) => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Fetching vouchers with filter:', filter, 'page:', page);
      
      const response = await fetch(`/api/vendor/vouchers?filter=${filter}&page=${page}&perPage=10`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Vouchers response:', data);

      if (response.ok && data.status === 'success') {
        setVouchers(data.vouchers || []);
        setPagination(data.pagination || {
          page: 1,
          perPage: 10,
          total: 0,
          totalPages: 0,
          hasNext: false
        });
      } else {
        setError(data.message || 'Failed to fetch vouchers');
        setVouchers([]);
      }
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      setError('Network error. Please try again.');
      setVouchers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load vouchers when component mounts or tab changes
  useEffect(() => {
    if (isLoggedIn && !authLoading) {
      fetchVouchers(activeTab, 1);
    }
  }, [isLoggedIn, authLoading, activeTab]);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchVouchers(activeTab, page);
  };

  // Handle QR code click
  const handleQRClick = (voucher: {
    id: number;
    offerId: number;
    voucherCode: string;
    title: string;
    discountPercent?: number;
    shop?: {
      name: string;
      logoUrl?: string;
    };
    status: string;
    isRedeemed: boolean;
    isExpired: boolean;
    issuedAt: string;
    expiresAt?: string;
    redeemedAt?: string;
  }) => {
    setSelectedCoupon(voucher);
    setQrPopupOpen(true);
  };

  // Handle voucher claim
  const handleVoucherClaim = (voucher: {
    id: number;
    offerId: number;
    voucherCode: string;
    title: string;
    discountPercent?: number;
    shop?: {
      name: string;
      logoUrl?: string;
    };
    status: string;
    isRedeemed: boolean;
    isExpired: boolean;
    issuedAt: string;
    expiresAt?: string;
    redeemedAt?: string;
  }) => {
    setSelectedCoupon(voucher);
    setVoucherClaimedOpen(true);
  };

  // Get status color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return '#4CAF50'; // Green
      case 'Expired':
        return '#F44336'; // Red
      case 'Redeemed':
        return '#FF9800'; // Orange
      default:
        return '#666666';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No expiry';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress sx={{ color: '#4848DB' }} />
        <Typography variant="body2" color="text.secondary">
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  // Show login message if not logged in
  if (!isLoggedIn) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography variant="h5" color="text.secondary">
          Please log in to view your vouchers
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => router.push('/')}
          sx={{ backgroundColor: '#4848DB' }}
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
      {/* Header */}
      <HeaderWithBack 
        title="Back" 
        backgroundColor="#3F51B5"
      />

      {/* Blue Header Section with Title */}
      <Box sx={{ 
        backgroundColor: 'rgba(60, 60, 210, 0.60)',
        padding: '20px 20px 125px',
        color: 'white',
        textAlign: 'center',
        borderRadius: '0px 0px 40px 40px',
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#21175B',
            fontSize: '26px',
            fontWeight: 'bold',
            lineHeight: 1.2
          }}
        >
          Coupons
        </Typography>
      </Box>

      {/* Tab Navigation */}
      <Box sx={{ 
        backgroundColor: 'white',
        padding: '24px 14px',
        borderRadius: '15px 15px 0 0', // Rounded top corners
        marginTop: '-10px', // Overlap with yellow header
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        margin:'-110px 20px 0 20px',
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          marginBottom: 3, 
          justifyContent: 'center',
          borderBottom: '1px solid #E0E0E0',
          paddingBottom: 2,
          margin: '0 -14px',
          padding: '0 14px 16px 14px'
        }}>
          {/* All Tab */}
          <Button
            onClick={() => handleTabChange(null as unknown as React.SyntheticEvent, 'all')}
            sx={{
              backgroundColor: activeTab === 'all' ? '#3C3CD2' : 'white',
              color: activeTab === 'all' ? 'white' : '#333333',
              border: activeTab === 'all' ? 'none' : '1px solid #DDDDDD',
              borderRadius: '20px', // Pill shape
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: activeTab === 'all' ? 400 : 400,
              textTransform: 'none',
              minWidth: '70px',
              '&:hover': {
                backgroundColor: activeTab === 'all' ? '#3C3CD2' : '#f5f5f5'
              }
            }}
          >
            All
          </Button>

          {/* Active Tab */}
          <Button
            onClick={() => handleTabChange(null as unknown as React.SyntheticEvent, 'active')}
            sx={{
              backgroundColor: activeTab === 'active' ? '#3C3CD2' : 'white',
              color: activeTab === 'active' ? 'white' : '#333333',
              border: activeTab === 'active' ? 'none' : '1px solid #DDDDDD',
              borderRadius: '20px', // Pill shape
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: activeTab === 'active' ? 400 : 400,
              textTransform: 'none',
              minWidth: '60px',
              '&:hover': {
                backgroundColor: activeTab === 'active' ? '#3C3CD2' : '#f5f5f5'
              }
            }}
          >
            Active
          </Button>

          {/* Redeemed Tab */}
          <Button
            onClick={() => handleTabChange(null as unknown as React.SyntheticEvent, 'redeemed')}
            sx={{
              backgroundColor: activeTab === 'redeemed' ? '#3C3CD2' : 'white',
              color: activeTab === 'redeemed' ? 'white' : '#333333',
              border: activeTab === 'redeemed' ? 'none' : '1px solid #DDDDDD',
              borderRadius: '20px', // Pill shape
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: activeTab === 'redeemed' ? 400 : 400,
              textTransform: 'none',
              minWidth: '60px',
              '&:hover': {
                backgroundColor: activeTab === 'redeemed' ? '#3C3CD2' : '#f5f5f5'
              }
            }}
          >
            Redeem
          </Button>

          {/* Expired Tab */}
          <Button
            onClick={() => handleTabChange(null as unknown as React.SyntheticEvent, 'expired')}
            sx={{
              backgroundColor: activeTab === 'expired' ? '#3C3CD2' : 'white',
              color: activeTab === 'expired' ? 'white' : '#333333',
              border: activeTab === 'expired' ? 'none' : '1px solid #DDDDDD',
              borderRadius: '20px', // Pill shape
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: activeTab === 'expired' ? 400 : 400,
              textTransform: 'none',
              minWidth: '60px',
              '&:hover': {
                backgroundColor: activeTab === 'expired' ? '#3C3CD2' : '#f5f5f5'
              }
            }}
          >
            Expired
          </Button> 
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ 
        backgroundColor: 'white',
        minHeight: 'calc(100vh - 200px)'
      }}>
        {/* Error Message */}
        {error && (
          <Box sx={{ 
            backgroundColor: '#ffebee', 
            border: '1px solid #f44336',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: 3,
            textAlign: 'center'
          }}>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
            <Button 
              variant="outlined" 
              color="error" 
              size="small" 
              onClick={() => fetchVouchers(activeTab, pagination.page)}
              sx={{ marginTop: 1 }}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '200px',
            flexDirection: 'column',
            gap: 2
          }}>
            <CircularProgress sx={{ color: '#4848DB' }} />
            <Typography variant="body2" color="text.secondary">
              Loading vouchers...
            </Typography>
          </Box>
        )}

        {/* Empty State - Single Message */}
        {!isLoading && !error && vouchers.length === 0 && (
          <Box sx={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            margin: '20px'
          }}>
            <LocalOffer sx={{ fontSize: 48, color: '#ccc', marginBottom: 2 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#666666',
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: 1
              }}
            >
              {activeTab === 'all' ? 'No vouchers found' : `No ${activeTab} coupons`}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#999999',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              {activeTab === 'all' 
                ? "You don't have any vouchers yet." 
                : `Your ${activeTab} coupons will appear here`
              }
            </Typography>
          </Box>
        )}

        {/* Coupon Cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
          {!isLoading && !error && vouchers.map((voucher) => (
            <Card 
              key={voucher.id}
              sx={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #E0E0E0',
                padding: 0,
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: '-8px',
                  top: '20px',
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '50%',
                  zIndex: 1
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: '-8px',
                  bottom: '20px',
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '50%',
                  zIndex: 1
                }
              }}
            >
              {/* Left side cutouts */}
              <Box sx={{
                position: 'absolute',
                left: '-8px',
                top: '20px',
                width: '16px',
                height: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '50%',
                zIndex: 2
              }} />
              
              {/* Right side cutouts */}
              <Box sx={{
                position: 'absolute',
                right: '-8px',
                top: '20px',
                width: '16px',
                height: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '50%',
                zIndex: 2
              }} />
              <Box sx={{
                position: 'absolute',
                right: '-8px',
                bottom: '20px',
                width: '16px',
                height: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '50%',
                zIndex: 2
              }} />

              <CardContent sx={{ padding: '15px' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                  {/* Left Section - Logo */}
                  <Box sx={{
                    width: '110px',
                    height: '110px',
                    backgroundColor: '#000000',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    flexShrink: 0
                  }}>
                    <Box
                      component="img"
                      src={voucher.shop?.logoUrl || "/images/banner/nadana.svg"}
                      alt={voucher.shop?.name || 'Shop'}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>

                  {/* Right Section - Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#333333', // Dark gray text from reference
                        fontSize: '16px', // Font size from reference
                        fontWeight: 'bold',
                        marginBottom: 1,
                        lineHeight: 1.3
                      }}
                    >
                      {voucher.shop?.name || 'Unknown Shop'}...
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: getStatusColor(voucher.status),
                        fontSize: '14px', // Font size from reference
                        fontWeight: 'bold',
                        marginBottom: 1
                      }}
                    >
                      {voucher.status}
                    </Typography>

                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#333333', // Dark gray text from reference
                        fontSize: '24px', // Font size from reference
                        fontWeight: 700,
                        marginBottom: 1,
                        lineHeight: 1.2
                      }}
                    >
                      {voucher.discountPercent ? `${voucher.discountPercent}% Off` : 'Special Offer'}
                    </Typography>

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#9E9E9E', // Light gray text from reference
                        fontSize: '12px', // Font size from reference
                        fontWeight: 400,
                        lineHeight: 1.4
                      }}
                    >
                      Expires: {formatDate(voucher.expiresAt || '')}
                    </Typography>
                  </Box>
                </Box>

                {/* Show QR Section */}
                <Box sx={{
                  borderTop: '2px dashed #E0E0E0',
                  marginTop: '15px',
                  paddingTop: '10px',
                  textAlign: 'center'
                }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#3C3CD2', // Blue color from reference
                      fontSize: '16px', // Font size from reference
                      fontWeight: 500,
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                    onClick={() => handleQRClick(voucher)}
                  >
                    Show QR
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Pagination */}
        {!isLoading && !error && vouchers.length > 0 && pagination.totalPages > 1 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '20px 0',
            marginTop: 2
          }}>
            <Pagination
              count={pagination.totalPages}
              page={pagination.page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#4848DB',
                  '&.Mui-selected': {
                    backgroundColor: '#4848DB',
                    color: 'white'
                  }
                }
              }}
            />
          </Box>
        )}
      </Box>

      {/* Bottom Navigation Bar */}
      <TabBar />

      {/* QR Code Popup */}
      <QRCodePopup 
        open={qrPopupOpen}
        onClose={() => setQrPopupOpen(false)}
        onClaimVoucher={() => selectedCoupon && handleVoucherClaim(selectedCoupon)}
        couponData={selectedCoupon}
      />

      {/* Voucher Claimed Successfully Popup */}
      <VoucherClaimedPopup 
        open={voucherClaimedOpen}
        onClose={() => setVoucherClaimedOpen(false)}
        couponData={selectedCoupon}
      />
    </div>
  );
}