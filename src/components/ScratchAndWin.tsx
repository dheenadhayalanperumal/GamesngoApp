'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ScratchPopup from './ScratchPopup';
import CouponPopup from './CouponPopup';

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
      
      // Validate scratch ID before making request
      if (!scratchId || scratchId === 0) {
        console.error('Invalid scratch ID:', scratchId);
        alert('No scratch card available. Please refresh the page.');
        return null;
      }
      
      const response = await fetch(`/api/scratch/quote?scratch_id=${scratchId}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Scratch quote response:', data);

      if (response.ok && data.status === 'success') {
        setScratchQuote(data.quote);
        console.log('Quote pricing:', data.quote.pricing);
        return data.quote;
      } else {
        console.error('Quote fetch failed:', response.status, data);
        if (response.status === 401) {
          alert('Please login to play scratch cards');
        } else if (response.status === 404) {
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
      console.log('Redeeming scratch card, ID:', scratchId);
      console.log('Request body:', JSON.stringify({ scratch_id: scratchId }));
      
      const response = await fetch('/api/scratch/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ scratch_id: scratchId }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Try to parse JSON, handle errors
      let data;
      try {
        const text = await response.text();
        console.log('Response text:', text);
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        data = {};
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
        if (response.status === 402) {
          alert('Not enough coins for extra scratch');
        } else if (response.status === 401) {
          alert('Please login to play scratch cards');
        } else if (response.status === 404) {
          alert('Scratch card not available');
        } else if (response.status === 422) {
          alert(data.message || 'Invalid scratch card');
        } else {
          alert(data.message || 'Failed to redeem scratch. Please try again.');
        }
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
    
    // Check if we have a valid scratch ID
    if (!scratchId || scratchId === 0) {
      alert('No scratch card available at the moment. Please try again later.');
      return;
    }
    
    // Fetch quote first
    const quote = await fetchScratchQuote();
    console.log('Quote result:', quote);
    if (quote && quote.pricing && quote.pricing.canProceed) {
      console.log('Opening scratch popup');
      setIsPopupOpen(true);
    } else {
      console.log('Cannot proceed with scratch:', quote);
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
        rewardData={rewardData}
      />
    </Box>
  );
};

export default ScratchAndWin;