'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Chip, CircularProgress, Alert } from '@mui/material';
import { 
  Home
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import HeaderWithBack from '@/components/HeaderWithBack';
import './page.css';

interface Address {
  id: number;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  pincode: string;
  landmark?: string | null;
  isDefault: boolean;
}

export default function SavedAddressPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch addresses from API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/address', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store',
        });

        const data = await response.json();
        console.log('Addresses API Response:', data);

        if (response.ok && data.status === 'success') {
          setAddresses(data.addresses || []);
        } else {
          if (response.status === 401) {
            setError('Please login to view addresses');
          } else {
            setError(data.message || 'Failed to fetch addresses');
          }
        }
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setError('Failed to fetch addresses. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddAddress = () => {
    router.push('/add-address');
  };

  const handleEditAddress = (addressId: number) => {
    console.log('Edit address clicked:', addressId);
    // Handle edit address logic
  };

  const handleAddressClick = (addressId: number) => {
    // Get productId from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    
    if (productId) {
      // Navigate to items view page with product and address IDs
      router.push(`/items-view?productId=${productId}&addressId=${addressId}`);
    } else {
      console.error('Product ID not found in URL');
      // Fallback - navigate without productId (shouldn't happen in normal flow)
      router.push(`/items-view?addressId=${addressId}`);
    }
  };

  const handleRemoveAddress = (addressId: number) => {
    console.log('Remove address clicked:', addressId);
    // Handle remove address logic
  };

  // Format address for display
  const formatAddress = (address: Address): string => {
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.pincode
    ].filter(Boolean);
    return parts.join(' ');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#F5F5F5',
        position: 'relative',
        marginLeft: '-15px',
        marginRight: '-15px',
        width: 'calc(100% + 30px)',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: '-15px',
          right: '-15px',
          width: 'calc(100% + 30px)',
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
        pt: { xs: '100px', sm: '100px', md: '100px' }, 
        pb: { xs: '20px', sm: '30px', md: '40px' },
        px: { xs: 2, sm: 3, md: 4 },
     
      }}>
        {/* Add Address Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mb: 4,
          cursor: 'pointer',
          transition: 'opacity 0.3s ease',
          '&:hover': {
            opacity: 0.8
          }
        }}
        onClick={handleAddAddress}
        >
          <Home sx={{ 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            color: '#3F51B5',
            mr: 2
          }} />
          <Typography sx={{
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
            fontWeight: 700,
            color: '#3F51B5',
            fontFamily: 'Arial, sans-serif'
          }}>
            Add Address
          </Typography>
        </Box>

        {/* Loading State */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress size={60} sx={{ color: '#3F51B5' }} />
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        ) : (
          <>
            {/* Saved Addresses */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {addresses.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography sx={{ color: '#666', fontSize: '1rem' }}>
                    No addresses found. Please add an address.
                  </Typography>
                </Box>
              ) : (
                addresses.map((address) => (
            <Card
              key={address.id}
              onClick={() => handleAddressClick(address.id)}
              sx={{
                borderRadius: 3,
                background: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Home Tag */}
                {address.isDefault && (
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label="Home"
                      sx={{
                        background: '#E0E0E0',
                        color: '#333333',
                        fontWeight: 600,
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        fontFamily: 'Arial, sans-serif',
                        height: { xs: 28, sm: 32, md: 36 },
                        '& .MuiChip-label': {
                          px: 2
                        }
                      }}
                    />
                  </Box>
                )}

                {/* Name */}
                <Typography sx={{
                  fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                  fontWeight: 700,
                  color: '#333333',
                  mb: 1.5,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {address.name}
                </Typography>

                {/* Address */}
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#333333',
                  mb: 1.5,
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 1.5
                }}>
                  {formatAddress(address)}
                  {address.landmark && `, ${address.landmark}`}
                </Typography>

                {/* Mobile Number */}
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#333333',
                  mb: 2,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Mobile : {address.phone}
                </Typography>

                {/* Divider */}
                <Box sx={{ 
                  height: 1, 
                  background: 'repeating-linear-gradient(to right, #E0E0E0 0px, #E0E0E0 4px, transparent 4px, transparent 8px)',
                  mb: 2 
                }} />
                

                {/* Action Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center'
                }}>
                  {/* Edit Button */}
                  <Button
                    onClick={() => handleEditAddress(address.id)}
                   
                    sx={{
                      color: '#3F51B5',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 700,
                      textTransform: 'none',
                      fontFamily: 'Arial, sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(63, 81, 181, 0.1)'
                      }
                    }}
                  >
                    + Edit
                  </Button>

                  {/* Vertical Divider */}
                 
                  {/* Remove Button */}
                  <Button
                    onClick={() => handleRemoveAddress(address.id)}
                   
                    sx={{
                      color: '#3F51B5',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 700,
                      textTransform: 'none',
                      fontFamily: 'Arial, sans-serif',
                      '&:hover': {
                        backgroundColor: 'rgba(63, 81, 181, 0.1)'
                      }
                    }}
                  >
                    - Remove
                  </Button>
                </Box>
              </CardContent>
            </Card>
                ))
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
