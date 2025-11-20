'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography, Alert, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import GameHeader from './GameHeader';

interface GameData {
  id: number;
  name: string;
  assetUrl: string;
}

interface GameInfoResponse {
  status: string;
  apiBaseUrl: string;
  userId: number;
  game: GameData;
  reason?: string;
  message?: string;
}

interface GameLoaderProps {
  gameId: number;
  onClose?: () => void;
}

const GameLoader: React.FC<GameLoaderProps> = ({ gameId, onClose }) => {
  const [gameData, setGameData] = useState<GameInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const [apiBaseUrl, setApiBaseUrl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  useEffect(() => {
    const loadGame = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`/api/games/info?gameId=${gameId}`, {
          credentials: 'include',
        });

        const data: GameInfoResponse = await res.json();

        if (data.status === 'success' && data.game) {
          setGameData(data);
          // Ensure apiBaseUrl uses HTTPS
          const normalizedApiBaseUrl = data.apiBaseUrl?.replace(/^http:/, 'https:') || data.apiBaseUrl;
          setApiBaseUrl(normalizedApiBaseUrl);
          // Ensure assetUrl uses HTTPS for mixed content security
          const normalizedAssetUrl = data.game.assetUrl?.replace(/^http:/, 'https:') || data.game.assetUrl;
          // Build the game index URL - assetUrl should end with / and we append index.html
          const gameUrlPath = normalizedAssetUrl.endsWith('/') 
            ? `${normalizedAssetUrl}index.html` 
            : `${normalizedAssetUrl}/index.html`;
          setGameUrl(gameUrlPath);
        } else {
          // Handle different error reasons
          let errorMessage = 'Failed to load game';
          
          if (data.reason === 'missing_game_id') {
            errorMessage = 'Game ID is required';
          } else if (data.reason === 'game_not_found') {
            errorMessage = 'Game not found or inactive';
          } else if (data.reason === 'unauthorized') {
            errorMessage = 'Please login to play this game';
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

    if (gameId) {
      loadGame();
    } else {
      setError('Game ID is required');
      setIsLoading(false);
    }
  }, [gameId]);

  // After iframe finishes loading, send apiBaseUrl and config to the game
  useEffect(() => {
    if (!gameUrl || !apiBaseUrl || !gameData) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      // Send all config data to the game via postMessage
      // IMPORTANT: Replace "*" with your game origin for security in production
      iframe.contentWindow?.postMessage(
        {
          type: 'INIT_CONFIG',
          payload: {
            // Game information
            gameId,
            
            // API configuration
            apiBaseUrl,
            
            // User information
            userId: gameData.userId,
            
            // Complete game data object
            game: {
              ...gameData.game,
            },
            
            // Response metadata
            status: gameData.status,
            message: gameData.message,
            reason: gameData.reason,
            
            // Individual game properties (for backwards compatibility)
            gameName: gameData.game.name,
            gameAssetUrl: gameData.game.assetUrl,
          },
        },
        '*'
      );
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [gameUrl, apiBaseUrl, gameData, gameId]);

  // Listen for messages from the game (e.g., game completion, coin updates)
  useEffect(() => {
    if (!gameUrl) return;

    const handleMessage = (event: MessageEvent) => {
      // Listen for game completion or coin update messages
      // Games can send messages like: { type: 'GAME_COMPLETE', coins: 100 } or { type: 'COINS_UPDATED', coins: 150 }
      if (event.data && typeof event.data === 'object') {
        const messageType = event.data.type;
        
        if (messageType === 'GAME_COMPLETE' || messageType === 'GAME_FINISHED' || messageType === 'COINS_UPDATED') {
          console.log('GameLoader: Game completion/update message received:', event.data);
          
          // Dispatch custom event to notify GameHeader to refresh coins
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('gameCompleted', {
              detail: {
                coins: event.data.coins,
                gameId: gameId,
                message: event.data.message || 'Game completed successfully'
              }
            }));
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [gameUrl, gameId]);

  // Cleanup on unmount - ensure iframe is removed
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      if (iframeRef.current) {
        iframeRef.current.src = 'about:blank'; // Clear iframe content
      }
    };
  }, []);

  const handleBack = () => {
    // Immediately hide the component
    setIsVisible(false);
    
    // Clear iframe to stop any ongoing processes and prevent navigation
    if (iframeRef.current) {
      try {
        // Remove iframe src to stop loading
        iframeRef.current.src = 'about:blank';
        // Remove iframe from DOM
        iframeRef.current.remove();
      } catch (e) {
        console.log('Error clearing iframe:', e);
      }
    }
    
    // Call onClose to update parent state first
    if (onClose) {
      onClose();
    }
    
    // Use setTimeout to ensure state updates before navigation
    setTimeout(() => {
      // Navigate back to exit the game page completely
      router.back();
    }, 100);
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

  // Don't render if component is being closed
  if (!isVisible) {
    return null;
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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header at the top */}
      <Box
        sx={{
          flexShrink: 0,
          zIndex: 10000,
        }}
      >
        <GameHeader sx={{
          backgroundColor: '#4848DB',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
        }} />
      </Box>
      
      {/* Iframe container below header */}
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        <iframe
          ref={iframeRef}
          title="Game"
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
        
        {/* Back button overlaid on top */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 10001,
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
      </Box>
    </Box>
  );
};

export default GameLoader;







