"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TabBar from '@/components/TabBar';
import HeaderWithBack from '@/components/HeaderWithBack';
import { useAuth } from '@/contexts/AuthContext';

export default function OldPinPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const [pin, setPin] = useState(['', '', '', '']);
  const [showPin, setShowPin] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePinChange = (value: string, index: number) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      
      // Auto-focus next field
      if (value && index < 3) {
        setCurrentIndex(index + 1);
        // Focus the next input after a short delay
        setTimeout(() => {
          const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
          if (nextInput) {
            nextInput.focus();
          }
        }, 10);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      setCurrentIndex(index - 1);
      // Focus the previous input
      setTimeout(() => {
        const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }, 10);
    }
  };

  // Handle global key press for automatic typing
  const handleGlobalKeyPress = (e: KeyboardEvent) => {
    if (/^\d$/.test(e.key)) {
      const currentInput = document.querySelector(`input[data-index="${currentIndex}"]`) as HTMLInputElement;
      if (currentInput && currentIndex < 4) {
        handlePinChange(e.key, currentIndex);
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyPress);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, [currentIndex, handleGlobalKeyPress]);

  const handleNext = async () => {
    const pinString = pin.join('');
    
    if (pinString.length !== 4) {
      setError('Please enter a 4-digit PIN');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Verify current PIN by calling the change-pin API with dummy new PIN
      // This is a workaround to verify the current PIN
      console.log('Verifying current PIN:', pinString);
      const response = await fetch('/api/auth/change-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPin: pinString,
          newPin: pinString, // Try to set the same PIN (should fail with specific error)
          confirmNewPin: pinString
        }),
      });

      const data = await response.json();
      console.log('PIN verification response:', response.status, data);
      console.log('Response message:', data.message);
      console.log('Response status field:', data.status);
      
      if (response.status === 422) {
        if (data.message?.includes('New PIN must be different') || 
            data.message?.includes('different from current') ||
            data.message?.includes('must be different') ||
            data.message?.includes('same as current')) {
          // Current PIN is correct, proceed to new PIN page
          console.log('Current PIN verified successfully');
          // Store current PIN in localStorage for the next step
          localStorage.setItem('currentPinForChange', pinString);
          router.push('/change-pin/new-pin');
        } else {
          console.log('422 error but not the expected message:', data.message);
          setError('Invalid current PIN. Please try again.');
        }
      } else if (response.status === 401) {
        console.log('401 error - invalid current PIN');
        setError('Invalid current PIN. Please try again.');
      } else if (response.status === 400) {
        console.log('400 error - bad request, likely invalid PIN format');
        setError('Invalid PIN format. Please enter a 4-digit PIN.');
      } else if (response.status === 200) {
        // If API returns success, it means the PIN was changed (unexpected)
        console.log('200 response - PIN was changed unexpectedly');
        setError('Unexpected error. Please try again.');
      } else {
        console.error('Unexpected response:', response.status, data);
        setError(`Failed to verify PIN. Server returned ${response.status}. Please try again.`);
      }
    } catch (error) {
      console.error('Error verifying PIN:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = pin.every(digit => digit !== '');

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
        <Typography variant="body2" color="text.secondary">
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  // Redirect to home if not logged in
  if (!isLoggedIn) {
    router.push('/');
    return null;
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: '0 -15px' }}>
      {/* Header */}
      <HeaderWithBack 
        title="Back" 
        backgroundColor="#4848DB"
        sx={{
          backgroundColor: '#4848DB',
          textAlign: 'center',
          color: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }}
      />

      {/* Main Content */}
      <Box sx={{ 
        backgroundColor: 'white',
        padding: '40px 20px',
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            color: '#21175B',
            fontSize: '28px',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '16px'
          }}
        >
          Enter Your Old PIN
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: '#666',
            fontSize: '16px',
            textAlign: 'center',
            marginBottom: '60px',
            lineHeight: 1.5
          }}
        >
          Please enter your old PIN to proceed with verification and ensure account security now.
        </Typography>

        {/* Error Message */}
        {error && (
          <Box sx={{ 
            backgroundColor: '#ffebee',
            border: '1px solid #f44336',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: 2,
            textAlign: 'center'
          }}>
            <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 500 }}>
              {error}
            </Typography>
          </Box>
        )}

        {/* PIN Input Circles */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 3, 
          marginBottom: '40px' 
        }}>
          {[0, 1, 2, 3].map((index) => (
            <Box
              key={index}
              sx={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: pin[index] ? '#4848DB' : '#f5f5f5',
                border: pin[index] ? 'none' : '2px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setCurrentIndex(index)}
            >
              {pin[index] && (
                <Typography
                  sx={{
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 600
                  }}
                >
                  {showPin ? pin[index] : '*'}
                </Typography>
              )}
              
              {/* Hidden input for each circle */}
              <input
                type="text"
                value={pin[index]}
                onChange={(e) => handlePinChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setCurrentIndex(index)}
                data-index={index}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '24px',
                  textAlign: 'center'
                }}
                maxLength={1}
                autoComplete="off"
                autoFocus={index === 0}
              />
            </Box>
          ))}
        </Box>

        {/* Show/Hide PIN Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '40px' 
        }}>
          <Button
            onClick={() => setShowPin(!showPin)}
            sx={{
              color: '#4848DB',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: 'rgba(72, 72, 219, 0.1)'
              }
            }}
          >
            {showPin ? <VisibilityOff /> : <Visibility />}
            {showPin ? 'Hide' : 'Show'}
          </Button>
        </Box>

        {/* Next Button */}
        <Button
          fullWidth
          onClick={handleNext}
          disabled={!isFormValid || isLoading}
          sx={{
            backgroundColor: (isFormValid && !isLoading) ? '#FAC200' : '#e0e0e0',
            color: (isFormValid && !isLoading) ? '#ffffff' : '#666666',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '18px',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: (isFormValid && !isLoading) ? '0 4px 12px rgba(250, 194, 0, 0.3)' : 'none',
            '&:hover': {
              backgroundColor: (isFormValid && !isLoading) ? '#FFA500' : '#d0d0d0',
            },
          }}
        >
          {isLoading ? 'Verifying...' : 'Next'}
        </Button>
      </Box>

      {/* Bottom Navigation */}
      <TabBar />
    </div>
  );
}
