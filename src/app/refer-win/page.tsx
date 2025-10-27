"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  Share,
  WhatsApp,
  ContentCopy,
  Link as LinkIcon,
  PhoneAndroid,
  CardGiftcard,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from '@/components/TabBar';
import HeaderWithBack from '@/components/HeaderWithBack';

export default function ReferWin() {
  const router = useRouter();
  const [referralCode] = useState('Y8A167'); // Sample referral code

  // Handle copy referral code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    // You can add a toast notification here
  };

  // Handle share via WhatsApp
  const handleWhatsAppShare = () => {
    const message = `Join me on GamesNGO! Use my referral code: ${referralCode} and earn 500 coins!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Handle general share
  const handleGeneralShare = () => {
    const message = `Join me on GamesNGO! Use my referral code: ${referralCode} and earn 500 coins!`;
    if (navigator.share) {
      navigator.share({
        title: 'Join GamesNGO',
        text: message,
      });
    } else {
      navigator.clipboard.writeText(message);
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
              Earn 500 Coins
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
                letterSpacing: '2px'
              }}
            >
              {referralCode.split('').join(' ')}
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
        </Box>

        {/* Bonus Notification Banner */}
        <Card sx={{
          backgroundColor: 'rgba(250, 246, 0, 0.35)', // Yellow background from reference
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          boxShadow: 'none',
          border: '1px solid #FFAF69',
        }}>
          <Avatar sx={{ 
            width: 40, 
            height: 40,
            backgroundColor: '#5C3EBA'
          }}>
            <Typography sx={{ color: 'white', fontSize: '16px' }}>R</Typography>
          </Avatar>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333', // Dark gray text from reference
              fontSize: '14px', // Font size from reference
              fontWeight: 500,
              flex: 1
            }}
          >
            Rakesh Rock Earned 500 Referal Bonus Coins !!!
          </Typography>
        </Card>
      </Box>

      {/* Bottom Navigation Bar */}
      <TabBar />
    </div>
  );
}
