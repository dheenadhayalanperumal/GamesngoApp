"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CircularProgress,
} from '@mui/material';
import {
  Share,
  WhatsApp,
  Link as LinkIcon,
  PhoneAndroid,
  CardGiftcard,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from '@/components/TabBar';
import HeaderWithBack from '@/components/HeaderWithBack';

export default function ReferWin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [referralData, setReferralData] = useState({
    rewardCoins: 500,
    code: '',
    codeSpaced: '',
    shareLink: '',
    shareText: '',
    counts: {
      referred: 0,
      coinsEarned: 0
    },
    recent: {
      message: null as string | null,
      at: null as string | null
    }
  });

  useEffect(() => {
    console.log('🎯 Refer-Win page mounted');
    fetchReferralDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchReferralDetails = async () => {
    try {
      console.log('Fetching referral details...');
      const response = await fetch('/api/referral/details', {
        method: 'GET',
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const data = await response.json();
      console.log('Referral details response:', data);

      if (response.ok && data.status === 'success') {
        setReferralData(data.referral);
        console.log('Referral data loaded successfully');
      } else {
        console.warn('Failed to fetch referral details:', data.message || 'Unknown error');
        
        // If not authenticated, redirect to home  
        if (response.status === 401 || data.message?.includes('login') || data.message?.includes('token')) {
          console.log('User not authenticated, redirecting to home');
          console.log('Response data:', data);
          alert('Please login to view your referral details');
          setTimeout(() => {
            router.push('/');
          }, 100);
        } else if (response.status === 500) {
          console.error('Server error:', data);
          alert(`Server error: ${data.message || 'Please try again later'}`);
        } else {
          alert(`Error: ${data.message || 'Failed to load referral details'}`);
        }
      }
    } catch (error) {
      console.error('Error fetching referral details:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        alert(`Network error: ${error.message}`);
      } else {
        alert('Failed to load referral details. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle copy referral code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralData.code);
    alert('Referral code copied to clipboard!');
  };

  // Handle copy referral link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralData.shareLink);
    alert('Referral link copied to clipboard!');
  };

  // Handle share via WhatsApp
  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(referralData.shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Handle general share
  const handleGeneralShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join GamesNGO',
        text: referralData.shareText,
        url: referralData.shareLink,
      });
    } else {
      navigator.clipboard.writeText(`${referralData.shareText}\n${referralData.shareLink}`);
      alert('Share message copied to clipboard!');
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
      {/* Dark Blue Header with Back Button */}
      <HeaderWithBack/>

      {/* Main Content Area */}
      <Box sx={{ 
        backgroundColor: 'white', // White background from reference
        padding: '24px 20px 100px 20px',
        minHeight: 'calc(100vh - 80px)'
      }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress sx={{ color: '#4848DB' }} />
          </Box>
        ) : (
          <>
        {/* Recent Reward Banner */}
        {referralData.recent.message && (
          <Box sx={{ 
            backgroundColor: '#E8F5E9',
            border: '1px solid #4CAF50',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <CardGiftcard sx={{ color: '#4CAF50' }} />
            <Box>
              <Typography sx={{ color: '#2E7D32', fontSize: '14px', fontWeight: 600 }}>
                {referralData.recent.message}
              </Typography>
              {referralData.recent.at && (
                <Typography sx={{ color: '#66BB6A', fontSize: '12px' }}>
                  {new Date(referralData.recent.at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Invite & Win Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: 4
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#2C005B', // Dark purple text from reference
                fontSize: '28px', // Font size from reference
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 1
              }}
            >
              Invite & Win
            </Typography>
            
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#2C005B', // Dark purple text from reference
                fontSize: '28px', // Font size from reference
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 2
              }}
            >
              Earn {referralData.rewardCoins} Coins
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#6A5B8D', // Muted grayish-purple from reference
                fontSize: '14px', // Font size from reference
                fontWeight: 400,
                lineHeight: 1.5
              }}
            >
              Invite your friend and start earning 500 Coins per Referal.
            </Typography>
          </Box>
          
          {/* Illustration */}
          <Box sx={{ 
            width: '120px', 
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <img 
              src="/images/banner/invite-banner.png" 
              alt="Invite and Win Illustration"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
        </Box>

        {/* How It Works Section */}
        <Card sx={{
          backgroundColor: '#ECEDFF', // Light gray background from reference
          borderRadius: '12px',
          padding: '20px',
          marginBottom: 3,
          boxShadow: 'none'
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#2C005B', // Dark purple text from reference
              fontSize: '18px', // Font size from reference
              fontWeight: 600,
              marginBottom: 2,
              textAlign: 'center'
            }}
          >
            How it works
          </Typography>
          
          {/* Step 1 */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            marginBottom: 2 
          }}>
            <Box sx={{
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <LinkIcon sx={{ color: '#FAC200', fontSize: 20 }} />
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#333', // Dark gray text from reference
                fontSize: '14px', // Font size from reference
                fontWeight: 500,
                flex: 1
              }}
            >
              Share your unique referral link with friends
            </Typography>
          </Box>
          
          {/* Step 2 */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            marginBottom: 2
          }}>
            <Box sx={{
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <PhoneAndroid sx={{ color: '#FAC200', fontSize: 20 }} />
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#333', // Dark gray text from reference
                fontSize: '14px', // Font size from reference
                fontWeight: 500,
                flex: 1
              }}
            >
              Your friend enters the referral code while signing up.
            </Typography>
          </Box>
          
          {/* Step 3 */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2 
          }}>
            <Box sx={{
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <CardGiftcard sx={{ color: '#FAC200', fontSize: 20 }} />
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#333', // Dark gray text from reference
                fontSize: '14px', // Font size from reference
                fontWeight: 500,
                flex: 1
              }}
            >
              You get your reward once your friend completes signup.
            </Typography>
          </Box>
        </Card>

        {/* Share Your Referral Code Section */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#2C005B', // Dark purple text from reference
              fontSize: '18px', // Font size from reference
              fontWeight: 600,
              marginBottom: 2
            }}
          >
            Share Your Referal Code
          </Typography>
          
          {/* Referral Code Display */}
          <Card sx={{
            backgroundColor: '#F8F9FA',
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            padding: '0px 0px 0px 20px',
            marginBottom: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#333', // Dark gray text from reference
                fontSize: '18px', // Font size from reference
                fontWeight: 600,
                letterSpacing: '4px'
              }}
            >
              {referralData.codeSpaced || referralData.code}
            </Typography>
            
            <Button
              onClick={handleCopyCode}
              sx={{
                backgroundColor: '#F5F5F5',
                color: '#333',
                border: '1px solid #E0E0E0',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#E8E8E8'
                }
              }}
            >
              Copy Code
            </Button>
          </Card>
          
          {/* Share Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* General Share Button */}
            <Button
              onClick={handleGeneralShare}
              sx={{
                flex: 1,
                backgroundColor: '#4285F4', // Blue color from reference
                color: 'white',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '16px',
                fontWeight: 500,
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                '&:hover': {
                  backgroundColor: '#3367D6'
                }
              }}
            >
              <Share sx={{ fontSize: 20 }} />
              Share
            </Button>
            
            {/* WhatsApp Share Button */}
            <Button
              onClick={handleWhatsAppShare}
              sx={{
                flex: 2,
                backgroundColor: '#25D366', // Green color from reference
                color: 'white',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '16px',
                fontWeight: 500,
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                '&:hover': {
                  backgroundColor: '#1DA851'
                }
              }}
            >
              <WhatsApp sx={{ fontSize: 20 }} />
              Share via WhatsApp
            </Button>
          </Box>

          {/* Copy Referral Link Button */}
          <Button
            onClick={handleCopyLink}
            sx={{
              backgroundColor: '#ECEDFF',
              color: '#4848DB',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              width: '100%',
              marginTop: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              '&:hover': {
                backgroundColor: '#D8DAFF'
              }
            }}
          >
            <LinkIcon sx={{ fontSize: 20 }} />
            Copy Referral Link
          </Button>
        </Box>

        {/* Referral Stats Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#2C005B',
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: 2
            }}
          >
            Your Referral Stats
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Friends Referred Card */}
            <Card sx={{
              flex: 1,
              backgroundColor: '#F3F4FF',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: 'none',
              border: '1px solid #E0E0E0',
              textAlign: 'center'
            }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#4848DB',
                  fontSize: '32px',
                  fontWeight: 700,
                  marginBottom: 1
                }}
              >
                {referralData.counts.referred}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#6A5B8D',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                Friends Referred
              </Typography>
            </Card>

            {/* Coins Earned Card */}
            <Card sx={{
              flex: 1,
              backgroundColor: '#FFF9E6',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: 'none',
              border: '1px solid #FFE082',
              textAlign: 'center'
            }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#FAC200',
                  fontSize: '32px',
                  fontWeight: 700,
                  marginBottom: 1
                }}
              >
                {referralData.counts.coinsEarned}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#6A5B8D',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                Coins Earned
              </Typography>
            </Card>
          </Box>
        </Box>
        </>
        )}
      </Box>

      {/* Bottom Navigation Bar */}
      <TabBar />
    </div>
  );
}
