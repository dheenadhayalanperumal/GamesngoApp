"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from "@/components/TabBar";
import QRCodePopup from "@/components/QRCodePopup";
import VoucherClaimedPopup from "@/components/VoucherClaimedPopup";
import HeaderWithBack from '@/components/HeaderWithBack';

export default function Coupons() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  const [qrPopupOpen, setQrPopupOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<typeof coupons[0] | null>(null);
  const [voucherClaimedOpen, setVoucherClaimedOpen] = useState(false);

  // Sample coupon data
  const coupons = [
    {
      id: 1,
      restaurantName: "Nandhana Palace",
      discount: "10% Off",
      status: "Active",
      expiresDate: "12 Dec 11:59",
      type: "active",
      logo: "nandhana PALACE",
      couponCode: "XDF21G"
    },
    {
      id: 2,
      restaurantName: "Nandhana Palace",
      discount: "10% Off",
      status: "Experied",
      expiresDate: "12 Dec 11:59",
      type: "expired",
      logo: "nandhana PALACE",
      couponCode: "XDF21G"
    },
    {
      id: 3,
      restaurantName: "Nandhana Palace",
      discount: "10% Off",
      status: "Redeemed",
      expiresDate: "12 Dec 11:59",
      type: "redeemed",
      logo: "nandhana PALACE",
      couponCode: "XDF21G"
    },
    {
      id: 4,
      restaurantName: "Nandhana Palace",
      discount: "10% Off",
      status: "Active",
      expiresDate: "12 Dec 11:59",
      type: "active",
      logo: "nandhana PALACE",
      couponCode: "XDF21G"
    },
    {
      id: 5,
      restaurantName: "Nandhana Palace",
      discount: "10% Off",
      status: "Experied",
      expiresDate: "12 Dec 11:59",
      type: "expired",
      logo: "nandhana PALACE",
      couponCode: "XDF21G"
    },
    {
      id: 6,
      restaurantName: "Nandhana Palace",
      discount: "10% Off",
      status: "Redeemed",
      expiresDate: "12 Dec 11:59",
      type: "redeemed",
      logo: "nandhana PALACE",
      couponCode: "XDF21G"
    }
  ];

  // Filter coupons based on active tab
  const filteredCoupons = coupons.filter(coupon => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Active') return coupon.type === 'active';
    if (activeTab === 'Redeemed') return coupon.type === 'redeemed';
    if (activeTab === 'Expired') return coupon.type === 'expired';
    return true;
  });

  // Get status color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return '#4CAF50'; // Green
      case 'Experied':
        return '#F44336'; // Red
      case 'Redeemed':
        return '#FF9800'; // Orange
      default:
        return '#666666';
    }
  };

  // Handle Show QR click
  const handleShowQR = (coupon: typeof coupons[0]) => {
    setSelectedCoupon(coupon);
    setQrPopupOpen(true);
  };

  // Handle QR popup close
  const handleCloseQR = () => {
    setQrPopupOpen(false);
    setSelectedCoupon(null);
  };

  // Handle voucher claim
  const handleClaimVoucher = () => {
    setQrPopupOpen(false);
    setVoucherClaimedOpen(true);
  };

  // Handle voucher claimed popup close
  const handleCloseVoucherClaimed = () => {
    setVoucherClaimedOpen(false);
    setSelectedCoupon(null);
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
      {/* Dark Purple Header with Back Button */}
           <HeaderWithBack/>

  {/* Blue Header Section with Title */}
  <Box sx={{ 
        backgroundColor: 'rgba(60, 60, 210, 0.60)', // Yellow color from reference
        padding: '20px 20px 125px',
        color: 'white',
        textAlign: 'center',
        borderRadius: '0px 0px 40px 40px',
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#21175B', // Dark text on yellow background
            fontSize: '26px', // Font size from reference
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
            onClick={() => setActiveTab('All')}
            sx={{
              backgroundColor: activeTab === 'All' ? '#3C3CD2' : 'white',
              color: activeTab === 'All' ? 'white' : '#333333',
              border: activeTab === 'All' ? 'none' : '1px solid #DDDDDD',
              borderRadius: '20px', // Pill shape
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: activeTab === 'All' ? 400 : 400,
              textTransform: 'none',
              minWidth: '70px',
              '&:hover': {
                backgroundColor: activeTab === 'All' ? '#3C3CD2' : '#f5f5f5'
              }
            }}
          >
            All
          </Button>

          {/* Active Tab */}
          <Button
            onClick={() => setActiveTab('Active')}
            sx={{
              backgroundColor: activeTab === 'Active' ? '#3C3CD2' : 'white',
              color: activeTab === 'Active' ? 'white' : '#333333',
              border: activeTab === 'Active' ? 'none' : '1px solid #DDDDDD',
              borderRadius: '20px', // Pill shape
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: activeTab === 'Active' ? 400 : 400,
              textTransform: 'none',
              minWidth: '60px',
              '&:hover': {
                backgroundColor: activeTab === 'Active' ? '#3C3CD2' : '#f5f5f5'
              }
            }}
          >
            Active
          </Button>

          {/* Redeemed Tab */}
          <Button
            onClick={() => setActiveTab('Redeemed')}
            sx={{
              backgroundColor: activeTab === 'Redeemed' ? '#3C3CD2' : 'white',
              color: activeTab === 'Redeemed' ? 'white' : '#333333',
              border: activeTab === 'Redeemed' ? 'none' : '1px solid #DDDDDD',
              borderRadius: '20px', // Pill shape
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: activeTab === 'Redeemed' ? 400 : 400,
              textTransform: 'none',
              minWidth: '60px',
              '&:hover': {
                backgroundColor: activeTab === 'Redeemed' ? '#3C3CD2' : '#f5f5f5'
              }
            }}
          >
            Redeem
          </Button>

          {/* Expired Tab */}
          <Button
            onClick={() => setActiveTab('Expired')}
            sx={{
              backgroundColor: activeTab === 'Expired' ? '#3C3CD2' : 'white',
              color: activeTab === 'Expired' ? 'white' : '#333333',
              border: activeTab === 'Expired' ? 'none' : '1px solid #DDDDDD',
              borderRadius: '20px', // Pill shape
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: activeTab === 'Expired' ? 400 : 400,
              textTransform: 'none',
              minWidth: '60px',
              '&:hover': {
                backgroundColor: activeTab === 'Expired' ? '#3C3CD2' : '#f5f5f5'
              }
            }}
          >
            Expired
          </Button> 
        </Box>
      

      {/* Main Content Area - White Background */}
      <Box sx={{ 
        backgroundColor: 'white', // White background from reference
        minHeight: 'calc(100vh - 200px)'
      }}>
        {/* Coupon Cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
          {filteredCoupons.map((coupon) => (
            <Card 
              key={coupon.id}
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
              <Box sx={{
                position: 'absolute',
                left: '-8px',
                bottom: '20px',
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
                      src="/images/banner/nadana.svg"
                      alt="Nandhana Palace Logo"
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
                      {coupon.restaurantName}...
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: getStatusColor(coupon.status),
                        fontSize: '14px', // Font size from reference
                        fontWeight: 'bold',
                        marginBottom: 1
                      }}
                    >
                      {coupon.status}
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
                      {coupon.discount}
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
                      Expires: {coupon.expiresDate}
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
                    onClick={() => handleShowQR(coupon)}
                  >
                    Show QR
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        </Box>

        {/* Empty State */}
        {filteredCoupons.length === 0 && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '60px 20px',
            textAlign: 'center'
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#666666',
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: 1
              }}
            >
              No {activeTab.toLowerCase()} coupons
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#999999',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Your {activeTab.toLowerCase()} coupons will appear here
            </Typography>
          </Box>
        )}
      </Box>

      {/* Bottom Navigation Bar */}
      <TabBar />

      {/* QR Code Popup */}
      <QRCodePopup 
        open={qrPopupOpen}
        onClose={handleCloseQR}
        onClaimVoucher={handleClaimVoucher}
        couponData={selectedCoupon}
      />

      {/* Voucher Claimed Successfully Popup */}
      <VoucherClaimedPopup 
        open={voucherClaimedOpen}
        onClose={handleCloseVoucherClaimed}
        couponData={selectedCoupon}
      />
    </div>
  );
}
