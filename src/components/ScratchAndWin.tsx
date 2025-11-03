'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ScratchPopup from './ScratchPopup';
import CouponPopup from './CouponPopup';
import LoginPopup from './LoginPopup';

// Move SVG component outside to prevent re-creation on every render
const GiftBoxSVG = () => (
  <img
    src="/gift.svg"
    alt="Gift box"
    style={{
      width: '64px',
      height: '64px',
      objectFit: 'contain'
    }}
  />
);

interface ScratchData {
  id: number;
  title: string;
  type: string;
  amount?: number;
  product?: {
    id: number;
    title: string;
    coverImageUrl: string;
    price: {
      actual: number;
      discount: number;
    };
  };
}

interface ScratchAndWinProps {
  onScratch?: () => void;
  coinCost?: number;
  scratchData?: ScratchData;
}

const ScratchAndWin: React.FC<ScratchAndWinProps> = ({
  onScratch,
  coinCost = 15,
  scratchData
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [coinsWon, setCoinsWon] = useState(0);
  const [scratchQuote, setScratchQuote] = useState<{
    scratch: { id: number; title: string; type: string; amount?: number };
    pricing: { attemptNo: number; costCoins: number; isFree: boolean; walletCoins: number; canProceed: boolean };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rewardData, setRewardData] = useState<{
    type: 'coin' | 'product';
    amount?: number;
    product?: { id: number };
    voucherId?: number;
    redemptionId: number;
    spent: number;
    attemptNo: number;
  } | null>(null);
  
  // Use scratchData.id if available, otherwise default to 1
  const scratchId = scratchData?.id || 1;

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();

      // Calculate time since midnight (start of current day)
      const midnight = new Date(now);
      midnight.setHours(0, 0, 0, 0);

      // Calculate elapsed time since midnight in milliseconds
      const elapsedSinceMidnight = now.getTime() - midnight.getTime();

      // Calculate remaining time until next midnight (24 hours cycle)
      const totalDayMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const remainingMs = totalDayMs - elapsedSinceMidnight;

      if (remainingMs > 0) {
        const hours = Math.floor(remainingMs / (1000 * 60 * 60));
        const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        // Reset to 24:00:00 when day cycles
        setTimeLeft({ hours: 24, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  // Fetch scratch quote before opening popup
  const fetchScratchQuote = async () => {
    try {
      console.log('Fetching scratch quote for ID:', scratchId);
      console.log('Scratch data:', scratchData);
      
      // Validate scratch ID before making request
      const validScratchId = scratchId && scratchId > 0 ? scratchId : (scratchData?.id || null);
      
      if (!validScratchId || validScratchId === 0) {
        console.error('Invalid scratch ID:', scratchId, 'scratchData:', scratchData);
        alert('No scratch card available. Please refresh the page.');
        return null;
      }
      
      console.log('Using scratch_id:', validScratchId);
      const response = await fetch(`/api/scratch/quote?scratch_id=${validScratchId}`, {
        method: 'GET',
        credentials: 'include',
      });

      console.log('Scratch quote response status:', response.status);

      // Handle 401 immediately without trying to parse JSON
      if (response.status === 401) {
        console.log('User not logged in, showing login popup');
        setIsLoginPopupOpen(true);
        return null;
      }

      // Try to parse JSON for other responses
      let data;
      try {
        const text = await response.text();
        console.log('Scratch quote response text:', text);
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Failed to parse scratch quote response:', parseError);
        data = {};
      }

      console.log('Scratch quote parsed data:', data);

      if (response.ok && data.status === 'success') {
        setScratchQuote(data.quote);
        console.log('Quote pricing:', data.quote.pricing);
        return data.quote;
      } else {
        console.error('Quote fetch failed:', response.status, data);
        if (response.status === 404) {
          alert('Scratch card not available');
        } else if (response.status === 422) {
          alert(data.message || 'Invalid scratch card');
        } else {
          alert(data.message || 'Failed to load scratch card. Please try again.');
        }
        return null;
      }
    } catch (error) {
      console.error('Error fetching scratch quote:', error);
      alert('Network error. Please try again.');
      return null;
    }
  };

  // Redeem scratch card
  const redeemScratch = async () => {
    setIsLoading(true);
    try {
      // Ensure we have a valid scratch ID
      const validScratchId = scratchId && scratchId > 0 ? scratchId : (scratchData?.id || null);
      
      if (!validScratchId || validScratchId === 0) {
        console.error('Invalid scratch ID for redemption:', scratchId, 'scratchData:', scratchData);
        alert('No scratch card available. Please refresh the page.');
        setIsLoading(false);
        return null;
      }
      
      console.log('Redeeming scratch card, ID:', validScratchId);
      
      // Create FormData instead of JSON
      const formData = new FormData();
      formData.append('scratch_id', validScratchId.toString());
      
      console.log('Request FormData - scratch_id:', validScratchId);
      
      const response = await fetch('/api/scratch/redeem', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Handle 401 immediately without trying to parse JSON
      if (response.status === 401) {
        console.log('User not logged in during redeem, showing login popup');
        setIsLoginPopupOpen(true);
        return null;
      }
      
      // Try to parse JSON for other responses
      let data;
      try {
        const text = await response.text();
        console.log('Response text:', text);
        
        // Handle empty or whitespace-only responses
        const trimmedText = text ? text.trim() : '';
        if (!trimmedText) {
          // Create default error object based on status code
          if (response.status === 422) {
            data = { status: 'error', message: 'Invalid scratch card or validation failed' };
          } else if (response.status === 402) {
            data = { status: 'error', message: 'Not enough coins for extra scratch' };
          } else if (response.status === 404) {
            data = { status: 'error', message: 'Scratch card not found' };
          } else {
            data = { status: 'error', message: 'Empty response from server' };
          }
        } else {
          // Try to parse as JSON
          try {
            data = JSON.parse(trimmedText);
          } catch (jsonError) {
            console.error('Failed to parse JSON:', jsonError);
            // If it's not JSON, create an error object
            data = { 
              status: 'error', 
              message: trimmedText.length > 200 ? 'Invalid response format' : trimmedText 
            };
          }
        }
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        // Create default error object based on status code
        if (response.status === 422) {
          data = { status: 'error', message: 'Invalid scratch card or validation failed' };
        } else if (response.status === 402) {
          data = { status: 'error', message: 'Not enough coins for extra scratch' };
        } else if (response.status === 404) {
          data = { status: 'error', message: 'Scratch card not found' };
        } else {
          data = { status: 'error', message: 'Failed to process response' };
        }
      }
      
      console.log('Scratch redeem response:', data);

      if (response.ok && data.status === 'success') {
        setRewardData(data.reward);
        console.log('Reward received:', data.reward);
        
        // Set coins won if it's a coin reward
        if (data.reward.type === 'coin') {
          setCoinsWon(data.reward.amount);
          console.log('Coins won:', data.reward.amount);
        } else if (data.reward.type === 'product') {
          console.log('Product won:', data.reward.product);
        }
        
        // Show attempt info
        console.log(`Attempt #${data.reward.attemptNo}, Spent: ${data.reward.spent} coins`);
        
        return data.reward;
      } else {
        console.error('Redeem failed:', response.status, data);
        
        // Get error message
        const errorMessage = data?.message || 
          (response.status === 402 ? 'Not enough coins for extra scratch' :
           response.status === 404 ? 'Scratch card not available' :
           response.status === 422 ? 'Invalid scratch card or validation failed' :
           'Failed to redeem scratch. Please try again.');
        
        alert(errorMessage);
        return null;
      }
    } catch (error) {
      console.error('Error redeeming scratch:', error);
      alert('Network error. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleScratchClick = async () => {
    console.log('Scratch button clicked, scratchId:', scratchId);
    console.log('Scratch data:', scratchData);
    
    // Check if scratch data is available
    if (!scratchData) {
      alert('Scratch card data is still loading. Please wait a moment and try again.');
      return;
    }
    
    // Use scratchData.id as the primary source, with fallback to scratchId
    const idToUse = scratchData.id || scratchId;
    
    // Check if we have a valid scratch ID
    if (!idToUse || idToUse === 0) {
      alert('No scratch card available at the moment. Please refresh the page.');
      return;
    }
    
    // Fetch quote first to check if user can proceed
    const quote = await fetchScratchQuote();
    console.log('Quote result:', quote);
    
    if (!quote) {
      // fetchScratchQuote already handled the error and showed an alert
      return;
    }
    
    if (quote.pricing && quote.pricing.canProceed) {
      console.log('Opening scratch popup');
      setIsPopupOpen(true);
    } else {
      console.log('Cannot proceed with scratch:', quote);
      // Check if user has enough coins but canProceed is still false
      if (quote.pricing) {
        if (!quote.pricing.isFree && quote.pricing.walletCoins < quote.pricing.costCoins) {
          alert(`Not enough coins. You need ${quote.pricing.costCoins} coins but only have ${quote.pricing.walletCoins} coins.`);
        } else {
          alert('Cannot proceed with scratch at this time. Please try again later.');
        }
      } else {
        alert('Cannot proceed with scratch. Please try again.');
      }
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handlePopupScratch = async () => {
    console.log('User completed scratch animation, calling redeem API...');
    
    // Redeem the scratch card
    const reward = await redeemScratch();
    
    if (reward) {
      console.log('Redemption successful, showing coupon popup');
      setIsPopupOpen(false);
      setIsCouponOpen(true);
      
      // Refresh scratch quote to get updated attempt number and pricing
      setTimeout(() => {
        fetchScratchQuote();
      }, 500);
      
      // Dispatch custom event to notify other components (like Header) to refresh
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('scratchRedeemed', { 
          detail: { 
            rewardType: reward.type,
            amount: reward.amount,
            voucherId: reward.voucherId 
          } 
        }));
      }
      
      if (onScratch) {
        onScratch();
      }
    } else {
      console.log('Redemption failed, closing popup');
      setIsPopupOpen(false);
    }
  };

  const handleCouponClose = () => {
    setIsCouponOpen(false);
  };

  const handleLoginPopupClose = () => {
    setIsLoginPopupOpen(false);
  };

  const handleLogin = () => {
    setIsLoginPopupOpen(false);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <Box
      sx={{
        background: 'white',
        borderRadius: {
          xs: '12px',
          sm: '16px',
          md: '20px'
        },
        padding: {
          xs: '16px',
          sm: '20px',
          md: '24px'
        },
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        // maxWidth: '400px',
        width: '100%',
        margin: '0px'
      }}
    >
      {/* Header with icon and title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: {
            xs: '12px',
            sm: '16px'
          },
          marginBottom: {
            xs: '16px',
            sm: '20px'
          }
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            borderRadius: '12px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
          }}
        >
          <GiftBoxSVG />
        
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#2D3748',
              fontWeight: 'bold',
              fontSize: {
                xs: '16px',
                sm: '18px',
                md: '20px'
              },
              marginBottom: '4px'
            }}
          >
            {scratchData?.title || 'Daily Free Scratch'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#4A5568',
              fontSize: {
                xs: '12px',
                sm: '14px'
              }
            }}
          >
            {scratchData?.type === 'coin' && scratchData?.amount 
              ? `Win up to ${scratchData.amount} coins!`
              : scratchData?.type === 'product' && scratchData?.product
              ? `Win ${scratchData.product.title}!`
              : 'Get a free scratch in every 24 hrs'}
          </Typography>
        </Box>
      </Box>

      {/* Countdown Timer */}
      <Box sx={{ marginBottom: '20px' }}>
        

        <Box
          sx={{
            display: 'flex',
            flexDirection:'column',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center'
          }}
        >
          <Box>
          <Typography
          variant="body2"
          sx={{
            color: '#718096',
            fontSize: {
              xs: '12px',
              sm: '14px'
            },
            marginBottom: '8px'
          }}
        >
          Next Free Scratch In
        </Typography>
        </Box>
        <Box  sx={{
            display: 'flex',
            flexDirection:'row',
            
          }}>
          <Box sx={{ textAlign: 'center' }}>

          
            <Typography
              variant="h4"
              sx={{
                color: '#2D3748',
                fontWeight: 'bold',
                fontSize: {
                  xs: '24px',
                  sm: '28px',
                  md: '32px'
                },
                lineHeight: 1
              }}
            >
              {formatTime(timeLeft.hours)}
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: '#2D3748',
              fontWeight: 'bold',
              fontSize: {
                xs: '24px',
                sm: '28px',
                md: '32px'
              }
            }}
          >
            :
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                color: '#2D3748',
                fontWeight: 'bold',
                fontSize: {
                  xs: '24px',
                  sm: '28px',
                  md: '32px'
                },
                lineHeight: 1
              }}
            >
              {formatTime(timeLeft.minutes)}
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: '#2D3748',
              fontWeight: 'bold',
              fontSize: {
                xs: '24px',
                sm: '28px',
                md: '32px'
              }
            }}
          >
            :
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                color: '#2D3748',
                fontWeight: 'bold',
                fontSize: {
                  xs: '24px',
                  sm: '28px',
                  md: '32px'
                },
                lineHeight: 1
              }}
            >
              {formatTime(timeLeft.seconds)}
            </Typography>
          </Box>
          </Box>
        </Box>
      </Box>

      {/* Scratch Button */}
      <Button
        variant="contained"
        onClick={handleScratchClick}
        disabled={isLoading || !scratchId}
        sx={{
          background: (isLoading || !scratchId) ? '#E2E8F0' : 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          color: (isLoading || !scratchId) ? '#A0AEC0' : '#2D3748',
          fontWeight: 'bold',
          fontSize: {
            xs: '14px',
            sm: '16px',
            md: '18px'
          },
          padding: {
            xs: '12px 24px',
            sm: '14px 28px',
            md: '16px 32px'
          },
          borderRadius: '50px',
          textTransform: 'none',
          width: '100%',
          boxShadow: isLoading ? 'none' : '0 4px 16px rgba(255, 215, 0, 0.3)',
          '&:hover': {
            background: isLoading ? '#E2E8F0' : 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
            boxShadow: isLoading ? 'none' : '0 6px 20px rgba(255, 215, 0, 0.4)',
            transform: isLoading ? 'none' : 'translateY(-2px)',
          },
          '&:disabled': {
            background: '#E2E8F0',
            color: '#A0AEC0',
            boxShadow: 'none',
          }
        }}
      >
        {!scratchId ? 'Loading Scratch...' : isLoading ? 'Loading...' : scratchQuote?.pricing.isFree ? 'Scratch Now (Free)' : `Scratch Now (${scratchQuote?.pricing.costCoins || coinCost} Coins)`}
      </Button>

      {/* Scratch Popup */}
      <ScratchPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        onScratch={handlePopupScratch}
      />

      {/* Coupon Popup */}
      <CouponPopup
        isOpen={isCouponOpen}
        onClose={handleCouponClose}
        coinsWon={coinsWon}
        rewardData={rewardData || undefined}
      />

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleLoginPopupClose}
        onLogin={handleLogin}
      />
    </Box>
  );
};

export default ScratchAndWin;