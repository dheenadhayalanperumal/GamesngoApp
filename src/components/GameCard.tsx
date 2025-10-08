'use client';

import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface GameCardProps {
  id: number;
  name: string;
  image: string;
  rating: number;
  genre: string;
  duration: string;
}

const GameCard = ({ id, name, image, rating, genre, duration }: GameCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/games/${id}`);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          background: '#fff',
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18 }}
        />
      </Box>
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{
          color: '#222',
          mb: 0.2,
          width: '100%',
          textAlign: 'left',
          fontSize: { xs: 15, sm: 16, md: 18 },
          whiteSpace: { xs: 'normal', sm: 'nowrap' },
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1.2,
        }}
        title={name}
      >
        {name}
      </Typography>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: { xs: 0.5, sm: 1 },
        rowGap: 0.5
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <span style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            color: '#FFD700',
            marginRight: 4,
            fontWeight: 900
          }}>★</span>
          <Typography
            variant="body1"
            fontWeight={900}
            sx={{
              color: '#222',
              fontSize: { xs: 16, sm: 18 }
            }}
          >
            {rating}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: '#888',
            fontWeight: 600,
            fontSize: { xs: '0.7rem', sm: '0.75rem' }
          }}
        >
          {genre}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: '#888',
            fontWeight: 600,
            fontSize: { xs: '0.7rem', sm: '0.75rem' }
          }}
        >
          {duration}
        </Typography>
      </Box>
    </Box>
  );
};

export default GameCard;
