'use client';

import React from 'react';
import {
  Box,
  Typography,
  Dialog,
  IconButton,
} from '@mui/material';
import { Close, CheckCircle } from '@mui/icons-material';

interface PinChangeSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PinChangeSuccessPopup: React.FC<PinChangeSuccessPopupProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: '20px',
          padding: '32px 24px',
          margin: '20px',
          backgroundColor: '#ffffff',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          maxWidth: '400px',
          width: '100%'
        }
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 16,
          top: 16,
          color: '#666',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <Close />
      </IconButton>

      {/* Success Icon */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '24px' 
      }}>
        <Box sx={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#4CAF50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-8px',
            left: '-8px',
            right: '-8px',
            bottom: '-8px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
            zIndex: -1,
            animation: 'pulse 2s infinite'
          }
        }}>
          <CheckCircle sx={{ 
            color: 'white', 
            fontSize: '40px' 
          }} />
        </Box>
      </Box>

      {/* Success Message */}
      <Typography
        variant="h5"
        sx={{
          color: '#2E7D32',
          fontSize: '24px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '16px',
          lineHeight: 1.2
        }}
      >
        Your Pin Changed{' '}
        <Typography 
          component="span" 
          sx={{ 
            color: '#4CAF50',
            fontSize: '24px',
            fontWeight: 700
          }}
        >
          Successfully!
        </Typography>
      </Typography>

      {/* Instructional Text */}
      <Typography
        variant="body1"
        sx={{
          color: '#666',
          fontSize: '16px',
          textAlign: 'center',
          lineHeight: 1.5,
          marginBottom: '24px'
        }}
      >
        Always keep your PIN safe, never share it, and protect your account from unauthorized access.
      </Typography>

      {/* Success Button */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center' 
      }}>
        <Box
          onClick={onClose}
          sx={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px 32px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 600,
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#45a049',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
            }
          }}
        >
          Continue
        </Box>
      </Box>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Dialog>
  );
};

export default PinChangeSuccessPopup;
