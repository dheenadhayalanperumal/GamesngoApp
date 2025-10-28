"use client";

import React from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  Card,
  CardContent,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

interface VoucherClaimedPopupProps {
  open: boolean;
  onClose: () => void;
  couponData?: {
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
  } | null;
}

export default function VoucherClaimedPopup({ open, onClose, couponData }: VoucherClaimedPopupProps) {
  // Default coupon data if none provided
  const defaultCouponData = {
    id: 0,
    offerId: 0,
    voucherCode: "XDF21G",
    title: "Sample Offer",
    discountPercent: 10,
    shop: {
      name: "Nandhana Palace",
      logoUrl: "/images/banner/nadana.svg"
    },
    status: "Active",
    isRedeemed: false,
    isExpired: false,
    issuedAt: "2024-01-01 00:00:00",
    expiresAt: "2024-12-31 23:59:59"
  };

  const voucher = couponData || defaultCouponData;

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No expiry';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px', // Rounded corners from reference
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)', // Subtle shadow
          margin: '20px',
          maxWidth: '400px',
          width: '100%'
        }
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <Card sx={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: 'none',
          padding: 0
        }}>
          <CardContent sx={{ padding: '24px' }}>
            {/* Top Section - Coupon Details */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, marginBottom: 3 }}>
              {/* Left Section - Restaurant Logo */}
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
                      alt={voucher.shop?.name || 'Shop Logo'}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>

              {/* Right Section - Coupon Details */}
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
                    color: '#FFD700', // Yellow color for discount from reference
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
                    color: '#666666', // Dark gray text from reference
                    fontSize: '12px', // Font size from reference
                    fontWeight: 400,
                    lineHeight: 1.4
                  }}
                >
                  Expires: {formatDate(voucher.expiresAt)}
                </Typography>
              </Box>
            </Box>

            {/* Dashed Separator Line */}
            <Box sx={{
              borderTop: '2px dashed #E0E0E0',
              marginBottom: 3
            }} />

            {/* Success Message Section */}
            <Box sx={{ textAlign: 'center' }}>
              {/* Success Icon */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 2
              }}>
                <Box sx={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#4CAF50', // Green background from reference
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-5px',
                    left: '-5px',
                    right: '-5px',
                    bottom: '-5px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
                    zIndex: -1
                  }
                }}>
                  <CheckCircle 
                    sx={{ 
                      color: 'white',
                      fontSize: 48,
                      fontWeight: 'bold'
                    }} 
                  />
                </Box>
              </Box>

              {/* Success Title */}
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#4CAF50', // Green color from reference
                  fontSize: '20px', // Font size from reference
                  fontWeight: 'bold',
                  marginBottom: 2,
                  lineHeight: 1.3
                }}
              >
                Your Voucher Claimed Successfully!
              </Typography>

              {/* Success Message */}
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#333333', // Dark text from reference
                  fontSize: '16px', // Font size from reference
                  fontWeight: 400,
                  lineHeight: 1.5,
                  textAlign: 'center'
                }}
              >
                Congratulations! Your restaurant discount voucher has been successfully claimed !!!
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
