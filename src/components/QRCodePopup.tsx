"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface QRCodePopupProps {
  open: boolean;
  onClose: () => void;
  onClaimVoucher?: () => void;
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

export default function QRCodePopup({ open, onClose, onClaimVoucher, couponData }: QRCodePopupProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Generate QR code when coupon data changes
  useEffect(() => {
    if (couponData?.voucherCode) {
      // Dynamically import QRCode to avoid SSR issues
      import('qrcode').then((QRCodeModule) => {
        const QRCode = QRCodeModule.default || QRCodeModule;
        QRCode.toDataURL(couponData.voucherCode, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })
        .then((url) => {
          setQrCodeDataUrl(url);
        })
        .catch((err) => {
          console.error('Error generating QR code:', err);
        });
      }).catch((err) => {
        console.error('Error loading QRCode library:', err);
      });
    } else {
      // Clear QR code if no voucher code
      setQrCodeDataUrl('');
    }
  }, [couponData]);

  // Don't render if no coupon data provided
  if (!couponData) {
    return null;
  }

  const voucher = couponData;

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
      slotProps={{
        paper: {
          sx: {
            borderRadius: '12px', // Rounded corners from reference
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)', // Subtle shadow
            margin: '20px',
            maxWidth: '400px',
            width: '100%'
          }
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
          <CardContent sx={{ padding: '16px' }}>
            {/* Close Button */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              marginBottom: 1
            }}>
              <IconButton
                onClick={onClose}
                sx={{
                  color: '#666666',
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <Close sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>

            {/* Top Section - Restaurant Logo and Details */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, marginBottom: 3 }}>
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
                    color: '#FF9800', // Orange color for discount from reference
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

            {/* Middle Section - QR Code */}
            <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#333333', // Dark text from reference
                  fontSize: '18px', // Font size from reference
                  fontWeight: 'bold',
                  marginBottom: 1,
                  lineHeight: 1.3
                }}
              >
                QR Code
              </Typography>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#666666', // Dark gray text from reference
                  fontSize: '14px', // Font size from reference
                  fontWeight: 400,
                  marginBottom: 2,
                  lineHeight: 1.4
                }}
              >
                Scan the QR code to claim your coupon
              </Typography>

              {/* QR Code Image */}
              <Box sx={{
                width: '200px',
                height: '200px',
                borderRadius: '8px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5',
                border: '2px solid #e0e0e0'
              }}>
                {qrCodeDataUrl ? (
                  <Box
                    component="img"
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Generating QR...
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Bottom Section - Coupon Code and Claim Button */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#333333', // Dark text from reference
                  fontSize: '16px', // Font size from reference
                  fontWeight: 400,
                  marginBottom: 1,
                  lineHeight: 1.4
                }}
              >
                Voucher Code: {voucher.voucherCode}
              </Typography>
              
              {/* <Typography 
                variant="h6" 
                sx={{ 
                  color: '#333333', // Dark text from reference
                  fontSize: '18px', // Font size from reference
                  fontWeight: 'bold',
                  lineHeight: 1.3,
                  letterSpacing: '2px', // Spacing for code readability
                  marginBottom: 3
                }}
              >
               
              </Typography> */}

              {/* Claim Voucher Button */}
              {onClaimVoucher && (
                <Box sx={{
                  backgroundColor: '#4CAF50', // Green background from reference
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-block',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#45a049',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                  }
                }}
                onClick={onClaimVoucher}
                >
                  Claim Voucher
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
