'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography, Alert, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

interface GameData {
  id: number;
  title: string;
  baseUrl: string;
  indexFile: string;
  discountMinPercent: number;
  discountMaxPercent: number;
}

interface OfferGameResponse {
  status: string;
  apiBaseUrl: string;
  userId: number;
  game: GameData;
  reason?: string;
  message?: string;
}

interface OutletGameLoaderProps {
  offerId: number;
  onClose?: () => void;
}

const OutletGameLoader: React.FC<OutletGameLoaderProps> = ({ offerId, onClose }) => {
  const [gameData, setGameData] = useState<OfferGameResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const [apiBaseUrl, setApiBaseUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  useEffect(() => {
    const loadGame = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`/api/games/vendors/offer-game?offerId=${offerId}`, {
          credentials: 'include',
        });

        const data: OfferGameResponse = await res.json();

        if (data.status === 'success' && data.game) {
          setGameData(data);
          setApiBaseUrl(data.apiBaseUrl);
          // Build the game index URL
          setGameUrl(`${data.game.baseUrl}${data.game.indexFile}`);
        } else {
          // Handle different error reasons
          let errorMessage = 'Failed to load game';
          
          if (data.reason === 'missing_offer') {
            errorMessage = 'Offer ID is required';
          } else if (data.reason === 'offer_not_found') {
            errorMessage = 'Offer not found';
          } else if (data.reason === 'game_not_associated') {
            errorMessage = 'No game linked to this offer';
          } else if (data.reason === 'offer_not_active_or_out_of_window') {
            errorMessage = 'Offer is not active or has expired';
          } else if (data.message) {
            errorMessage = data.message;
          }
          
          setError(errorMessage);
        }
      } catch (err) {
        console.error('Failed to load game:', err);
        setError('Failed to load game. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (offerId) {
      loadGame();
    } else {
      setError('Offer ID is required');
      setIsLoading(false);
    }
  }, [offerId]);

  // After iframe finishes loading, send apiBaseUrl and config to the game
  useEffect(() => {
    if (!gameUrl || !apiBaseUrl || !gameData) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      // Send config to the game via postMessage
      // IMPORTANT: Replace "*" with your game origin for security in production
      iframe.contentWindow?.postMessage(
        {
          type: 'INIT_CONFIG',
          payload: {
            apiBaseUrl, // Available inside the game
            gameId: gameData.game.id,
            userId: gameData.userId,
            discountMinPercent: gameData.game.discountMinPercent,
            discountMaxPercent: gameData.game.discountMaxPercent,
          },
        },
        '*'
      );
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [gameUrl, apiBaseUrl, gameData]);

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
          zIndex: 9999,
          margin: 0,
          padding: 0,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={handleBack}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <CircularProgress sx={{ color: '#FAC200' }} />
        <Typography sx={{ color: 'white', mt: 2 }}>Loading game...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          zIndex: 9999,
          margin: 0,
          padding: 0,
        }}
      >
        <Box
          sx={{
            backgroundColor: '#1E3A8A',
            py: 2,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <IconButton
            onClick={handleBack}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ color: 'white', fontWeight: 600 }}>Game Error</Typography>
        </Box>
        <Box sx={{ padding: 3, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Alert severity="error" sx={{ width: '100%', maxWidth: 500 }}>
            {error}
          </Alert>
        </Box>
      </Box>
    );
  }

  if (!gameUrl) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          zIndex: 9999,
          margin: 0,
          padding: 0,
        }}
      >
        <Box sx={{ padding: 3 }}>
          <Alert severity="warning">Game URL not available</Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        zIndex: 9999,
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <iframe
        ref={iframeRef}
        title="Outlet Game"
        src={gameUrl}
        allowFullScreen
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
          margin: 0,
          padding: 0,
        }}
      />
    </Box>
  );
};

export default OutletGameLoader;

