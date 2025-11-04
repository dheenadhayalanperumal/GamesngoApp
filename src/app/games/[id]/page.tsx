'use client';

import { useState, useEffect, Suspense } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Chip, Divider } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowBack, PlayArrow, Star } from '@mui/icons-material';
import HeaderWithBack from '@/components/HeaderWithBack';
import TabBar from '@/components/TabBar';
import OutletGameLoader from '@/components/OutletGameLoader';
import GameLoader from '@/components/GameLoader';
import LoginPopup from '@/components/LoginPopup';
import { useAuth } from '@/contexts/AuthContext';

interface GameDetails {
  id: number;
  name: string;
  tagline: string;
  type: string;
  bannerUrl: string;
  assetUrl: string;
  rating: number;
  durationMinutes: number;
  scoreType: string;
  plays: number;
  howToPlay: string[];
  modes: {
    quickMatch: {
      status: string;
    };
  };
}

function GameDetailsContent({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const [game, setGame] = useState<GameDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  
  // Check if user came from outlet selection (has offerId)
  const offerIdParam = searchParams.get('offerId');
  const offerId = offerIdParam ? parseInt(offerIdParam) : null;
  const isFromOutletSelection = !!offerId;

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const resolvedParams = await params;
        const gameId = resolvedParams.id;
        
        console.log('Fetching game details for ID:', gameId);
        
        const response = await fetch(`/api/public/games/${gameId}`);
        const data = await response.json();
        
        console.log('Game details response:', data);
        
        if (data.status === 'success' && data.game) {
          setGame(data.game);
        } else if (response.status === 404) {
          setError('Game not found');
        } else {
          setError('Failed to load game details');
        }
      } catch (error) {
        console.error('Error fetching game details:', error);
        setError('Failed to load game details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [params]);

  const handleBack = () => {
    router.back();
  };

  const handlePlay = () => {
    if (isFromOutletSelection && offerId) {
      // For outlet games, check if user is logged in
      if (!authLoading) {
        if (isLoggedIn) {
          // User is logged in, show the game
          setShowGame(true);
        } else {
          // User is not logged in, show login popup
          setIsLoginPopupOpen(true);
        }
      }
    } else {
      // For regular games (non-outlet), check if user is logged in
      if (!authLoading) {
        if (isLoggedIn) {
          // User is logged in, show the game in iframe
          if (game?.id) {
            setSelectedGameId(game.id);
            setShowGame(true);
          }
        } else {
          // User is not logged in, show login popup
          if (game?.id) {
            setSelectedGameId(game.id);
          }
          setIsLoginPopupOpen(true);
        }
      }
    }
  };

  const handleLogin = () => {
    // After successful login, show the game
    if (isFromOutletSelection && offerId) {
      setShowGame(true);
    } else if (selectedGameId) {
      // For regular games, show the game after login
      setShowGame(true);
    }
  };

  const handleCloseGame = () => {
    setShowGame(false);
    setSelectedGameId(null);
  };

  // Show game loader if playing outlet game
  if (showGame && offerId) {
    return <OutletGameLoader offerId={offerId} onClose={handleCloseGame} />;
  }

  // Show game loader if playing regular game
  if (showGame && selectedGameId) {
    return <GameLoader gameId={selectedGameId} onClose={handleCloseGame} />;
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          margin: '0 -15px', // Counteract global padding
        }}
      >
        <HeaderWithBack />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: 4,
          }}
        >
          <CircularProgress size={60} />
        </Box>
        <TabBar />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          margin: '0 -15px', // Counteract global padding
        }}
      >
        <HeaderWithBack />
        <Box sx={{ padding: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBack}
          >
            Go Back
          </Button>
        </Box>
        <TabBar />
      </Box>
    );
  }

  if (!game) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          margin: '0 -15px', // Counteract global padding
        }}
      >
        <HeaderWithBack />
        <Box sx={{ padding: 4 }}>
          <Typography variant="h6">Game not found</Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Box>
        <TabBar />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        paddingBottom: '80px', // Space for TabBar
        margin: '0 -15px', // Counteract global padding
      }}
    >
      <HeaderWithBack />
      
      <Box sx={{ padding: 2 }}>

        {/* Game Banner */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            mb: 3,
            height: 200,
            backgroundImage: `url(${game.bannerUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              zIndex: 1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            }}
          >
            {game.name}
          </Typography>
        </Box>

        {/* Game Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            {game.name}
          </Typography>
          
          {game.tagline && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {game.tagline}
            </Typography>
          )}

          {/* Game Stats */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<Star />}
              label={`${game.rating} Rating`}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`${game.durationMinutes} min`}
              color="secondary"
              variant="outlined"
            />
            <Chip
              label={`${game.plays} plays`}
              color="default"
              variant="outlined"
            />
            <Chip
              label={game.type}
              color="info"
              variant="outlined"
            />
          </Box>

          {/* Score Type */}
          {game.scoreType && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Score Type: {game.scoreType}
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* How to Play */}
        {game.howToPlay && game.howToPlay.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              How to Play
            </Typography>
            <Box component="ol" sx={{ pl: 2 }}>
              {game.howToPlay.map((instruction, index) => (
                <Typography
                  key={index}
                  component="li"
                  variant="body2"
                  sx={{ mb: 1 }}
                >
                  {instruction}
                </Typography>
              ))}
            </Box>
          </Box>
        )}

        <Divider sx={{ mb: 3 }} />

        {/* Play Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrow />}
            onClick={handlePlay}
           
          >
         
             Play Now
            
          </Button>
        </Box>
      </Box>

      <TabBar />

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        onLogin={handleLogin}
      />
    </Box>
  );
}

const GameDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          margin: '0 -15px',
        }}
      >
        <HeaderWithBack />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: 4,
          }}
        >
          <CircularProgress size={60} />
        </Box>
        <TabBar />
      </Box>
    }>
      <GameDetailsContent params={params} />
    </Suspense>
  );
};

export default GameDetailsPage;