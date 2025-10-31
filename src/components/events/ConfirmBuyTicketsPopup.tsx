'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface ConfirmBuyTicketsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmBuyTicketsPopup: React.FC<ConfirmBuyTicketsPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleYes = () => {
    onConfirm();
    onClose();
  };

  const handleNo = () => {
    onClose();
  };

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
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: 0,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,249,250,0.7) 100%)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
        },
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        {/* Header */}
        <Box
          sx={{
            position: 'relative',
            backgroundColor: '#F0F0F0',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#666',
            }}
          >
            <Close />
          </IconButton>

          <Typography
            sx={{
              textAlign: 'center',
              fontSize: { xs: 22, sm: 24, md: 26 },
              fontWeight: 900,
              color: '#3F3F7F',
              fontFamily: 'Rubik',
            }}
          >
            Note !
          </Typography>
        </Box>

        {/* Content */}
        <Box
          sx={{
            padding: '32px 24px',
          }}
        >
          {/* Message */}
          <Box sx={{ marginBottom: '32px' }}>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: { xs: 16, sm: 17, md: 18 },
                fontWeight: 400,
                color: '#333333',
                fontFamily: 'Rubik',
                lineHeight: 1.6,
              }}
            >
              By clicking &apos;Yes&apos; you are using coins from Wallet
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            {/* No Button */}
            <Button
              onClick={handleNo}
              variant="outlined"
              sx={{
                flex: 1,
                borderColor: '#3F3F7F',
                color: '#3F3F7F',
                borderRadius: '10px',
                padding: '14px',
                fontSize: { xs: 16, sm: 17, md: 18 },
                fontWeight: 700,
                textTransform: 'none',
                fontFamily: 'Rubik',
                backgroundColor: 'transparent',
                '&:hover': {
                  borderColor: '#3F3F7F',
                  backgroundColor: 'rgba(63, 63, 127, 0.1)',
                },
              }}
            >
              No
            </Button>

            {/* Yes Button */}
            <Button
              onClick={handleYes}
              sx={{
                flex: 1,
                backgroundColor: '#FFC107',
                color: '#ffffff',
                borderRadius: '10px',
                padding: '14px',
                fontSize: { xs: 16, sm: 17, md: 18 },
                fontWeight: 700,
                textTransform: 'none',
                fontFamily: 'Rubik',
                boxShadow: '0 4px 12px rgba(255, 193, 7, 0.4)',
                '&:hover': {
                  backgroundColor: '#FFD54F',
                  boxShadow: '0 6px 16px rgba(255, 193, 7, 0.6)',
                },
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmBuyTicketsPopup;

