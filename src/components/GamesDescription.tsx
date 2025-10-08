import React from 'react';
import { Box, Typography, Button, Chip, Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface Game {
  id: number;
  name: string;
  image: string;
  rating: number;
  genre: string;
  duration: string;
  description?: string;
  gamedescriptiontitle?: string;
  howtoplay?: string;
  features?: string[];
}

interface GamesDescriptionProps {
  game: Game;
}

const GamesDescription: React.FC<GamesDescriptionProps> = ({ game }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handlePlayGame = () => {
    // Add your game play logic here
    console.log(`Playing game: ${game.name}`);
  };

  return (
    <Box sx={{ width: '100%', }}>
      {/* Header with back button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 , background:'#4848db', py:2, px:6, mx:-6}}>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            color: '#fff',
            textTransform: 'none',
            fontWeight: 800,
            '&:hover': {
              backgroundColor: 'rgba(45, 35, 80, 0.1)',
            },
          }}
        >
          Back
        </Button>
      </Box>

      {/* Game Image */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          aspectRatio: '1 / 1',
          background: '#fff',
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          mx: 'auto',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src={game.image}
          alt={game.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Game Title */}
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{
          color: '#2d2350',
          mb: 2,
          textAlign: 'left',
          fontSize: { xs: 24, sm: 28, md: 32 },
        }}
      >
        {game.name}
      </Typography>

      {/* Rating and Info */}
      <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', mb: 3, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={game.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body1" fontWeight={600} sx={{ color: '#2d2350' }}>
            {game.rating}
          </Typography>
        </Box>
         <Chip label={game.duration}  sx={{ fontWeight: 400,fontSize: { xs: 12, sm: 16, md: 32 }, }} />
        <Chip label={game.genre}  sx={{ fontWeight: 400,fontSize: { xs: 12, sm: 16, md: 32 }, }} />
      </Box>

      {/* Description */}
<Typography
        variant="h4"
        fontWeight={800}
        sx={{
          color: '#2d2350',
          mb: 2,
          textAlign: 'left',
          fontSize: { xs: 18, sm: 28, md: 32 },
        }}
      >
        {game.gamedescriptiontitle}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: '#666',
          mb: 3,
          textAlign: 'left',
          maxWidth: 600,
          mx: 'auto',
          lineHeight: 1.6,
        }}
      >

        {game.description || `Experience the exciting world of ${game.name}! This ${game.genre.toLowerCase()} game offers hours of entertainment with engaging gameplay and stunning visuals.`}
      </Typography>

      
      {/* Play Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrowIcon />}
          onClick={handlePlayGame}
          sx={{
            backgroundColor: '#FAC200',
            color: 'white',
            textTransform: 'none',
            fontWeight: 700,
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontSize: 18,
            width: '100%',
            '&:hover': {
              backgroundColor: '#FAC200',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px #FAC200',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Play
        </Button>
      </Box>

{/* How to Play Section */}
      {game.howtoplay && (
        <Box sx={{ mb: 2, mt: 3 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              color: '#2d2350',
              mb: 2,
              textAlign: 'left',
              fontSize: { xs: 18, sm: 28, md: 32 },
            }}
          >
            {game.howtoplay}
          </Typography>
        </Box>
      )}

      {/* Features Section */}
      {game.features && (
        <Box sx={{ mb: 4 }}>
         
          <Box component="ul" sx={{
            color: '#666',
            lineHeight: 1.8,
            pl: 2,
            '& li': {
              mb: 1,
              fontSize: { xs: 14, sm: 16 },
            }
          }}>
            {game.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </Box>
        </Box>
      )}




    </Box>
  );
};

export default GamesDescription;