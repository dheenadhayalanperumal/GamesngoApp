'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import AllGamesCard from '@/components/AllGamesCard';
import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';

// Game type interfaces
interface BaseGame {
  id: number;
  name: string;
  image: string;
  rating: number;
  action: string;
  duration: string;
  category: string;
}

interface RestaurantGame extends BaseGame {
  gameType?: string;
  location?: string;
  outlets?: string;
  discount?: string;
}

type GameData = BaseGame | RestaurantGame;

// Original game data for Popular Today
const allGamesData = [
  {
    id: 1,
    name: 'Bubble Shooter',
    image: '/images/banner/bubble_shooter.svg',
    rating: 4.8,
    action: 'Action',
    duration: '5 min',
    category: 'puzzle',
  },
  {
    id: 2,
    name: 'Burger Master',
    image: '/images/banner/burger_master.svg',
    rating: 4.6,
    action: 'Cooking',
    duration: '7 min',
    category: 'restaurant',
  },
  {
    id: 3,
    name: 'Dindigul Thalappakatti',
    image: '/images/banner/dindugal.svg',
    rating: 4.7,
    action: 'Strategy',
    duration: '6 min',
    category: 'restaurant',
  },
  {
    id: 4,
    name: 'Nadana Restaurant',
    image: '/images/banner/nadana.svg',
    rating: 4.5,
    action: 'Simulation',
    duration: '8 min',
    category: 'restaurant',
  },
  {
    id: 5,
    name: 'Daily Game',
    image: '/images/banner/Daily_game.svg',
    rating: 4.9,
    action: 'Puzzle',
    duration: '4 min',
    category: 'puzzle',
  },
  {
    id: 6,
    name: 'Quiz Master',
    image: '/images/banner/bubble_shooter.svg',
    rating: 4.4,
    action: 'Trivia',
    duration: '10 min',
    category: 'quiz',
  },
  {
    id: 7,
    name: 'Word Puzzle',
    image: '/images/banner/Daily_game.svg',
    rating: 4.6,
    action: 'Brain',
    duration: '5 min',
    category: 'puzzle',
  },
  {
    id: 8,
    name: 'General Knowledge',
    image: '/images/banner/bubble_shooter.svg',
    rating: 4.7,
    action: 'Education',
    duration: '12 min',
    category: 'quiz',
  },
];

// Restaurant game data matching the design
const restaurantGamesData = [
  {
    id: 1,
    name: 'Dindukal Thalappakatti Biriyani',
    image: '/images/banner/dindugal.svg',
    rating: 5.0,
    action: 'Bubble Shooter',
    duration: '5 min',
    gameType: 'Bubble Shooter',
    location: 'Bangalore',
    outlets: '21 Outlets',
    discount: 'Upto 10',
    category: 'restaurant',
  },
  {
    id: 2,
    name: 'Dindukal Thalappakatti Biriyani',
    image: '/images/banner/dindugal.svg',
    rating: 5.0,
    action: 'Bubble Shooter',
    duration: '5 min',
    gameType: 'Bubble Shooter',
    location: 'Bangalore',
    outlets: '21 Outlets',
    discount: 'Upto 10',
    category: 'restaurant',
  },
  {
    id: 3,
    name: 'Dindukal Thalappakatti Biriyani',
    image: '/images/banner/dindugal.svg',
    rating: 5.0,
    action: 'Bubble Shooter',
    duration: '5 min',
    gameType: 'Bubble Shooter',
    location: 'Bangalore',
    outlets: '21 Outlets',
    discount: 'Upto 10',
    category: 'restaurant',
  },
  {
    id: 4,
    name: 'Dindukal Thalappakatti Biriyani',
    image: '/images/banner/dindugal.svg',
    rating: 5.0,
    action: 'Bubble Shooter',
    duration: '5 min',
    gameType: 'Bubble Shooter',
    location: 'Bangalore',
    outlets: '21 Outlets',
    discount: 'Upto 10',
    category: 'restaurant',
  },
  {
    id: 5,
    name: 'Dindukal Thalappakatti Biriyani',
    image: '/images/banner/dindugal.svg',
    rating: 5.0,
    action: 'Bubble Shooter',
    duration: '5 min',
    gameType: 'Bubble Shooter',
    location: 'Bangalore',
    outlets: '21 Outlets',
    discount: 'Upto 10',
    category: 'restaurant',
  },
  {
    id: 6,
    name: 'Dindukal Thalappakatti Biriyani',
    image: '/images/banner/dindugal.svg',
    rating: 5.0,
    action: 'Bubble Shooter',
    duration: '5 min',
    gameType: 'Bubble Shooter',
    location: 'Bangalore',
    outlets: '21 Outlets',
    discount: 'Upto 10',
    category: 'restaurant',
  },
];

const AllGamesContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0); // Default to first tab
  const [searchQuery, setSearchQuery] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);

  // Check if this is restaurant view or Popular Today view
  const isRestaurantView = searchParams.get('tab') === 'restaurant';
  const isPopularTodayView = !searchParams.get('tab'); // No tab parameter means Popular Today

  const tabs = [
    { label: 'All Games', value: 'all' },
    { label: 'Restaurant', value: 'restaurant' },
    { label: 'Puzzle', value: 'puzzle' },
    { label: 'Quiz', value: 'quiz' },
  ];

  const restaurantTabs = [
    { label: 'For You', value: 'foryou' },
    { label: 'Restaurant', value: 'restaurant' },
    { label: 'Puzzle', value: 'puzzle' },
    { label: 'Action', value: 'action' },
    { label: 'Quiz', value: 'quiz' },
  ];

  // Set active tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'restaurant') {
      setActiveTab(1); // Restaurant tab should be active
    } else {
      setActiveTab(0); // For You tab should be active (Popular Today or default)
    }
  }, [searchParams]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    
    // Smooth scroll to center the active tab
    if (tabsRef.current) {
      const tabElement = tabsRef.current.children[index] as HTMLElement;
      if (tabElement) {
        tabElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  const handleGameClick = (gameId: number) => {
    if ((isRestaurantView || isPopularTodayView) && activeTab !== 0) {
      // Restaurant view or Popular Today view but not "For You" tab - go to restaurant game page
      router.push(`/restaurant-games/${gameId}`);
    } else {
      // "For You" tab or other views - go to regular game page
      router.push(`/games/${gameId}`);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter games based on active tab and search query
  let filteredGames = allGamesData; // Default to all games

  if (isRestaurantView || isPopularTodayView) {
    // For both restaurant and Popular Today views, check if "For You" tab is active
    if (activeTab === 0) {
      // "For You" tab - show all games in grid layout
      filteredGames = allGamesData;
    } else {
      // Other tabs - show restaurant games in list layout
      filteredGames = restaurantGamesData;
    }
  } else {
    // For other views, filter by active tab
    filteredGames = activeTab === 0
      ? allGamesData
      : allGamesData.filter((game) => game.category === tabs[activeTab].value);
  }

  // Apply search filter
  if (searchQuery) {
    filteredGames = filteredGames.filter((game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Restaurant view design (for both restaurant and Popular Today)
  if (isRestaurantView || isPopularTodayView) {
    return (
      <Box
        sx={{
          // width: '100%',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          paddingBottom: '100px',
          pt: '80px',
          mx: '-15px',
          // mx: '-5px',
        }}
      >
        {/* Blue Header */}
        <Header sx={{
        backgroundColor: '#4848DB',
        textAlign: 'center',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }} /> 
        {/* Search Bar */}
        <Box sx={{ px: 2, py: 2 }}>
          <SearchBar placeholder="Search Games" onSearch={handleSearch} />
        </Box>

        {/* Category Tabs */}
        <Box sx={{ px: 2, mb: 2 }}>
          <Box 
            ref={tabsRef}
            sx={{ 
              display: 'flex', 
              gap: 3, 
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': {
                height: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
                borderRadius: '2px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c1c1c1',
                borderRadius: '2px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#a8a8a8',
              },
            }}>
            {restaurantTabs.map((tab, index) => (
              <Box
                key={index}
                onClick={() => handleTabClick(index)}
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  pb: 1,
                  minWidth: 'fit-content'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: activeTab === index ? 700 : 400,
                    color: activeTab === index ? '#333' : '#888',
                    textTransform: 'none'
                  }}
                >
                  {tab.label}
                </Typography>
                {activeTab === index && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: '#FAC200',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Game Cards - Conditional Layout */}
        {activeTab === 0 ? (
          // "For You" tab - Grid layout with AllGamesCard
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                  lg: 'repeat(5, 1fr)',
                },
                gap: { xs: 1.5, sm: 2, md: 2.5 },
              }}
            >
              {filteredGames.map((game) => (
                <AllGamesCard
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  image={game.image}
                  rating={game.rating}
                  action={game.action}
                  duration={game.duration}
                  onClick={handleGameClick}
                />
              ))}
            </Box>
          </Box>
        ) : (
          // Other tabs - List layout with restaurant cards
          <Box sx={{ px: 2 }}>
            {filteredGames.map((game) => (
              <Box
                key={game.id}
                onClick={() => handleGameClick(game.id)}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  p: 2,
                  mb: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  },
                }}
              >
                {/* Restaurant Logo */}
                <Box
                  sx={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    overflow: 'hidden'
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
                  sx={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#333',
                    mb: 0.5
                  }}
                >
                  {game.name}
                </Typography>

                {/* Game Type */}
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#666',
                    mb: 2
                  }}
                >
                  {(game as RestaurantGame).gameType || game.action}
                </Typography>

                {/* Details Row */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                  {(game as RestaurantGame).location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography sx={{ fontSize: '12px', color: '#888' }}>📍</Typography>
                      <Typography sx={{ fontSize: '12px', color: '#666' }}>{(game as RestaurantGame).location}</Typography>
                    </Box>
                  )}
                  
                  {(game as RestaurantGame).outlets && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography sx={{ fontSize: '12px', color: '#888' }}>🍽️</Typography>
                      <Typography sx={{ fontSize: '12px', color: '#666' }}>{(game as RestaurantGame).outlets}</Typography>
                    </Box>
                  )}
                  
                  {(game as RestaurantGame).discount && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography sx={{ fontSize: '12px', color: '#888' }}>%</Typography>
                      <Typography sx={{ fontSize: '12px', color: '#666' }}>{(game as RestaurantGame).discount}</Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '12px', color: '#FFD700' }}>⭐</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 600 }}>{game.rating}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Bottom Navigation Bar */}
        <TabBar />
      </Box>
    );
  }

  // Original Popular Today design
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        pb: 2,
        px: { xs: 2, sm: 2, md: 4 },
        backgroundColor: '#fff',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2, pt: 2 }}>
        {/* Search Bar */}
        <SearchBar placeholder="Search games..." onSearch={handleSearch} />
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: 14, sm: 16 },
              color: '#888',
              minWidth: { xs: 80, sm: 100 },
              '&.Mui-selected': {
                color: '#6E6EFF',
                fontWeight: 700,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#6E6EFF',
              height: 3,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      {/* Game Cards Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          },
          gap: { xs: 1.5, sm: 2, md: 2.5 },
        }}
      >
        {filteredGames.map((game) => (
          <AllGamesCard
            key={game.id}
            id={game.id}
            name={game.name}
            image={game.image}
            rating={game.rating}
            action={game.action}
            duration={game.duration}
            onClick={handleGameClick}
          />
        ))}
      </Box>

      {/* Empty State */}
      {filteredGames.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography variant="h6" sx={{ color: '#888' }}>
            {searchQuery ? `No games found for "${searchQuery}"` : 'No games found in this category'}
          </Typography>
        </Box>
      )}

      {/* Bottom Navigation Bar */}
      {/* <TabBar /> */}
    </Box>
  );
};

const AllGamesPage = () => {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</Box>}>
      <AllGamesContent />
    </Suspense>
  );
};

export default AllGamesPage;
