'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Close, Lock } from '@mui/icons-material';
import Image from 'next/image';

interface SetPinPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPinSet: (pin: string) => void;
}

const SetPinPopup: React.FC<SetPinPopupProps> = ({
  isOpen,
  onClose,
  onPinSet
}) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [confirmPinError, setConfirmPinError] = useState('');

  const handlePinChange = (value: string) => {
    // Only allow 4 digits
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value);
      setPinError('');
    }
  };

  const handleConfirmPinChange = (value: string) => {
    // Only allow 4 digits
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setConfirmPin(value);
      setConfirmPinError('');
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    // Validate PIN
    if (pin.length !== 4) {
      setPinError('PIN must be 4 digits');
      return;
    }

    if (confirmPin.length !== 4) {
      setConfirmPinError('Confirm PIN must be 4 digits');
      return;
    }

    if (pin !== confirmPin) {
      setConfirmPinError('PINs do not match');
      return;
    }

    // Call the set-pin API
    setIsLoading(true);
    try {
      console.log('Setting PIN...');
      
      // Use FormData for set-pin API
      const formData = new FormData();
      formData.append('pin', pin);
      formData.append('confirmPin', confirmPin);

      const response = await fetch('/api/auth/set-pin', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        console.log('PIN set successfully:', data.message);
        onPinSet(pin);
        onClose();
      } else {
        // Handle API errors
        if (response.status === 400) {
          alert('OTP not verified or expired');
        } else if (response.status === 422) {
          alert('PIN must be 4-6 digits');
        } else if (response.status === 409) {
          alert('Phone number already registered');
        } else {
          alert('Failed to set PIN. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error setting PIN:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = pin.length === 4 && confirmPin.length === 4 && pin === confirmPin;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,249,250,0.7) 100%)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', marginBottom: '18px' }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#666'
            }}
          >
            <Close />
          </IconButton>
          
          <Box sx={{ marginBottom: '8px' }}>
            <Image
              src="/logoblue.svg"
              alt="GAMES N GO"
              width={168}
              height={42}
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: '#21175B',
              fontFamily: 'Rubik',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: 'normal',
              textAlign: 'center',
              marginBottom: '24px'
            }}
          >
            Set your secure PIN to protect account
          </Typography>
        </Box>

        {/* Set PIN Form */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,249,250,0.7) 100%)',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '20 20px 40px rgba(0, 0, 0, 0.55)',
        }}>
          {/* Instruction Text */}
          

          <Box sx={{ marginBottom: '24px' }}>
            {/* Set PIN Field */}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px'
              }}
            >
              Set PIN
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Enter 4-digit PIN"
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
              error={!!pinError}
              helperText={pinError}
              inputProps={{
                maxLength: 4,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#FAC200' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                marginBottom: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  backgroundColor: '#FFF',
                  border: '1px solid rgba(0, 0, 0, 0.20)',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused': {
                    border: '1px solid #FAC200',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                  '&.Mui-error': {
                    border: '1px solid #f44336',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                },
              }}
            />

            {/* Confirm PIN Field */}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px'
              }}
            >
              Confirm PIN
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Confirm 4-digit PIN"
              value={confirmPin}
              onChange={(e) => handleConfirmPinChange(e.target.value)}
              error={!!confirmPinError}
              helperText={confirmPinError}
              inputProps={{
                maxLength: 4,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#FAC200' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  backgroundColor: '#FFF',
                  border: '1px solid rgba(0, 0, 0, 0.20)',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused': {
                    border: '1px solid #FAC200',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                  '&.Mui-error': {
                    border: '1px solid #f44336',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                },
              }}
            />
          </Box>

          {/* Next Button */}
          <Button
            fullWidth
            onClick={handleNext}
            disabled={!isFormValid || isLoading}
            sx={{
              backgroundColor: (isFormValid && !isLoading) ? '#FAC200' : '#e0e0e0',
              color: (isFormValid && !isLoading) ? '#ffffff' : '#666666',
              borderRadius: '10px',
              padding: '14px',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: (isFormValid && !isLoading) ? '#FFA500' : '#d0d0d0',
              },
            }}
          >
            {isLoading ? 'Setting PIN...' : 'Next'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SetPinPopup;
